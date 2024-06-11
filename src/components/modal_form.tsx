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
      <div className="flex items-center">
        <form action={formAction} className="space-y-4 h-full w-full">
          <div className="grid grid-cols-2 space-x-4 space-y-4 gap-2">
            <label className="p-2">Namn:</label>
            <div>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Skriv ditt namn"
                className="bg-blue-200 rounded text-gray-900 p-2.5"
                style={{ width: "8.8rem", height: "2rem" }}
                required={true}
              />
            </div>
            <label className="">Email:</label>
            <div>
              <input
                type="text"
                id="email"
                name="email"
                placeholder="Skriv ditt mail"
                className="bg-blue-200 rounded text-gray-900 border p-2.5"
                //className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                style={{ width: "8.8rem", height: "2rem" }}
                required={true}
              />
            </div>

            <label htmlFor="event-date-from">From: </label>
            <input
              type="date"
              id="event-date-from"
              name="event-date-from"
              className="bg-blue-200 p-2 rounded text-gray-700"
              style={{ width: "8.8rem" }}
              defaultValue={date}
            />
            <label htmlFor="event-date-to">To: </label>
            <input
              type="date"
              id="event-date-to"
              name="event-date-to"
              className="bg-blue-200 p-2 rounded text-gray-700"
              style={{ width: "8.8rem" }}
              defaultValue={date}
            />
          </div>
          <div className="relative bottom-0 right-0">
            <SubmitButton />
          </div>
        </form>
      </div>
    </>
  );
}
