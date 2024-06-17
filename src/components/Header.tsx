"use client";

import Link from "next/link";
import { auth } from "@/auth";
import { signOut, useSession, SessionProvider } from "next-auth/react";
export default function Header() {
  const { data: session, status } = useSession();
  return (
    <>
      <header className="bg-gray-500 opacity-50">
        <nav className="mx-auto flex items-left justify-center p-6 lg:px-8 max-w-7xl">
          <div className="flex lg:flex-1 space-x-4">
            <Link href="/">Home</Link>

            <Link href="/calendar">Calendar</Link>
          </div>

          <SessionProvider>
            {status === "authenticated" ? (
              <div className="hidden lg:flex lg:justify-end ">
                <button
                  className="text-sm font-semibold leading-6"
                  onClick={() => signOut()}
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                <Link href="/login" className="text-sm font-semibold leading-6">
                  Log in <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            )}
          </SessionProvider>
        </nav>
      </header>
    </>
  );
}
