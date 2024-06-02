import { useFormStatus } from "react-dom";
import { useActionState } from "react";
import { addEvent } from "@/app/components/actions";

const initialState = void 0;

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      className="bg-green-600 float-end hover:bg-green-800 text-white font-bold py-2 px-4 rounded"
      disabled={pending}
    >
      Add Event
    </button>
  );
}
export default function ModalForm({ date }: { date: string }) {
  const [state, formAction] = useActionState(addEvent, initialState);

  return (
    <form action={formAction}>
      <label htmlFor="event-date-from">From: </label>

      <input
        type="date"
        id="event-date-from"
        name="event-date-from"
        className="bg-blue-200 p-2 rounded text-gray-700"
        defaultValue={date}
      />

      <label htmlFor="event-date-to">To: </label>
      <input
        type="date"
        id="event-date-to"
        name="event-date-to"
        className="bg-blue-200 p-2 rounded text-gray-700"
        defaultValue={date}
      />

      <SubmitButton />
    </form>
  );
}
