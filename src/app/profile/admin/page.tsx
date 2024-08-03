import { auth } from "@/auth";
import RequestEventForm from "@/src/components/RequestEventForm";
import prisma from "@/src/lib/db";

export default async function AdminProfile() {
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
  return (
    <section className="bg-ct-blue-600  min-h-screen pt-20 flex items-start justify-center">
      <div>
        <div className="grid grid-cols-1 gap-4 p-10 overflow-auto max-h-screen">
          {jsonArray.map((event: Record<string, string>) => (
            <>
              <RequestEventForm event={event} />
            </>
          ))}
        </div>
      </div>
    </section>
  );
}
