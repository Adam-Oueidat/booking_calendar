"use client";
import {
  addEvent,
  deleteRequestedEvent,
} from "@/src/app/api/server_actions/actions";
import { format } from "date-fns";
import { sv } from "date-fns/locale";
import { Button } from "@repo/ui";

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
  isAdmin = false,
}: RequestEventFormProps) {
  const startDate = new Date(event.startDate);
  const endDate = new Date(event.endDate);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1">
        <h3 className="font-display text-xl font-semibold text-cph-paper mb-2">{event.name}</h3>
        <p className="text-cph-paper/80 text-sm mb-4 line-clamp-2">
          {event.description}
        </p>

        <div className="flex items-center gap-2 text-sm text-cph-sky mb-4">
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

        <div className="flex items-center gap-2 text-sm text-cph-sky mb-4">
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
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          <span>{event.email}</span>
        </div>
      </div>

      <div className="mt-auto pt-4 border-t border-cph-sky/15">
        <div className="flex gap-3">
          <Button
            variant="destructive"
            size="sm"
            className="flex-1"
            onClick={() => handleDeleteEvent(event)}
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
            Remove
          </Button>
          {isAdmin && (
            <Button
              variant="success"
              size="sm"
              className="flex-1"
              onClick={() => handleAddEvent(event)}
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
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Accept
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
