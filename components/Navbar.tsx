"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import { BadgePlus, LogOut, Menu, X } from "lucide-react";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { AvatarFallback } from "./ui/avatar";

const Navbar = () => {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-slate-200 shadow-md">
      <nav className="container mx-auto flex justify-between items-center px-4 py-3 lg:px-6">
        {/* Logo */}
        <Link href="/">
          <Image src="/logo.png" alt="logo" width={120} height={30} priority />
        </Link>

        {/* Hamburger Menu (Small Screens) */}
        <div className="lg:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Navigation Links */}
        <div
          className={`${
            menuOpen ? "flex" : "hidden"
          } absolute top-16 left-0 right-0 bg-slate-200 lg:static lg:flex lg:flex-row lg:gap-6 lg:items-center lg:bg-transparent flex-col items-start gap-4 p-4 lg:p-0`}
        >
          {session && session.user ? (
            <>
              {/* Create Startup */}
              <Link
                href="/startup/create"
                className="flex items-center gap-2 text-gray-700 hover:text-blue-500 transition-colors"
              >
                <BadgePlus className="size-5" />
                <span className="lg:inline hidden">Create</span>
              </Link>

              {/* Logout Button */}
              <button
                onClick={() => signOut()}
                className="flex items-center gap-2 px-4 py-2 text-yellow-600 hover:text-yellow-700 transition-colors"
              >
                <LogOut className="size-5" />
                <span className="lg:inline hidden">Logout</span>
              </button>

              {/* User Profile */}
              <Link
                href={`/user/${session.user.id}`}
                className="flex items-center gap-2 text-gray-700 hover:text-blue-500 transition-colors"
              >
                <Avatar className="size-8">
                  <AvatarImage
                    src={session?.user?.image || ""}
                    alt={session?.user?.name || ""}
                    className="w-8 h-8 rounded-full"
                  />
                  <AvatarFallback>AV</AvatarFallback>
                </Avatar>
                <span className="hidden lg:inline">{session.user.name}</span>
              </Link>
            </>
          ) : (
            <button
              onClick={() => signIn("github")}
              className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
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
