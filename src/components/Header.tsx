"use client";

import Link from "next/link";
import { signOut, useSession, SessionProvider } from "next-auth/react";
export default function Header() {
  const { status } = useSession();
  return (
    <>
      <header className="w-full bg-primary text-primary-foreground shadow-md">
        <nav className="mx-auto flex items-left justify-center p-6 lg:px-8 max-w-7xl shadow-lg">
          <div className="flex lg:flex-1 space-x-4">
            <Link href="/">Home</Link>

            <Link href="/calendar">Calendar</Link>
          </div>

          <SessionProvider>
            {status === "authenticated" ? (
              <div className="hidden lg:flex lg:justify-end ">
                <button
                  className="text-sm font-semibold leading-6"
                  onClick={() => signOut({ callbackUrl: "/", redirect: true })}
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
