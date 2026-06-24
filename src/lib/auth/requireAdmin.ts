import { auth } from "@/auth";
import prisma from "@/src/lib/db";
import { redirect } from "next/navigation";

/**
 * Loads the current session and returns it together with the user's email.
 * Redirects to /login when there is no authenticated session.
 */
export async function requireSession() {
  const session = await auth();
  const email = session?.user?.email;
  if (!email) {
    redirect("/login");
  }
  return { session, email };
}

/** Whether the given email belongs to an admin. */
export async function isAdmin(email: string) {
  const admin = await prisma.admin.findUnique({ where: { email } });
  return admin !== null;
}

/** Requires an authenticated admin; throws "Forbidden" otherwise. */
export async function requireAdmin() {
  const { session, email } = await requireSession();
  if (!(await isAdmin(email))) {
    throw new Error("Forbidden");
  }
  return session;
}
