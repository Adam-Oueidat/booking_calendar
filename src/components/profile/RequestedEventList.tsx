import { isUserAdmin } from "@/src/app/api/admin/admin_actions";
import RequestEventForm from "@/src/components/RequestEventForm";
import prisma from "@/src/lib/db";

type Event = {
  id: string;
  email: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
};
type RequestedEventListProps = {
  userEmail: string | undefined;
};

export default async function RequestedEventList({
  userEmail,
}: RequestedEventListProps) {
  let requestedEvents = [];
  let events = [] as Event[];

  requestedEvents = await prisma.requestedEvent.findMany({
    where: {
      email: userEmail,
    },
  });
  events = await prisma.event.findMany({
    where: {
      email: userEmail,
    },
  });

  const requestedEventsArray = JSON.parse(JSON.stringify(requestedEvents));
  const eventsArray = JSON.parse(JSON.stringify(events));
  console.log(eventsArray);
  return (
    <div className="grid grid-cols-1 gap-6">
      {requestedEventsArray.map((event: Record<string, string>) => (
        <div
          key={event.id}
          className="bg-slate-800/30 backdrop-blur-sm rounded-lg p-6 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300"
        >
          <RequestEventForm event={event} />
        </div>
      ))}
      {eventsArray.map((event: Record<string, string>) => (
        <div
          key={event.id}
          className="bg-slate-800/30 backdrop-blur-sm rounded-lg p-6 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300"
        >
          <RequestEventForm event={event} />
        </div>
      ))}
      {requestedEventsArray.length === 0 && eventsArray.length === 0 && (
        <div className="text-center py-8">
          <p className="text-slate-400">No events found</p>
        </div>
      )}
    </div>
  );
}
