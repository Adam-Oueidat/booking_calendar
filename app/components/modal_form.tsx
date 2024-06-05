import { useFormStatus } from "react-dom";
import { useActionState, useEffect } from "react";
import { addEvent } from "@/app/components/actions";

const initialState = void 0;
type ModalFormProps = {
  date: string;
  closeModal: () => void;
};

function SubmitButton({ closeModal }: { closeModal: () => void }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      value="submit"
      className="bg-green-600 float-end hover:bg-green-800 text-white font-bold py-2 px-4 rounded"
      disabled={pending}
    >
      Add Event
    </button>
  );
}
export default function ModalForm({ date, closeModal }: ModalFormProps) {
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

      <SubmitButton closeModal={closeModal} />
    </form>
  );
}
