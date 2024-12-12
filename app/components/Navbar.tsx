import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getServerSession } from 'next-auth';
import {signIn, signOut} from 'next-auth/react'
const Navbar = async () => {
    
    const session = await getServerSession(); // Fetches the current authentication session

    return (
        <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
            <nav className="flex justify-between items-center">
                {/* Home link with logo */}
                <Link href="/">
                    <Image src="/logo.png" alt="logo" width={144} height={30} />
                </Link>

                <div className="flex items-center gap-5 text-black">
                    {session && session?.user ? (
                        <>
                            {/* Create startup link */}
                            <Link href="/startup/create">
                                <span>Create</span>
                            </Link>

                            {/* Sign Out button */}
                            <button onClick={() => signOut()}>
                                <span>Sign Out</span>
                            </button>

                            {/* Link to user profile */}
                            <Link href={`/user/${session.user.id}`}>
                                <span>{session.user.name}</span>
                            </Link>
                        </>
                    ) : (
                        // Login button
<form
  action={async () => {
    "use server";
    await signIn("github" )
           //   callbackUrl: "http://localhost:3000/", // The URL to redirect after successful login);
  }}
>
  <button type="submit">Login with GitHub</button>
</form>

                    )}
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
