"use server";
import { revalidatePath } from "next/cache";
import { ObjectId } from "bson";
import prisma from "@/src/lib/db";
import getAccessToken from "@/src/lib/availability/getAccessToken";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

type Event = {
  id: string;
  name: string;
  description: string;
  email: string;
  startDate: string;
  endDate: string;
};

export async function requestEvent(
  state: Record<string, string | boolean>,
  formData: FormData
): Promise<Record<string, string | boolean>> {
  // Check for session, if not logged in redirect to login page
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const from = formData.get("event-date-from");
  const to = formData.get("event-date-to");
  const name = formData.get("name");
  const description = formData.get("description");

  if (!from || !to || !name || !description) {
    throw new Error("Missing form data");
  }
  const currentDate = new Date();
  const fromDate = new Date(from as string);
  const toDate = new Date(to as string);

  if (fromDate <= currentDate) {
    revalidatePath("/calendar");
    return {
      closeModal: false,
      message: "",
      error: "From date cannot be in the past",
    };
  }
  if (toDate < fromDate) {
    revalidatePath("/calendar");
    return {
      closeModal: false,
      message: "",
      error: "To date cannot be before from date",
    };
  }

  const existingEvent = await prisma.requestedEvent.findFirst({
    where: {
      OR: [
        {
          startDate: {
            lte: fromDate,
          },
          endDate: {
            gte: fromDate,
          },
        },
        {
          startDate: {
            lte: toDate,
          },
          endDate: {
            gte: toDate,
          },
        },
        {
          startDate: {
            gte: fromDate,
          },
          endDate: {
            lte: toDate,
          },
        },
      ],
    },
  });

  if (existingEvent) {
    return {
      closeModal: false,
      message: "",
      error: "Selected dates are already booked",
    };
  }

  await prisma.requestedEvent.create({
    data: {
      id: new ObjectId().toString(),
      name: name as string, // Add the name property here
      description: description as string,
      email: session.user?.email as string,
      startDate: fromDate,
      endDate: toDate,
    },
  });

  revalidatePath("/calendar");

  return {
    closeModal: true,
    message: "Success!",
    error: "",
  };
}

export async function blockEvent(state: boolean, formData: FormData) {
  const from = formData.get("event-date-from");
  const to = formData.get("event-date-to");

  if (!from || !to) {
    throw new Error("Missing form data");
  }

  const fromDate = new Date(from as string);
  const toDate = new Date(to as string);
  await prisma.event.create({
    data: {
      id: new ObjectId().toString(),
      name: "Blocked Event", // Add the name property here
      startDate: fromDate,
      endDate: toDate,
    },
  });

  revalidatePath("/calendar");

  return !state;
}

export async function addEvent(event: Event) {
  const id = event.id;
  const fromDate = event.startDate;
  const toDate = event.endDate;
  const name = event.name;
  const description = event.description;

  await prisma.event.create({
    data: {
      id: id,
      name: name, // Add the name property here
      startDate: fromDate,
      endDate: toDate,
    },
  });

  const convertToDate = new Date(toDate);
  const convertFromDate = new Date(fromDate);
  convertToDate.setDate(convertToDate.getDate() + 1);
  createCalendarAppointment(
    convertFromDate,
    convertToDate,
    event.email,
    name,
    description
  );
}

export async function deleteRequestedEvent(event: Event) {
  await prisma.requestedEvent.delete({
    where: {
      id: event.id,
    },
  });
  revalidatePath("/profile/admin");
}

export async function getEventsForMonth(year: number, month: number) {
  const events = await prisma.event.findMany();
  const jsonArray = JSON.parse(JSON.stringify(events));
  const eventsDict: Record<number, boolean> = {};
  jsonArray.forEach((event: Event) => {
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

export async function createCalendarAppointment(
  fromDate: Date,
  toDate: Date,
  email: string,
  name: string,
  description: string
) {
  const body = {
    summary: `${name} i Köpenhamn`,
    location: "Copenhagen, Denmark",
    description: { description },
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

export type Card = {
  id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  imageUrl: string;
  imageUrls: string;
};

type Cards = Record<string, Card>;

export async function getCardInformation(): Promise<Cards> {
  const cardInformation = await prisma.cardInformation.findMany();
  const jsonArray = JSON.parse(JSON.stringify(cardInformation));
  const cardInformationDict: Cards = {};
  jsonArray.forEach((cardInformation: Card) => {
    cardInformationDict[cardInformation.id] = cardInformation;
  });
  return cardInformationDict;
}

export async function bookTicket(
  state: boolean,
  formData: FormData
): Promise<boolean> {
  const fromCity = formData.get("city-from");

  const fromCityString = fromCity?.toString();
  const date = new Date();

  if (fromCity === null || fromCityString === undefined) {
    return false;
  }
  if (fromCityString.toLowerCase() === "stockholm") {
    redirect(
      `https://www.sj.se/sok-resa/valj-resa/Stockholm%20Central/K%C3%B6penhamn%20H/` +
        date.toISOString().split("T")[0]
    );
  }
  if (fromCityString.toLowerCase() === "gothenburg") {
    redirect(
      `https://www.sj.se/sok-resa/valj-resa/G%C3%B6teborg%20Central/K%C3%B6penhamn%20H/` +
        date.toISOString().split("T")[0]
    );
  }
  if (fromCityString.toLowerCase() === "malmo") {
    redirect(
      `https://www.sj.se/sok-resa/valj-resa/Malm%C3%B6%20Central/K%C3%B6penhamn%20H/` +
        date.toISOString().split("T")[0]
    );
  }
  return false;
}
