import getAccessToken from "@/src/lib/availability/getAccessToken";

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
    attendees: [
      { email: process.env.OWNER_EMAIL ?? "ooueidat@gmail.com" },
      { email: email },
    ],
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
