"use client";

import Link from "next/link";
import { signOut, useSession, SessionProvider } from "next-auth/react";

const sharedClasses = {
  navContainer:
    "mx-auto flex items-left justify-center p-6 lg:px-8 max-w-7xl shadow-lg",
  linkContainer: "flex lg:flex-1 space-x-4",
  button: "text-sm font-semibold leading-6",
  hiddenLgFlex: "hidden lg:flex lg:justify-end",
  hiddenLgFlex1: "hidden lg:flex lg:flex-1 lg:justify-end",
};

export default function Header() {
  const { status } = useSession();
  return (
    <header className="w-full bg-primary text-primary-foreground shadow-md">
      <nav className={sharedClasses.navContainer}>
        <div className={sharedClasses.linkContainer}>
          <Link href="/">Home</Link>
          <Link href="/calendar">Calendar</Link>
        </div>
        <SessionProvider>
          {status === "authenticated" ? (
            <div className={sharedClasses.hiddenLgFlex}>
              <button
                className={sharedClasses.button}
                onClick={() => signOut({ callbackUrl: "/", redirect: true })}
              >
                Logout
              </button>
            </div>
          ) : (
            <div className={sharedClasses.hiddenLgFlex1}>
              <Link href="/login" className={sharedClasses.button}>
                Log in <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          )}
        </SessionProvider>
      </nav>
    </header>
  );
}
