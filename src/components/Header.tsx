"use client";

import Link from "next/link";
import { signOut, useSession, SessionProvider } from "next-auth/react";

const sharedClasses = {
  navContainer:
    "mx-auto flex items-left md:justify-center p-6 lg:px-8  shadow-lg",
  linkContainer: "md:flex lg:flex-1 space-x-4 pr-4",
  button: "text-sm font-semibold leading-6",
  hiddenLgFlex: "min-[320px]:px-4 sm:px-4 md:flex md:justify-end",
  hiddenLgFlex1: "min-[320px]:px-4 sm:px-4 md:flex md:flex-1 md:justify-end",
};

export default function Header() {
  const { status } = useSession();
  return (
    <header className="w-full bg-primary text-primary-foreground shadow-md">
      <SessionProvider>
        <nav className={sharedClasses.navContainer}>
          <div className={sharedClasses.linkContainer}>
            <Link href="/">Home</Link>
            {status === "authenticated" && (
              <Link href="/calendar">Calendar</Link>
            )}
          </div>
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
        </nav>
      </SessionProvider>
    </header>
  );
}
