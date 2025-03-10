import Calendar from "@/src/components/calendar/Calendar";

export default async function CalendarPage() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] justify-center w-full h-screen min-h-screen mr-24 p-8 pb-20 gap-16 sm:p-20">
      <div className="md:flex lg:space-x-40 min-[320px]:flex-col">
        <Calendar />
      </div>
    </div>
  );
}
