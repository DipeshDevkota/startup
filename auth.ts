import NextAuth, { Profile, User } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { client } from "./sanity/lib/client";
import { AUTHOR_BY_GITHUB_ID_QUERY } from "./sanity/lib/queries";
import { writeClient } from "./sanity/lib/write-client";

const authOptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        }),
    ],

    callbacks: {
        async signIn({ user, profile }) {
            // Destructure needed fields safely
            const { name, email, image } = user;
            const { id, login, bio } = profile || {};

            try {
                // Fetch existing user by GitHub ID
                const existingUser = await client.fetch(
                    AUTHOR_BY_GITHUB_ID_QUERY,
                    { id }
                );

                // If user does not exist, create a new one
                if (!existingUser) {
                    await writeClient.create({
                        _type: "author",
                        id: id, // GitHub ID
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
                return false; // Deny sign-in if there's an error
            }
        },

        async jwt({ token, account, profile }) {
            if (account && profile) {
                const user = await client.fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
                    id: profile?.id,
                });
        
                // If the user is found, add the user ID to the token
                if (user) {
                    token.id = user._id;
                }
            }
            return token;
        }
        
    },


};

const auth = NextAuth(authOptions);
export { auth as default, authOptions };
