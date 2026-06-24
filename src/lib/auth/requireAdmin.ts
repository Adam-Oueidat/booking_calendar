import { auth } from "@/auth";
import prisma from "@/src/lib/db";
import { redirect } from "next/navigation";

export async function requireAdmin() {
  const session = await auth();
  const email = session?.user?.email;
  if (!email) {
    redirect("/login");
  }
  const admin = await prisma.admin.findUnique({ where: { email } });
  if (!admin) {
    throw new Error("Forbidden");
  }
  return session;
}
