import { auth } from "@/auth";
import ConfirmedEventForm from "@/src/components/ConfirmedEventForm";
import AddAdminForm from "@/src/components/profile/admin/AddAdminForm";
import AdminList from "@/src/components/profile/admin/AdminList";
import RequestEventForm from "@/src/components/RequestEventForm";
import prisma from "@/src/lib/db";
import { getCalendarLink, isUserAdmin } from "../../api/admin/admin_actions";

export default async function AdminProfile() {
  const requestedEvents = await prisma.requestedEvent.findMany();
  const requestedEventsArray = JSON.parse(JSON.stringify(requestedEvents));
  const events = await prisma.event.findMany();
  const eventsArray = JSON.parse(JSON.stringify(events));
  const session = await auth();
  const user = session?.user;
  const isAdmin = await isUserAdmin(user?.email ?? "");
  const calendarLink = await getCalendarLink();

  if (!isAdmin) {
    return (
      <div className="bg-slate-900 min-h-screen pt-20 flex items-center justify-center">
        <div className="bg-slate-800/50 backdrop-blur-lg rounded-lg p-8 shadow-xl border border-slate-700/50">
          <h1 className="text-2xl font-bold text-indigo-400">Access Denied</h1>
          <p className="text-slate-300 mt-2">
            You are not authorized to use this page
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 min-h-screen pt-20 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-800/50 backdrop-blur-lg rounded-lg shadow-xl p-6 mb-8 border border-slate-700/50">
          <h1 className="text-3xl font-bold text-indigo-400 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-slate-300">Manage your events and bookings</p>
        </div>

        {/* Pending Requests Section */}
        <div className="mb-12">
          <div className="bg-slate-800/50 backdrop-blur-lg rounded-lg shadow-xl p-6 mb-6 border border-slate-700/50">
            <h2 className="text-2xl font-semibold text-slate-200 mb-4">
              Pending Requests
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {requestedEventsArray.map((event: Record<string, string>) => (
                <div
                  key={event.id}
                  className="bg-slate-800/30 backdrop-blur-sm rounded-lg p-6 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300"
                >
                  <RequestEventForm event={event} isAdmin />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Confirmed Events Section */}
        <div className="mb-12">
          <div className="bg-slate-800/50 backdrop-blur-lg rounded-lg shadow-xl p-6 border border-slate-700/50">
            <h2 className="text-2xl font-semibold text-slate-200 mb-4">
              Confirmed Events
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {eventsArray.map((event: Record<string, string>) => (
                <div
                  key={event.id}
                  className="bg-slate-800/30 backdrop-blur-sm rounded-lg p-6 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300"
                >
                  <ConfirmedEventForm event={event} isAdmin />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Manage Admins section */}
        <div>
          <div className="bg-slate-800/50 backdrop-blur-lg rounded-lg shadow-xl p-6 border border-slate-700/50">
            <h2 className="text-2xl font-semibold text-slate-200 mb-4">
              Manage Admins
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AdminList />
              <div className="bg-slate-800/30 backdrop-blur-sm rounded-lg p-6 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300">
                <AddAdminForm />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12">
          <div className="bg-slate-800/50 backdrop-blur-lg rounded-lg shadow-xl p-6 border border-slate-700/50">
            <h2 className="text-2xl font-semibold text-slate-200 mb-4">
              Manage Google Calendar
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <p>My current calendar</p>
              <p>{calendarLink?.link}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
