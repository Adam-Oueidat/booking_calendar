import { auth } from "@/auth";
import ConfirmedEventForm from "@/src/components/ConfirmedEventForm";
import RequestEventForm from "@/src/components/RequestEventForm";
import prisma from "@/src/lib/db";

export default async function AdminProfile() {
  const requestedEvents = await prisma.requestedEvent.findMany();
  const requestedEventsArray = JSON.parse(JSON.stringify(requestedEvents));
  const events = await prisma.event.findMany();
  const eventsArray = JSON.parse(JSON.stringify(events));
  const session = await auth();
  const user = session?.user;
  const ADMIN_EMAIL = process.env.AUTH_ADMIN_EMAIL;

  if (user?.email !== ADMIN_EMAIL) {
    return (
      <div className="bg-ct-blue-600  min-h-screen pt-20 flex items-start justify-center">
        <h1>You are not authorized to use this page</h1>
      </div>
    );
  }
  return (
    <section className="bg-ct-blue-600  min-h-screen pt-20 flex items-start justify-center">
      <div>
        <div className="grid grid-cols-1 gap-4 p-10 overflow-auto max-h-screen">
          {requestedEventsArray.map((event: Record<string, string>) => (
            <div
              key={event.id}
              className="bg-slate-400 rounded p-5 px-10 flex flex-col gap-2"
            >
              <RequestEventForm event={event} />
            </div>
          ))}
          <div className="grid grid-cols-3 gap-5">
            {eventsArray.map((event: Record<string, string>) => (
              <ConfirmedEventForm key={event.id} event={event} isAdmin />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
