"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";

const Navbar = () => {
    const { data: session } = useSession();

    return (
        <header className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg text-white">
            <nav className="container mx-auto flex justify-between items-center py-4 px-6">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3">
                    <Image src="/logo.png" alt="logo" width={144} height={30} />
                </Link>

                {/* Navigation & Auth */}
                <div className="flex items-center gap-8">
                    {/* If user is signed in */}
                    {session && session.user ? (
                        <>
                            <Link
                                href="/startup/create"
                                className="text-sm font-medium hover:text-gray-200 transition"
                            >
                                Create
                            </Link>
                            <button
                                onClick={() => signOut()}
                                className="bg-red-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition"
                            >
                                Sign Out
                            </button>
                            <Link
                                href={`/user/${session.user.id}`}
                                className="flex items-center gap-2"
                            >
                                <Image
                                    src={session.user.image || "/default-user.png"}
                                    alt="User Avatar"
                                    width={32}
                                    height={32}
                                    className="rounded-full border border-gray-200"
                                />
                                <span className="text-sm font-medium">
                                    {session.user.name}
                                </span>
                            </Link>
                        </>
                    ) : (
                        <button
                            onClick={() => signIn("github")}
                            className="bg-gray-900 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition"
                        >
                            Login with GitHub
                        </button>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
