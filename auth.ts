import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

const authOptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        }),
    ],
};

const auth = NextAuth(authOptions);
export { auth as default, authOptions };
