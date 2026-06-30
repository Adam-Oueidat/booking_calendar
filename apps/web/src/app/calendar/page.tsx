import Calendar from "@/src/components/calendar/Calendar";

export default async function CalendarPage() {
  return (
    <div className="bg-cph-navy min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="bg-white/5 backdrop-blur-lg rounded-lg shadow-xl border border-cph-sky/15 lg:col-span-1 h-fit overflow-hidden">
            <div className="flex h-1.5 w-full" aria-hidden="true">
              {["#E6A23C", "#C25342", "#2F6E69", "#4A6FA5", "#E8C766", "#B94B3C"].map((c) => (
                <span key={c} className="flex-1" style={{ backgroundColor: c }} />
              ))}
            </div>
            <div className="p-6">
              <h1 className="font-display text-3xl font-bold text-cph-ochre mb-2">
                Calendar
              </h1>
              <p className="text-cph-sky">
                Boka in dig på ett tillgängligt datum
              </p>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-lg rounded-lg shadow-xl p-6 border border-cph-sky/15 lg:col-span-3">
            <Calendar />
          </div>
        </div>
      </div>
    </div>
  );
}
