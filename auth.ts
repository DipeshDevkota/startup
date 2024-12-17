import NextAuth, { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { client } from "./sanity/lib/client";
import { AUTHOR_BY_GITHUB_ID_QUERY } from "./sanity/lib/queries";
import { writeClient } from "./sanity/lib/write-client";

const authOptions: NextAuthOptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        }),
    ],

    callbacks: {
        async signIn({ user, profile }) {
            if (!profile) {
                console.error("Profile is undefined during signIn callback.");
                return false; // Deny sign-in
            }

            const { id, login, bio } = profile;
            const { name, email, image } = user;

            try {
                const existingUser = await client
                    .withConfig({ useCdn: false })
                    .fetch(AUTHOR_BY_GITHUB_ID_QUERY, { id });

                if (!existingUser) {
                    await writeClient.create({
                        _type: "author",
                        id, // GitHub ID
                        name,
                        username: login,
                        email,
                        image,
                        bio: bio || "",
                    });
                }

                return true; // Allow sign-in
            } catch (error) {
                console.error("Error in signIn callback:", error);
                return false; // Deny sign-in
            }
        },

        async jwt({ token, account, profile }) {
            if (account && profile) {
                const user = await client
                    .withConfig({ useCdn: false })
                    .fetch(AUTHOR_BY_GITHUB_ID_QUERY, { id: profile?.id });

                if (user) {
                    token.id = user?._id;
                }
            }
            return token;
        },

        async session({ session, token }) {
            if (token?.id) {
                session.user.id = token.id; // Attach id to session.user
            }
            return session;
        },
    },
};

export { authOptions };
export default NextAuth(authOptions);