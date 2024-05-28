"use client";
import { useState, useEffect } from "react";
import EventModal from "./event_modal";
interface DayProps {
  date: number;
  event: boolean;
  currentWeekday: number;
  calendarEvents: { [key: number]: any };
}

function Day({
  date,
  event: initialEvent,
  currentWeekday,
  calendarEvents,
}: DayProps) {
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const [currentEvent, setEvent] = useState(initialEvent);
  const [isModalOpen, setModalOpen] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [calendarEvent, setCalendarEvents] = useState(calendarEvents);

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

function addEvent() {
    const start = new Date(fromDate);
    const end = new Date(toDate);
    const newCalendarEvents = { ...calendarEvent };

    for (let dt = start; dt <= end; dt.setDate(dt.getDate() + 1)) {
            const month = dt.getMonth();
            const date = dt.getDate();
            newCalendarEvents[month][date] = false;
    }

    setCalendarEvents(newCalendarEvents);
    setModalOpen(false);
}

  function removeEvent() {
    setEvent(false);
    setModalOpen(false);
  }

  function clickHandler() {
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
  }
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
            date={date}
            fromDate={fromDate}
            toDate={toDate}
            setFromDate={setFromDate}
            setToDate={setToDate}
            currentEvent={currentEvent}
            addEvent={addEvent}
            closeModal={closeModal}
            removeEvent={removeEvent}
        />
      )}
    </>
  );
}
export default Day;
