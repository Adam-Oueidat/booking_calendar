"use server";
import { revalidatePath } from "next/cache";
import prisma from "@/src/lib/db";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export async function addAdmin(email: string) {
  const session = await auth();
  if (!session) {
    redirect("/login");
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
  const session = await auth();
  if (!session) {
    redirect("/login");
  }

  const admins = await prisma.admin.findMany();
  return admins;
}

export async function isUserAdmin(email: string) {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }
  if (!email) {
    return false;
  }

  const admin = await prisma.admin.findUnique({
    where: { email },
  });

  return admin ? true : false;
}

export async function getCalendarLink() {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }

  const calendarLink = await prisma.calendarLink.findUnique({
    where: { id: "calendar_link" },
  });

  return calendarLink;
}

export async function setCalendarLink(link: string) {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }

  await prisma.calendarLink.upsert({
    where: { id: "calendar_link" },
    update: { link },
    create: { link },
  });

  revalidatePath("/");
}
