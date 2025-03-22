import Calendar from "@/src/components/calendar/Calendar";

export default async function CalendarPage() {
  return (
    <div className="bg-ct-blue-600 min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/10 backdrop-blur-lg rounded-lg shadow-xl p-6 mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Calendar</h1>
          <p className="text-white/80">View and manage your events</p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-lg shadow-xl p-6">
          <Calendar />
        </div>
      </div>
    </div>
  );
}
