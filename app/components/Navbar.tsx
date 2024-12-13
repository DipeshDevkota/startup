"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <header className="bg-gradient-to-r from-red-500 via-red-600 to-red-700 shadow-md py-4">
      <nav className="container mx-auto flex justify-between items-center px-6">
        {/* Logo */}
        <Link href="/">
          <Image src="/logo.png" alt="logo" width={144} height={30} />
        </Link>

        {/* Navigation and User Authentication */}
        <div className="flex items-center gap-6 text-white font-semibold">
          {/* When User is logged in */}
          {session && session.user ? (
            <>
              <Link href="/startup/create">
                <span className="hover:text-yellow-300 transition-colors">Create</span>
              </Link>
              <button
                onClick={() => signOut()}
                className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
              >
                Sign Out
              </button>
              <Link href={`/user/${session.user.id}`} className="hover:text-yellow-300 transition-colors">
                <span>{session.user.name}</span>
              </Link>
            </>
          ) : (
            <button
              onClick={() => signIn("github")}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
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
