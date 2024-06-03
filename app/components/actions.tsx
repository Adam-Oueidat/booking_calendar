"use server";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { ObjectId } from "bson";
import prisma from "@/app/lib/db";
import { unstable_noStore as noStore } from "next/cache";

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

export async function getEventsForMonth(year: number, month: number) {
  const events = await prisma.event.findMany();
  const jsonArray = JSON.parse(JSON.stringify(events));

  const eventsDict: { [date: number]: boolean } = {};

  jsonArray.forEach((event: any) => {
    const startDate = new Date(event.startDate.replace("$D", ""));
    const endDate = new Date(event.endDate.replace("$D", ""));

    if (startDate.getFullYear() === year && startDate.getMonth() === month) {
      for (let date = startDate.getDate(); date <= endDate.getDate(); date++) {
        if (!eventsDict[date]) {
          eventsDict[date] = false;
        }
        eventsDict[date] = true;
      }
    }
  });

  return eventsDict;
}
