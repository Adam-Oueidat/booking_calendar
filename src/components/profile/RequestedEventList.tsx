import RequestEventForm from "@/src/components/RequestEventForm";
import prisma from "@/src/lib/db";

type RequestedEventListProps = {
  userEmail: string | undefined;
};

export default async function RequestedEventList({
  userEmail,
}: RequestedEventListProps) {
  const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
  let events = [];
  if (userEmail === ADMIN_EMAIL) {
    events = await prisma.requestedEvent.findMany();
  } else {
    events = await prisma.requestedEvent.findMany({
      where: {
        email: userEmail,
      },
    });
  }

  const jsonArray = JSON.parse(JSON.stringify(events));
  return (
    <div className="grid grid-cols-1 gap-6">
      {jsonArray.map((event: Record<string, string>) => (
        <div
          key={event.id}
          className="bg-slate-800/30 backdrop-blur-sm rounded-lg p-6 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300"
        >
          <RequestEventForm event={event} isAdmin={userEmail == ADMIN_EMAIL} />
        </div>
      ))}
      {jsonArray.length === 0 && (
        <div className="text-center py-8">
          <p className="text-slate-400">No events found</p>
        </div>
      )}
    </div>
  );
}
