// import NextAuth, { User, NextAuthConfig } from "next-auth";
// import GoogleProvider from "next-auth/providers/google";

// // Define authentication options using NextAuthOptions interface
// const authOptions: NextAuthConfig = {
//   // Customize authentication pages
//   pages: {
//     signIn: "/login", // Redirect users to "/login" when signing in
//   },
//   // Configure session management
//   session: {
//     strategy: "jwt", // Use JSON Web Tokens (JWT) for session management
//   },
//   // added secret key
//   secret: process.env.NEXT_PUBLIC_SECRET,
//   // Configure authentication providers
//   providers: [
//     GoogleProvider({
//       // Configure Google authentication provider with environment variables
//       clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
//     }),
//   ],
// };

// export const { auth, handlers, signIn, signOut } = NextAuth(authOptions);

import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
      clientSecret: process.env.GOOGLE_OAUTH_SECRET,
    }),
  ],
});
