import React from "react";

interface EventModalProps {
  fromDate: string;
  setFromDate: (fromDate: string) => void;
  toDate: string;
  setToDate: (toDate: string) => void;
  addEvent: () => void;
  closeModal: () => void;
  removeEvent: () => void;
  currentEvent: boolean;
  date: number;
}

const EventModal: React.FC<EventModalProps> = ({
  fromDate,
  toDate,
  setFromDate,
  setToDate,
  currentEvent,
  addEvent,
  closeModal,
  removeEvent,
  date
}) => {
  return (
    <>
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
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />

          <label htmlFor="event-date-to">To: </label>
          <input
            type="date"
            id="event-date-to"
            name="event-date-to"
            className=""
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
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
    </>
  );
};

export default EventModal;
