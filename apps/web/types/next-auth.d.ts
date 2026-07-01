import type { DefaultSession } from "next-auth";

// Module augmentation requires `interface` for declaration merging; `type`
// cannot merge into the existing next-auth declarations.
declare module "next-auth" {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Session {
    user: {
      isAdmin: boolean;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface JWT {
    isAdmin?: boolean;
  }
}
