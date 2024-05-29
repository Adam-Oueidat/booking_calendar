import { useFormStatus } from "react-dom";
import { useActionState } from "react";
import { addEvent } from "@/app/components/actions";

const initialState = void 0;


function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded">
      Add Event
    </button>
  );
}

export default function ModalForm() {
  const [state, formAction] = useActionState(addEvent, initialState);

  return (
    <form action={formAction}>
      <label htmlFor="event-date-from">From: </label>

      <input
        type="date"
        id="event-date-from"
        name="event-date-from"
        className="bg-blue-200 p-2 rounded text-gray-700"
      />

      <label htmlFor="event-date-to">To: </label>
      <input
        type="date"
        id="event-date-to"
        name="event-date-to"
        className="bg-blue-200 p-2 rounded text-gray-700"
      />
      <SubmitButton />
    </form>
  );
}
