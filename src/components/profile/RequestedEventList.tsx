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
  return (
    <div className="grid grid-cols-1 gap-6">
      {requestedEventsArray.map((event: Record<string, string>) => (
        <div
          key={event.id}
          className="bg-white/[0.03] backdrop-blur-xs rounded-lg p-6 border border-cph-sky/15 hover:border-cph-sky/30 transition-all duration-300"
        >
          <RequestEventForm event={event} />
        </div>
      ))}
      {eventsArray.map((event: Record<string, string>) => (
        <div
          key={event.id}
          className="bg-white/[0.03] backdrop-blur-xs rounded-lg p-6 border border-cph-sky/15 hover:border-cph-sky/30 transition-all duration-300"
        >
          <RequestEventForm event={event} />
        </div>
      ))}
      {requestedEventsArray.length === 0 && eventsArray.length === 0 && (
        <div className="text-center py-8">
          <p className="text-cph-sky/70">No events found</p>
        </div>
      )}
    </div>
  );
}
