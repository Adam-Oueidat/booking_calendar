import Calendar from "@/src/components/calendar/Calendar";

export default async function CalendarPage() {
  return (
    <div className="bg-slate-900 min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="bg-slate-800/50 backdrop-blur-lg rounded-lg shadow-xl p-6 border border-slate-700/50 lg:col-span-1 h-fit">
            <h1 className="text-3xl font-bold text-indigo-400 mb-2">
              Calendar
            </h1>
            <p className="text-slate-300">
              Boka in dig på ett tillgängligt datum
            </p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-lg rounded-lg shadow-xl p-6 border border-slate-700/50 lg:col-span-3">
            <Calendar />
          </div>
        </div>
      </div>
    </div>
  );
}
