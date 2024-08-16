import { useFormStatus } from "react-dom";
import { useActionState, useContext, useEffect } from "react";
import { requestEvent } from "@/src/components/actions";
import DateInput from "@/src/components/modal/DateInput";
import TextInput from "@/src/components/modal/TextInput";
import { EventContext } from "@/src/components/calendar/Month";
import { useSession } from "next-auth/react";
import { ADMIN_EMAIL } from "@/src/lib/util/utils";

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
  const [state, formAction] = useActionState(requestEvent, initialState);
  const { refreshing, setRefreshing } = useContext(EventContext);
  const { data: session, status } = useSession();
  const isAdmin = session?.user?.email === "ooueidat@gmail.com";

  useEffect(() => {
    if (state) {
      closeModal();
      setRefreshing(true);
    }
  }, [state, closeModal, refreshing]);

  return (
    <form action={formAction}>
      <div className="grid gap-2 mb-6 lg:grid-cols-2 w-full">
        <TextInput
          label="Name:"
          id="name"
          name="name"
          placeholder="Skriv ditt namn"
          requiredValue={true}
        />
        <TextInput
          label="Email:"
          id="email"
          name="email"
          placeholder="janedoe@example.com"
          requiredValue={true}
        />
        <TextInput
          label="Beskrivning:"
          id="description"
          name="description"
          placeholder="Vad vill vi göra?"
          styling="col-span-2"
          requiredValue={true}
        />
        <DateInput
          label="From:"
          id="event-date-from"
          name="event-date-from"
          defaultValue={date}
        />
        <DateInput
          label="To:"
          id="event-date-to"
          name="event-date-to"
          defaultValue={date}
        />
      </div>
      <div className="relative bottom-0 right-0">
        <SubmitButton />
        {status === "authenticated" && isAdmin ? (
          <button
            type="submit"
            value="submit"
            className="bg-red-600 float-end hover:bg-green-800 text-white font-bold py-2 px-4 mr-2 rounded"
          >
            Block event
          </button>
        ) : null}
      </div>
    </form>
  );
}
