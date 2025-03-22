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
    ? "bg-white/20 hover:bg-white/30"
    : "hover:bg-white/10";

  const todayClass = isToday
    ? "bg-red-500/20 border-red-500/50"
    : prevMonth || nextMonth
      ? "text-white/40"
      : "text-white";

  return (
    <>
      <div
        className={`h-20 rounded-lg p-1.5 flex flex-col items-end transition-colors duration-200 cursor-pointer border ${todayClass} ${isBooked}`}
        onClick={currentEvent ? undefined : clickHandler}
      >
        <span
          className={`text-xs font-medium ${prevMonth || nextMonth ? "text-white/40" : "text-white"}`}
        >
          {date}
        </span>
        {currentEvent && (
          <div className="mt-auto w-full">
            <div className="h-0.5 bg-white/40 rounded-full"></div>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeModal}
          ></div>
          <EventModal
            date={date}
            closeModal={closeModal}
            removeEvent={removeEvent}
            dateString={
              new Date(year, month, date + 1).toISOString().split("T")[0]
            }
          />
        </div>
      )}
    </>
  );
}
