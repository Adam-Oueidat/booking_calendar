"use client";
import { deleteConfirmedEvent } from "@/src/app/api/server_actions/actions";

type ConfirmedEventFormProps = {
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

const handleDeleteEvent = async (event: Record<string, string>) => {
  const newEvent: Event = {
    id: event.id,
    name: event.name,
    description: event.description,
    email: event.email,
    startDate: event.startDate,
    endDate: event.endDate,
  };
  await deleteConfirmedEvent(newEvent);
};
export default function ConfirmedEventForm({
  event,
  isAdmin,
}: ConfirmedEventFormProps) {
  return (
    <div
      key={event.id}
      className="bg-slate-400 rounded p-5 px-10 flex flex-col gap-2"
    >
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
        </div>
      )}
    </div>
  );
}
