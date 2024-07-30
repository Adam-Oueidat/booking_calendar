"use client";
import { useActionState } from "react";
import { addEvent } from "@/src/components/actions";

type TRequestEventForm = {
  event: Record<string, string>;
};
export default function RequestEventForm({ event }: TRequestEventForm) {
  const [, formAction] = useActionState(addEvent, null);
  console.log(event);
  return (
    <>
      <form action={formAction}>
        <input readOnly disabled value={event.name} placeholder={event.name} />
      </form>
    </>
  );
}
