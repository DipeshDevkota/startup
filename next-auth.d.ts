import "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id?: string; // Add the custom id under user
            name?: string;
            email?: string;
            image?: string;
        };
    }

    interface JWT {
        id?: string;
    }
}
