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
      ? "bg-white/[0.03] text-cph-sky/70 border-cph-sky/15 hover:bg-white/[0.08] hover:border-cph-sky/30 hover:text-cph-sky"
      : currentEvent
        ? "bg-cph-ochre/15 border-cph-ochre/60"
        : requestedEvent
          ? "bg-cph-teal/20 border-cph-teal/60"
          : "hover:bg-white/5 border-cph-sky/30"
  } ${isToday ? "bg-cph-rust/20 border-cph-rust/60" : ""}`;

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
          className={`font-mono text-sm font-medium ${
            prevMonth || nextMonth
              ? "text-cph-sky/70"
              : isToday
                ? "text-cph-paper font-bold"
                : "text-cph-paper"
          }`}
        >
          {date}
        </span>
        {currentEvent && (
          <div className="mt-auto w-full flex flex-col gap-1">
            <div className="h-1.5 bg-cph-ochre rounded-full"></div>
            <div className="text-xs text-cph-ochre font-medium">Bokad</div>
          </div>
        )}
        {requestedEvent && (
          <div className="mt-auto w-full flex flex-col gap-1">
            <div className="h-1.5 bg-cph-teal rounded-full"></div>
            <div className="text-xs text-cph-teal font-medium">Förfrågan</div>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
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
