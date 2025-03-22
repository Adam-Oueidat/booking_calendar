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
      <div className="bg-ct-blue-600 min-h-screen pt-20 flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur-lg rounded-lg p-8 shadow-xl">
          <h1 className="text-2xl font-bold text-white">Access Denied</h1>
          <p className="text-white/80 mt-2">
            You are not authorized to use this page
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-ct-blue-600 min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/10 backdrop-blur-lg rounded-lg shadow-xl p-6 mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Admin Dashboard
          </h1>
          <p className="text-white/80">Manage your events and bookings</p>
        </div>

        {/* Pending Requests Section */}
        <div className="mb-12">
          <div className="bg-white/10 backdrop-blur-lg rounded-lg shadow-xl p-6 mb-6">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Pending Requests
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {requestedEventsArray.map((event: Record<string, string>) => (
                <div
                  key={event.id}
                  className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <RequestEventForm event={event} isAdmin />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Confirmed Events Section */}
        <div>
          <div className="bg-white/10 backdrop-blur-lg rounded-lg shadow-xl p-6">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Confirmed Events
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {eventsArray.map((event: Record<string, string>) => (
                <div
                  key={event.id}
                  className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <ConfirmedEventForm event={event} isAdmin />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
