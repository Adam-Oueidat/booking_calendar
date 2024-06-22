"use client";
import Link from "next/link";
import { useActionState } from "react";
import { bookTicket } from "@/src/components/actions";

const initialState = false;

export default function BookingTrainForm() {
  const [state, formAction] = useActionState(bookTicket, initialState);

  return (
    <form action={formAction} className="grid gap-5">
      <select
        name="city-from"
        id="city-from"
        className="bg-gray-50 border border-gray-300 
        text-gray-900 text-sm 
        rounded-lg focus:ring-blue-500 
        focus:border-blue-500 block 
        w-full p-2.5 
        dark:bg-gray-700 dark:border-gray-600 
        dark:placeholder-gray-400 dark:text-white
        dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option disabled selected className="display:none">
          Välj stad att åka ifrån
        </option>
        <option value="gothenburg">Göteborg</option>
        <option value="stockholm">Stockholm</option>
        <option value="malmo">Malmö</option>
      </select>
      <button
        type="submit"
        value="submit"
        className="justify-self-end bg-gray-600 rounded-lg text-sm w-auto inline-block p-1.5"
      >
        Boka tågbiljett
      </button>
    </form>
  );
}
