import { useState, useEffect } from "react";
import EventModal from "./event_modal";
import ModalForm from "./modal_form";
import { getCurrentEvent } from "@/app/components/actions";

interface DayProps {
  year: number;
  month: number;
  date: number;

  prevMonth?: boolean;
  nextMonth?: boolean;
}

function Day({
  month,
  year,
  date,
  prevMonth = false,
  nextMonth = false,
}: DayProps) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(false);

  useEffect(() => {
    const fetchCurrentEvent = async () => {
      // Calculate currentEvent here, after the component has mounted on the client
      const newCurrentEvent = await getCurrentEvent(year, month, date);
      setCurrentEvent(newCurrentEvent);
    };
    fetchCurrentEvent();
  }, []);

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
    ? "w-24 h-20 hover:bg-gray-700 bg-gray-500 p-2 rounded"
    : "w-24 h-20 hover:bg-blue-700 bg-blue-500 p-2 rounded";

  const notCurrentMonth = prevMonth || nextMonth ? "opacity-50" : "";

  const divClass = `flex flex-col justify-start items-end p-2 ${isBooked} ${notCurrentMonth}`;
  return (
    <>
      <div className={divClass} onClick={clickHandler}>
        <p>{date}</p>
      </div>
      <div className="flex justify-center items-center">
        {isModalOpen && (
          <EventModal
            currentEvent={currentEvent}
            date={date}
            closeModal={closeModal}
            removeEvent={removeEvent}
          >
            <ModalForm
              date={new Date(year, month, date + 1).toISOString().split("T")[0]}
            />
          </EventModal>
        )}
      </div>
    </>
  );
}
export default Day;
