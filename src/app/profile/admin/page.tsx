import { auth } from "@/auth";
import { addEvent } from "@/src/components/actions";
import RequestEventForm from "@/src/components/RequestEventForm";
import prisma from "@/src/lib/db";

export default async function Profile() {
  const events = await prisma.requestedEvent.findMany();
  const jsonArray = JSON.parse(JSON.stringify(events));
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
  console.log(jsonArray);
  return (
    <section className="bg-ct-blue-600  min-h-screen pt-20 flex items-start justify-center">
      <div>
        <div className="grid grid-cols-1 gap-4 p-10 overflow-auto max-h-screen">
          {jsonArray.map((event: Record<string, string>) => (
            <>
              <div key={event.id} className="bg-gray-500 rounded p-5 px-10">
                <div className="event-name">{event.name}</div>
                <div className="grid grid-cols-2 gap-5 ">
                  <div className="event-date">
                    {event.startDate.split("T")[0]}
                  </div>
                  <div>{event.endDate.split("T")[0]}</div>
                </div>
                <div className="flex justify-end">
                  <button className="bg-red-600 text-white rounded p-2">
                    Decline
                  </button>
                  <button className="bg-green-800 text-white rounded p-2">
                    Accept
                  </button>
                </div>
              </div>
              <RequestEventForm event={event} />
            </>
          ))}
        </div>
      </div>
    </section>
  );
}
