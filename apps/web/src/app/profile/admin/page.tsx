import ConfirmedEventForm from "@/src/components/ConfirmedEventForm";
import AddAdminForm from "@/src/components/profile/admin/AddAdminForm";
import AdminList from "@/src/components/profile/admin/AdminList";
import RequestEventForm from "@/src/components/RequestEventForm";
import prisma from "@repo/db";
import { getCalendarLink, isUserAdmin } from "../../api/admin/admin_actions";

// This page renders per-request admin data from the database and reads the
// auth session, so it must not be statically prerendered at build time.
export const dynamic = "force-dynamic";

export default async function AdminProfile() {
  const requestedEvents = await prisma.requestedEvent.findMany();
  const requestedEventsArray = JSON.parse(JSON.stringify(requestedEvents));
  const events = await prisma.event.findMany();
  const eventsArray = JSON.parse(JSON.stringify(events));
  const isAdmin = await isUserAdmin();
  const calendarLink = await getCalendarLink();

  if (!isAdmin) {
    return (
      <div className="bg-cph-navy min-h-screen pt-20 flex items-center justify-center">
        <div className="bg-white/5 backdrop-blur-lg rounded-lg p-8 shadow-xl border border-cph-sky/15">
          <h1 className="font-display text-2xl font-bold text-cph-ochre">Access Denied</h1>
          <p className="text-cph-sky mt-2">
            You are not authorized to use this page
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-cph-navy min-h-screen pt-20 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/5 backdrop-blur-lg rounded-lg shadow-xl mb-8 border border-cph-sky/15 overflow-hidden">
          <div className="flex h-1.5 w-full" aria-hidden="true">
            {["#E6A23C", "#C25342", "#2F6E69", "#4A6FA5", "#E8C766", "#B94B3C"].map((c) => (
              <span key={c} className="flex-1" style={{ backgroundColor: c }} />
            ))}
          </div>
          <div className="p-6">
            <h1 className="font-display text-3xl font-bold text-cph-ochre mb-2">
              Admin Dashboard
            </h1>
            <p className="text-cph-sky">Manage your events and bookings</p>
          </div>
        </div>

        {/* Pending Requests Section */}
        <div className="mb-12">
          <div className="bg-white/5 backdrop-blur-lg rounded-lg shadow-xl p-6 mb-6 border border-cph-sky/15">
            <h2 className="font-display text-2xl font-semibold text-cph-paper mb-4">
              Pending Requests
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {requestedEventsArray.map((event: Record<string, string>) => (
                <div
                  key={event.id}
                  className="bg-white/[0.03] backdrop-blur-xs rounded-lg p-6 border border-cph-sky/15 hover:border-cph-sky/30 transition-all duration-300"
                >
                  <RequestEventForm event={event} isAdmin />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Confirmed Events Section */}
        <div className="mb-12">
          <div className="bg-white/5 backdrop-blur-lg rounded-lg shadow-xl p-6 border border-cph-sky/15">
            <h2 className="font-display text-2xl font-semibold text-cph-paper mb-4">
              Confirmed Events
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {eventsArray.map((event: Record<string, string>) => (
                <div
                  key={event.id}
                  className="bg-white/[0.03] backdrop-blur-xs rounded-lg p-6 border border-cph-sky/15 hover:border-cph-sky/30 transition-all duration-300"
                >
                  <ConfirmedEventForm event={event} isAdmin />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Manage Admins section */}
        <div>
          <div className="bg-white/5 backdrop-blur-lg rounded-lg shadow-xl p-6 border border-cph-sky/15">
            <h2 className="font-display text-2xl font-semibold text-cph-paper mb-4">
              Manage Admins
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AdminList />
              <div className="bg-white/[0.03] backdrop-blur-xs rounded-lg p-6 border border-cph-sky/15 hover:border-cph-sky/30 transition-all duration-300">
                <AddAdminForm />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12">
          <div className="bg-white/5 backdrop-blur-lg rounded-lg shadow-xl p-6 border border-cph-sky/15">
            <h2 className="font-display text-2xl font-semibold text-cph-paper mb-4">
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
