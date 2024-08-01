"use client";
import { addEvent, deleteRequestedEvent } from "@/src/components/actions";

type TRequestEventForm = {
  event: Record<string, string>;
};

type Event = {
  id: string;
  name: string;
  description: string;
  email: string;
  startDate: string;
  endDate: string;
};

const handleAddEvent = async (event: Record<string, string>) => {
  const newEvent: Event = {
    id: event.id,
    name: event.name,
    description: event.description,
    email: event.email,
    startDate: event.startDate,
    endDate: event.endDate,
  };
  await addEvent(newEvent);
  await deleteRequestedEvent(newEvent);
};

const handleDeleteEvent = async (event: Record<string, string>) => {
  const newEvent: Event = {
    id: event.id,
    name: event.name,
    description: event.description,
    email: event.email,
    startDate: event.startDate,
    endDate: event.endDate,
  };
  await deleteRequestedEvent(newEvent);
};
export default function RequestEventForm({ event }: TRequestEventForm) {
  return (
    <div key={event.id} className="bg-gray-500 rounded p-5 px-10">
      <div className="event-name">{event.name}</div>
      <div className="grid grid-cols-2 gap-5 ">
        <div className="event-date">{event.startDate.split("T")[0]}</div>
        <div>{event.endDate.split("T")[0]}</div>
      </div>
      <div className="flex justify-end">
        <button
          onClick={() => handleDeleteEvent(event)}
          className="bg-red-600 text-white rounded p-2"
        >
          Decline
        </button>
        <button
          onClick={() => handleAddEvent(event)}
          className="bg-green-800 text-white rounded p-2"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
