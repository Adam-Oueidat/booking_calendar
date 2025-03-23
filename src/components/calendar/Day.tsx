import { useState } from "react";
import EventModal from "@/src/components/modal/EventModal";

type DayProps = {
  year: number;
  month: number;
  date: number;
  prevMonth?: boolean;
  nextMonth?: boolean;
  currentEvent?: boolean;
  requestedEvent?: boolean;
  isToday?: boolean;
};

export default function Day({
  month,
  year,
  date,
  prevMonth,
  nextMonth,
  currentEvent,
  requestedEvent,
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

  const dayClass = `h-20 rounded-lg p-1.5 flex flex-col items-end transition-colors duration-200 cursor-pointer border ${
    prevMonth || nextMonth
      ? "bg-gray-700/40 text-gray-300 border-gray-600/50"
      : currentEvent
        ? "bg-indigo-600/40 border-indigo-500/60"
        : requestedEvent
          ? "bg-blue-600/40 border-blue-500/60"
          : "hover:bg-white/20 border-white/20"
  } ${isToday ? "bg-red-500/30 border-red-500/60" : ""}`;

  return (
    <>
      <div
        className={dayClass}
        onClick={currentEvent || requestedEvent ? undefined : clickHandler}
        role="button"
        aria-label={`${date} ${new Date(year, month).toLocaleString("default", { month: "long" })} ${isToday ? "(Today)" : ""}`}
        tabIndex={currentEvent ? -1 : 0}
      >
        <span
          className={`text-sm font-medium ${
            prevMonth || nextMonth
              ? "text-gray-300"
              : isToday
                ? "text-white font-bold"
                : "text-white"
          }`}
        >
          {date}
        </span>
        {currentEvent && (
          <div className="mt-auto w-full flex flex-col gap-1">
            <div className="h-1.5 bg-indigo-400 rounded-full"></div>
            <div className="text-xs text-indigo-100 font-medium">Bokad</div>
          </div>
        )}
        {requestedEvent && (
          <div className="mt-auto w-full flex flex-col gap-1">
            <div className="h-1.5 bg-blue-400 rounded-full"></div>
            <div className="text-xs text-blue-100 font-medium">Förfrågan</div>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={closeModal}
            role="button"
            aria-label="Close modal"
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
