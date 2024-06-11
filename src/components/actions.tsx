"use server";
import { revalidatePath } from "next/cache";
import { ObjectId } from "bson";
import prisma from "@/src/lib/db";
import getAccessToken from "@/src/lib/availability/getAccessToken";

export async function addEvent(
  state: boolean,
  formData: FormData
): Promise<boolean> {
  const from = formData.get("event-date-from");
  const to = formData.get("event-date-to");
  const email = formData.get("email");
  const name = formData.get("name");

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

  toDate.setDate(toDate.getDate() + 1);
  createCalendarAppointment(
    fromDate,
    toDate,
    email?.toString() as string,
    name?.toString() as string
  );

  revalidatePath("/calendar");

  return !state;
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

export default async function createCalendarAppointment(
  fromDate: Date,
  toDate: Date,
  email: string,
  name: string
) {
  const body = {
    summary: `${name} i Köpenhamn`,
    location: "Copenhage, Denmark",
    description: "Tänk vad kul!",
    start: {
      date: fromDate.toISOString().split("T")[0],
      timeZone: "Europe/Stockholm",
    },
    end: {
      date: toDate.toISOString().split("T")[0],
      timeZone: "Europe/Stockholm",
    },
    attendees: [{ email: "ooueidat@gmail.com" }, { email: email }],
    reminders: {
      useDefault: false,
      overrides: [
        { method: "email", minutes: 24 * 60 },
        { method: "popup", minutes: 10 },
      ],
    },
  };

  if (!process.env.GOOGLE_CALENDAR_API_URL) {
    throw new Error("GOOGLE_OAUTH_SECRET not set");
  }
  const apiUrl = new URL(process.env.GOOGLE_CALENDAR_API_URL);

  apiUrl.searchParams.set("sendUpdates", "all");
  apiUrl.searchParams.set("conferenceDataVersion", "1");

  const response = await fetch(apiUrl, {
    cache: "no-cache",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${await getAccessToken()}`,
    },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response;
}

export async function getCardInformation() {
  const cardInformation = await prisma.cardInformation.findMany();
  const jsonArray = JSON.parse(JSON.stringify(cardInformation));
  const cardInformationDict: { [date: number]: {} } = {};
  jsonArray.forEach((cardInformation: any) => {
    cardInformationDict[cardInformation.id] = cardInformation;
  });
  return cardInformationDict;
}
