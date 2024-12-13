// import { authOptions } from "@/auth";

//     What is it?
//     authOptions is an object that contains the configuration for NextAuth.js. It typically defines how authentication is handled, including:
//         Available providers (e.g., GitHub, Google, etc.).
//         Callbacks for customizing session, token behavior, or user profiles.
//         Database or session storage options.

//     Where is it used?
    // It's passed to the NextAuth() function to configure the behavior of authentication in your app.



import { authOptions } from "@/auth";
import NextAuth from "next-auth";

const authHandler = NextAuth(authOptions);

export const GET = authHandler;
export const POST = authHandler;
