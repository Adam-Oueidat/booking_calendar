import NextAuth, { AuthOptions } from "next-auth";

const handler = NextAuth({
  providers: [],
} as AuthOptions);

export { handler as GET, handler as POST };
