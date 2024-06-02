"use server";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { ObjectId } from "bson";
import prisma from "@/app/lib/db";

export async function addEvent(state: void, formData: FormData) {
  const from = formData.get("event-date-from");
  const to = formData.get("event-date-to");

  const fromDate = new Date(from as string);
  const toDate = new Date(to as string);

  await prisma.event.create({
    data: {
      id: new ObjectId().toString(),
      name: "Event Name", // Add the name property here
      startDate: fromDate,
      endDate: toDate,
    },
  });

  revalidatePath("/calendar");
}

export async function getCurrentEvent(
  year: number,
  month: number,
  date: number
): Promise<boolean> {
  const events = await prisma.event.findMany();
  const jsonArray = JSON.parse(JSON.stringify(events));
  const currentDate = new Date(year, month, date).setHours(0, 0, 0, 0);
  if (!jsonArray) {
    return false;
  }
  return jsonArray.some((event: any) => {
    const startDate = new Date(event.startDate.replace("$D", "")).setHours(
      0,
      0,
      0,
      0
    );
    const endDate = new Date(event.endDate.replace("$D", "")).setHours(
      0,
      0,
      0,
      0
    );
    if (currentDate >= startDate && currentDate <= endDate) {
      return true;
    }
    return false; // Add this line to handle the case when the condition is not met
  });
}
