"use server";
import { revalidatePath } from "next/cache";
import prisma from "@repo/db";
import { auth } from "@/auth";
import { requireAdmin, isAdmin } from "@/src/lib/auth/requireAdmin";
import { addAdminLimiter, isRateLimited } from "@/src/lib/rateLimit";

export async function addAdmin(email: string) {
  const session = await requireAdmin();
  if (await isRateLimited(addAdminLimiter, session?.user?.email ?? "anonymous")) {
    return { error: "Too many requests. Please try again later." };
  }

  const admin = await prisma.admin.findUnique({
    where: { email },
  });

  if (admin) {
    return { error: "Admin already exists" };
  }

  await prisma.admin.create({
    data: { email },
  });

  revalidatePath("/");
}

export async function getAdmins() {
  await requireAdmin();

  const admins = await prisma.admin.findMany();
  return admins;
}

export async function isUserAdmin() {
  const session = await auth();
  const email = session?.user?.email;
  if (!email) {
    return false;
  }
  return isAdmin(email);
}

export async function getCalendarLink() {
  await requireAdmin();

  const calendarLink = await prisma.calendarLink.findUnique({
    where: { id: "calendar_link" },
  });

  return calendarLink;
}

export async function setCalendarLink(link: string) {
  await requireAdmin();

  await prisma.calendarLink.upsert({
    where: { id: "calendar_link" },
    update: { link },
    create: { link },
  });

  revalidatePath("/");
}
