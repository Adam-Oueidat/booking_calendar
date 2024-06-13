import { useFormStatus } from "react-dom";
import { useActionState, useEffect } from "react";
import { addEvent } from "@/src/components/actions";
import { revalidatePath } from "next/cache";

const initialState = false;
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
      className="bg-green-600 float-end hover:bg-green-800 text-white font-bold py-2 px-4 rounded"
      disabled={pending}
    >
      Add Event
    </button>
  );
}
export default function ModalForm({ date, closeModal }: ModalFormProps) {
  const [state, formAction] = useActionState(addEvent, initialState);

  useEffect(() => {
    if (state) {
      closeModal();
    }
  }, [state]);

  return (
    <>
      <form action={formAction}>
        <div className="grid gap-2 mb-6 lg:grid-cols-2 w-full">
          <div>
            <label className="block mb-0.5 text-sm font-medium p-2 ">
              Namn:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Skriv ditt namn"
              className="bg-blue-200 rounded border text-gray-900 p-2.5 w-full text-sm"
              required={true}
            />
          </div>
          <div>
            <label className="block mb-0.5 text-sm font-medium p-2">
              Email:
            </label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Skriv ditt mail"
              className="bg-blue-200 rounded border mb-2 text-gray-900 p-2.5 w-full text-sm"
              required={true}
            />
          </div>
          <div>
            <label htmlFor="event-date-from">From: </label>
            <input
              type="date"
              id="event-date-from"
              name="event-date-from"
              className="bg-blue-200 block border w-full p-2 rounded text-gray-700"
              defaultValue={date}
            />
          </div>
          <div>
            <label htmlFor="event-date-to">To: </label>
            <input
              type="date"
              id="event-date-to"
              name="event-date-to"
              className="bg-blue-200 block border w-full p-2 rounded text-gray-700"
              defaultValue={date}
            />
          </div>
        </div>
        <div className="relative bottom-0 right-0">
          <SubmitButton />
        </div>
      </form>
    </>
  );
}
