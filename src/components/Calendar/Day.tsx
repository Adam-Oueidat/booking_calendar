import { useState, useEffect } from "react";
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
  prevMonth = false,
  nextMonth = false,
  currentEvent = false,
  isToday = false,
}: DayProps) {
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeModal();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

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
    : "hover:bg-violet-700 bg-violet-500";

  const todayClass =
    "w-7 h-7 bg-center rounded-full flex justify-center items-center";
  const isTodayClass = isToday ? `bg-red-500 ${todayClass}` : todayClass;
  const notCurrentMonth = prevMonth || nextMonth ? "opacity-70" : "";

  const divClassDayResponsive = `w-full min-[320px]:w-14 min-[320px]:h-14 sm:w-16 sm:h-12 md:w-20 md:h-16 lg:w-20 lg:h-16 xl:w-24 xl:h-20 2xl:w-30 2xl:h-26`;
  const divClassDay = `flex flex-col justify-start items-end p-1 border ${divClassDayResponsive} ${isBooked} ${notCurrentMonth}`;
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
