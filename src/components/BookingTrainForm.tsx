"use client";
import Link from "next/link";
import { useActionState } from "react";
import { bookTicket } from "@/src/components/actions";

const initialState = false;

export default function BookingTrainForm() {
  const [state, formAction] = useActionState(bookTicket, initialState);

  return (
    <form action={formAction} className="grid gap-5">
      <label>Från</label>
      <select name="city-from" id="city-from" className="text-black rounded">
        <option value="gothenburg">Göteborg</option>
        <option value="stockholm">Stockholm</option>
        <option value="malmo">Malmö</option>
      </select>
      <button type="submit" value="submit">
        Add Event
      </button>
    </form>
  );
}
