import { useState, useEffect } from "react";
import EventModal from "./event_modal";

interface DayProps {
  events: any;
  year: number;
  month: number;
  date: number;
  event: boolean;
  currentWeekday: number;
  calendarEvents: { [key: number]: any };
}

function Day({
  events,
  month,
  year,
  date,
  event: initialEvent,
  currentWeekday,
  calendarEvents,
}: DayProps) {
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
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
  function getCurrentEvent(): boolean {
    const datesList = events.value;
    const jsonArray = JSON.parse(datesList);
    const currentDate = new Date(year, month, date).setHours(0, 0, 0, 0);
    if (!jsonArray) {
      return false;
    }
    jsonArray.forEach((event: any) => {
        const startDate = new Date(event.startDate.replace('$D', '')).getTime();
        const endDate = new Date(event.endDate.replace('$D', '')).getTime();
        if (currentDate >= startDate && currentDate <= endDate) {
            return true;
          }
    });
    
    return false;
  }
  function clickHandler() {
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
  }
  const currentEvent = getCurrentEvent();
  const divClass = currentEvent
    ? "w-24 h-24 hover:bg-gray-700 bg-gray-500 p-2 rounded"
    : "w-24 h-24 hover:bg-blue-700 bg-blue-500 p-2 rounded";

  return (
    <>
      <div className={divClass} onClick={clickHandler}>
        <p>{date}</p>
        <p>{weekdays[currentWeekday]}</p>
        <p>{currentEvent ? "Event" : "No Event"}</p>
      </div>
      {isModalOpen && (
        <EventModal
          currentEvent={currentEvent}
          date={date}
          closeModal={closeModal}
          removeEvent={removeEvent}
          calendarEvents={calendarEvents}
        />
      )}
    </>
  );
}
export default Day;
