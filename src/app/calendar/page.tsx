import Calendar from "@/src/components/calendar/Calendar";

export default function CalendarPage() {
  return (
    <>
      <div className="font-sans grid grid-rows-[20px_1fr_20px] justify-items-center w-full h-screen min-h-screen mr-24 p-8 pb-20 gap-16 sm:p-20">
        <div className="flex space-x-40">
          <h1 className="text-4xl font-semibold text-center">Tåg biljetter</h1>
          <Calendar />
        </div>
      </div>
    </>
  );
}
