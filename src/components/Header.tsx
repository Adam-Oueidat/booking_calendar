"use client";

import Link from "next/link";
import { signOut, useSession, SessionProvider } from "next-auth/react";
import { isUserAdmin } from "@/src/app/api/admin/admin_actions";
import { useEffect, useState } from "react";

const sharedClasses = {
  navContainer: "mx-auto flex items-center justify-between p-4 lg:px-8",
  linkContainer: "flex items-center space-x-6",
  button:
    "text-sm font-medium text-slate-300 hover:text-slate-100 transition-colors duration-200",
  activeLink: "text-slate-100 font-semibold",
  hiddenLgFlex: "flex items-center",
  hiddenLgFlex1: "flex items-center",
};

export default function Header() {
  const { status, data: session } = useSession();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (session?.user?.email) {
        const adminStatus = await isUserAdmin(session.user.email);
        setIsAdmin(adminStatus);
      }
    };

    checkAdminStatus();
  }, [session?.user?.email]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800/50">
      <SessionProvider>
        <nav className={sharedClasses.navContainer}>
          <div className={sharedClasses.linkContainer}>
            <Link
              className={`${sharedClasses.button} ${sharedClasses.activeLink}`}
              href="/"
            >
              Home
            </Link>
            <Link className={sharedClasses.button} href="/profile">
              Profile
            </Link>
            {status === "authenticated" && (
              <Link className={sharedClasses.button} href="/calendar">
                Calendar
              </Link>
            )}
            {isAdmin && (
              <Link className={sharedClasses.button} href="/profile/admin">
                Admin
              </Link>
            )}
          </div>

          {status === "authenticated" ? (
            <div className={sharedClasses.hiddenLgFlex}>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-800/50 rounded-lg border border-slate-700/50">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-indigo-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <span className="text-sm font-medium text-slate-200">
                    {session?.user?.name}
                  </span>
                </div>
                <button
                  className={`${sharedClasses.button} flex items-center gap-2`}
                  onClick={() => signOut({ callbackUrl: "/", redirect: true })}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className={sharedClasses.hiddenLgFlex1}>
              <Link
                href="/login"
                className={`${sharedClasses.button} flex items-center gap-2`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                  />
                </svg>
                Login
              </Link>
            </div>
          )}
        </nav>
      </SessionProvider>
    </header>
  );
}
