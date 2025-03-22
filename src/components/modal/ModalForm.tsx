import { useFormStatus } from "react-dom";
import { useActionState, useContext, useEffect } from "react";
import { requestEvent, blockEvent } from "@/src/app/api/server_actions/actions";
import DateInput from "@/src/components/modal/DateInput";
import TextInput from "@/src/components/modal/TextInput";
import { EventContext } from "@/src/components/calendar/Month";
import { useSession } from "next-auth/react";

const initialState = {
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
      className="bg-green-600 float-end hover:bg-green-800 text-white font-bold py-2 px-4 rounded"
      disabled={pending}
    >
      Request Dates
    </button>
  );
}
export default function ModalForm({ date, closeModal }: ModalFormProps) {
  const [state, formAction] = useActionState(requestEvent, initialState);
  const [state2, formAction2] = useActionState(blockEvent, initialState2);
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
    <form action={formAction}>
      <h1 className="text-red-600">{state.error}</h1>
      <div className="grid gap-2 mb-6 lg:grid-cols-2 w-full">
        <TextInput
          label="Name:"
          id="name"
          name="name"
          defaultValue={session?.user?.name ? session.user.name : "Namn"}
          placeholder="Skriv ditt namn"
          requiredValue={true}
        />
        <TextInput
          label="Email:"
          id="email"
          name="email"
          defaultValue={
            session?.user?.email ? session.user.email : "janedoe@example.com"
          }
          // placeholder={
          //   session?.user?.email ? session.user.email : "janedoe@example.com"
          // }
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
        {status === "authenticated" && isAdmin ? (
          <>
            <button
              type="submit"
              value="submit"
              formAction={formAction2}
              className="bg-red-600 float-end hover:bg-red-800 text-white font-bold py-2 px-4 mr-2 rounded"
            >
              Block event
            </button>
            <SubmitButton />
          </>
        ) : (
          <SubmitButton />
        )}
      </div>
    </form>
  );
}
