"use client";
import { useState } from "react";
interface DayProps {
  date: number;
  event: boolean;
  currentWeekday: number;
}

function Day({ date, event: initialEvent, currentWeekday }: DayProps) {
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const [currentEvent, setEvent] = useState(initialEvent);
  const [isModalOpen, setModalOpen] = useState(false);

  function addEvent() {
    setEvent(true);
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
        <div className="fixed bg-center top-0 left-0 w-full h-full bg-black bg-opacity-50">
          <div className="content-center bg-blue-300 w-1/2 h-1/2 p-8 rounded-lg">
            <h1 className="text-2xl font-bold">Event</h1>
            <p>Event for {date}</p>
            <label htmlFor="event-date-from">From: </label>
            <input
              type="date"
              id="event-date-from"
              name="event-date-from"
              className=""
            />

            <label htmlFor="event-date-to">To: </label>
            <input
              type="date"
              id="event-date-to"
              name="event-date-to"
              className=""
            />
            {!currentEvent && (
              <button
                className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded"
                onClick={addEvent}
              >
                Add Event
              </button>
            )}
            {currentEvent && (
              <button
                className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded"
                onClick={removeEvent}
              >
                Remove event
              </button>
            )}

            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
export default Day;
