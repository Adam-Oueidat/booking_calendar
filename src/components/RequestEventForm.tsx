"use client";
import { addEvent, deleteRequestedEvent } from "@/src/components/actions";

type RequestEventFormProps = {
  event: Record<string, string>;
  isAdmin?: boolean;
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
export default function RequestEventForm({
  event,
  isAdmin,
}: RequestEventFormProps) {
  return (
    <div key={event.id} className="bg-slate-400 rounded p-5 px-10 flex flex-col gap-2">
      <div className="event-name">{event.name}</div>
      <div className="event-description">{event.description}</div>
      <div className="grid grid-cols-2 gap-5 ">
        <div className="event-date">{event.startDate.split("T")[0]}</div>
        <div>{event.endDate.split("T")[0]}</div>
      </div>
      {isAdmin && (
        <div className="flex justify-end gap-2">
          <button
            onClick={() => handleDeleteEvent(event)}
            className="bg-red-600 text-white rounded p-2"
          >
            Remove
          </button>
          <button
            onClick={() => handleAddEvent(event)}
            className="bg-green-800 text-white rounded p-2"
          >
            Accept
          </button>
        </div>
      )}
    </div>
  );
}
