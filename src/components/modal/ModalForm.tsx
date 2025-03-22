"use client";

import { useFormStatus } from "react-dom";
import { useActionState, useContext, useEffect } from "react";
import { requestEvent, blockEvent } from "@/src/app/api/server_actions/actions";
import DateInput from "@/src/components/modal/DateInput";
import TextInput from "@/src/components/modal/TextInput";
import { EventContext } from "@/src/components/calendar/Month";
import { useSession } from "next-auth/react";

type RequestEventState = Record<string, string | boolean>;

const initialState: RequestEventState = {
  closeModal: false,
  message: "",
  error: "",
};

const initialState2 = false;

type ModalFormProps = {
  date: string;
  closeModal: () => void;
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      value="submit"
      className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
      disabled={pending}
    >
      {pending ? (
        <>
          <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
          <span>Processing...</span>
        </>
      ) : (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <span>Boka</span>
        </>
      )}
    </button>
  );
}

export default function ModalForm({ date, closeModal }: ModalFormProps) {
  const [state, formAction] = useActionState<RequestEventState, FormData>(
    requestEvent,
    initialState
  );
  const [state2, formAction2] = useActionState<boolean, FormData>(
    blockEvent,
    initialState2
  );
  const { refreshing, setRefreshing } = useContext(EventContext);
  const { data: session, status } = useSession();
  const isAdmin = session?.user?.email === process.env.ADMIN_EMAIL;

  useEffect(() => {
    if (state.closeModal || state2) {
      closeModal();
      setRefreshing(true);
    }
  }, [state.closeModal, closeModal, refreshing, setRefreshing, state2]);

  return (
    <form action={formAction} className="space-y-6">
      {state.error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
          {state.error}
        </div>
      )}

      <div className="grid gap-4">
        <div className="grid gap-2 lg:grid-cols-2">
          <TextInput
            label="Name"
            id="name"
            name="name"
            defaultValue={session?.user?.name ? session.user.name : "Namn"}
            placeholder="Enter your name"
            requiredValue={true}
          />
          <TextInput
            label="Email"
            id="email"
            name="email"
            defaultValue={
              session?.user?.email ? session.user.email : "janedoe@example.com"
            }
            requiredValue={true}
          />
        </div>

        <TextInput
          label="Description"
          id="description"
          name="description"
          placeholder="What would you like to do?"
          requiredValue={true}
        />

        <div className="grid gap-2 lg:grid-cols-2">
          <DateInput
            label="From"
            id="event-date-from"
            name="event-date-from"
            defaultValue={date}
          />
          <DateInput
            label="To"
            id="event-date-to"
            name="event-date-to"
            defaultValue={date}
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        {status === "authenticated" && isAdmin && (
          <button
            type="submit"
            value="submit"
            formAction={formAction2}
            className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200 flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <span>Block Event</span>
          </button>
        )}
        <SubmitButton />
      </div>
    </form>
  );
}
