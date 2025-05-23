"use client";
import { deleteConfirmedEvent } from "@/src/app/api/server_actions/actions";
import { format } from "date-fns";
import { sv } from "date-fns/locale";
import { useState } from "react";

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
  const startDate = new Date(event.startDate);
  const endDate = new Date(event.endDate);

  const [confirmDelete, setConfirmDelete] = useState(false);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1">
        <h3 className="text-xl font-semibold text-white mb-2">{event.name}</h3>
        <p className="text-white/80 text-sm mb-4 line-clamp-2">
          {event.description}
        </p>

        <div className="flex items-center gap-2 text-sm text-white/60 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span>
            {format(startDate, "d MMM", { locale: sv })} -{" "}
            {format(endDate, "d MMM", { locale: sv })}
          </span>
        </div>
      </div>

      {isAdmin && (
        <div className="mt-auto pt-4 border-t border-white/10">
          {!confirmDelete ? (
            <button
              onClick={() => setConfirmDelete(true)}
              className="w-full bg-red-500/20 hover:bg-red-500/30 text-red-400 hover:text-red-300 rounded-lg py-2 px-4 text-sm font-medium transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              Remove Event
            </button>
          ) : (
            <div className="space-y-4">
              <div className="flex gap-3">
                <button
                  onClick={() => setConfirmDelete(false)}
                  className="flex-1 bg-slate-700/50 hover:bg-slate-700/70 text-slate-300 hover:text-slate-100 rounded-lg py-2 px-4 text-sm font-medium transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteEvent(event)}
                  className="flex-1 bg-red-500/20 hover:bg-red-500/30 text-red-400 hover:text-red-300 rounded-lg py-2 px-4 text-sm font-medium transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                  Confirm
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
