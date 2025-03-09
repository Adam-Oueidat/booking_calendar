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
    <section className="bg-ct-blue-600  min-h-screen pt-20 flex items-start justify-center">
      <div>
        <div className="grid grid-cols-1 gap-4 p-10 overflow-auto max-h-screen">
          {jsonArray.map((event: Record<string, string>) => (
            <div key={event.id}>
              <RequestEventForm
                event={event}
                isAdmin={userEmail == ADMIN_EMAIL}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
