"use client"; // Indicates that this module is client-side code.

import { signIn } from "next-auth/react"; // Import the signIn function from NextAuth for authentication.
import { Suspense } from "react";

export default function LoginForm() {
  const callbackUrl = "/";

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <a
          className="px-7 py-2 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center mb-3"
          style={{ backgroundColor: "#ffffff", color: "gray" }}
          onClick={() => signIn("google", { callbackUrl })}
          role="button"
        >
          Continue with Google
        </a>
      </Suspense>
    </>
  );
}
