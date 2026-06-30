"use client";
import { useActionState } from "react";
import { bookTicket } from "@/src/app/api/server_actions/actions";

const initialState = false;

export default function BookingTrainForm() {
  const [, formAction] = useActionState(bookTicket, initialState);

  return (
    <form action={formAction} className="grid gap-5">
      <select
        name="city-from"
        id="city-from"
        className="bg-cph-navy border border-cph-sky/15
        text-cph-paper text-sm
        rounded-lg focus:ring-cph-ochre
        focus:border-transparent block
        w-full p-2.5
        placeholder-cph-sky/70"
        defaultValue="default"
      >
        <option disabled value="default" className="display:none">
          Välj stad att åka ifrån
        </option>
        <option value="gothenburg">Göteborg</option>
        <option value="stockholm">Stockholm</option>
        <option value="malmo">Malmö</option>
      </select>
      <button
        type="submit"
        value="submit"
        className="justify-self-end bg-cph-ochre text-cph-navy hover:bg-amber-300 transition-colors rounded-lg text-sm w-auto inline-block p-1.5"
      >
        Boka tågbiljett
      </button>
    </form>
  );
}
