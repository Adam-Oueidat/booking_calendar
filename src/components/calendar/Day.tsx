import { useState } from "react";
import EventModal from "@/src/components/modal/EventModal";

type DayProps = {
  year: number;
  month: number;
  date: number;
  prevMonth?: boolean;
  nextMonth?: boolean;
  currentEvent?: boolean;
  isToday?: boolean;
};
export default function Day({
  month,
  year,
  date,
  prevMonth,
  nextMonth,
  currentEvent,
  isToday,
}: DayProps) {
  const [isModalOpen, setModalOpen] = useState(false);

  function removeEvent() {
    setModalOpen(false);
  }

  function clickHandler() {
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
  }

  const isBooked = currentEvent
    ? "bg-gray-500"
    : "hover:bg-stone-800 bg-stone-600";

  const todayClass =
    "w-6 h-6 bg-center rounded-full flex justify-center items-center text-sm";
  const isTodayClass = isToday ? `bg-red-500 ${todayClass}` : todayClass;
  const notCurrentMonth = prevMonth || nextMonth ? "opacity-40" : "";

  const divClassDayResponsive = `w-full min-[320px]:w-12 min-[320px]:h-12 sm:w-16 sm:h-12 md:w-18 md:h-14 lg:w-20 lg:h-16 xl:w-20 xl:h-16 2xl:w-30 2xl:h-26`;
  // const divClassDay = `flex flex-col text-sm justify-start items-end text-muted-foreground bg-accent-foreground p-4 rounded ${divClassDayResponsive} ${isBooked} ${notCurrentMonth}`;
  const divClassDay = `text-muted-foreground bg-accent-foreground rounded flex flex-col justify-start items-end p-1 border ${divClassDayResponsive} ${isBooked} ${notCurrentMonth}`;
  return (
    <>
      <div
        className={divClassDay}
        onClick={currentEvent ? undefined : clickHandler}
      >
        <p className={isTodayClass}>{date}</p>
      </div>
      <div className="flex justify-center items-center">
        {isModalOpen && (
          <EventModal
            date={date}
            closeModal={closeModal}
            removeEvent={removeEvent}
            dateString={
              new Date(year, month, date + 1).toISOString().split("T")[0]
            }
          />
        )}
      </div>
    </>
  );
}
