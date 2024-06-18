import Calendar from "@/src/components/calendar/Calendar";
import Link from "next/link";

export default function CalendarPage() {
  return (
    <>
      <div className="font-sans grid grid-rows-[20px_1fr_20px] justify-items-center w-full h-screen min-h-screen mr-24 p-8 pb-20 gap-16 sm:p-20">
        <div className="flex space-x-40">
          <div className="grid gap-5  ">
            <h1 className="text-4xl font-semibold text-center">
              Tåg biljetter
            </h1>
            <label>Från</label>
            <input />
            <label>Till</label>
            <input />
            <Link href="https://www.sj.se/sok-resa/sok/fran-station/till-station/datum-for-utresa">
              Boka här
            </Link>
          </div>
          <Calendar />
        </div>
      </div>
    </>
  );
}
