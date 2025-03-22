"use client";

import Link from "next/link";
import { signOut, useSession, SessionProvider } from "next-auth/react";

const sharedClasses = {
  navContainer:
    "mx-auto flex items-left md:justify-center p-6 lg:px-8  shadow-lg",
  linkContainer: "md:flex lg:flex-1 space-x-4 pr-4",
  button: "text-sm font-semibold leading-6 text-white",
  hiddenLgFlex: "min-[320px]:px-4 sm:px-4 md:flex md:justify-end",
  hiddenLgFlex1: "min-[320px]:px-4 sm:px-4 md:flex md:flex-1 md:justify-end",
};

export default function Header() {
  const { status, data: session } = useSession();
  const isAdmin = session?.user?.email === process.env.ADMIN_EMAIL;
  console.log(isAdmin);

  return (
    <header className="w-full bg-primary text-primary-foreground shadow-md">
      <SessionProvider>
        <nav className={sharedClasses.navContainer}>
          <div className={sharedClasses.linkContainer}>
            <Link className="text-white" href="/">
              Home
            </Link>
            <Link className="text-white" href="/profile">
              Profil
            </Link>
            {status === "authenticated" && (
              <Link className="text-white" href="/calendar">
                Calendar
              </Link>
            )}
            {isAdmin && (
              <Link className="text-white" href="/profile/admin">
                Admin Page
              </Link>
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
