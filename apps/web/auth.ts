import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { isAdmin } from "@/src/lib/auth/requireAdmin";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [Google],
  callbacks: {
    // Resolve admin status once when the JWT is issued/refreshed and cache it
    // on the token. This is used only to gate the UI (e.g. showing the "Block
    // Event" button) so the client doesn't need a DB round-trip on every
    // render. Mutating server actions still verify admin against the DB via
    // requireAdmin(), so a stale token can never grant unauthorized access.
    async jwt({ token }) {
      if (token.email) {
        token.isAdmin = await isAdmin(token.email);
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.isAdmin = Boolean(token.isAdmin);
      }
      return session;
    },
  },
});
