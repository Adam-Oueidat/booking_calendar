import { useState, useEffect } from "react";
import EventModal from "./event_modal";
import ModalForm from "./modal_form";
import Link from "next/link";

type DayProps = {
  year: number;
  month: number;
  date: number;
  prevMonth?: boolean;
  nextMonth?: boolean;
  currentEvent?: boolean;
  isToday?: boolean;
};
function Day({
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
    ? "w-24 h-20 bg-gray-500"
    : "w-24 h-20 hover:bg-blue-700 bg-blue-500";

  const isTodayClass = isToday
    ? "bg-red-500 w-7 h-7 bg-center rounded-full flex justify-center items-center"
    : "w-7 h-7 bg-center rounded-full flex justify-center items-center";
  const notCurrentMonth = prevMonth || nextMonth ? "opacity-50" : "";

  const divClass = `flex flex-col justify-start items-end p-1 border ${isBooked} ${notCurrentMonth}`;
  return (
    <>
      <div
        className={divClass}
        onClick={currentEvent ? undefined : clickHandler}
      >
        <div className={isTodayClass}>
          <p>{date}</p>
        </div>
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
export default Day;
