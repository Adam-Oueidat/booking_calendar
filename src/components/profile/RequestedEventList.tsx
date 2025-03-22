import RequestEventForm from "@/src/components/RequestEventForm";
import prisma from "@/src/lib/db";

type RequestedEventListProps = {
  userEmail: string | undefined;
};

export default async function RequestedEventList({
  userEmail,
}: RequestedEventListProps) {
  const ADMIN_EMAIL = process.env.AUTH_ADMIN_EMAIL;
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
          className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10 hover:border-white/20 transition-all duration-300"
        >
          <RequestEventForm event={event} isAdmin={userEmail == ADMIN_EMAIL} />
        </div>
      ))}
      {jsonArray.length === 0 && (
        <div className="text-center py-8">
          <p className="text-white/60">No events found</p>
        </div>
      )}
    </div>
  );
}
