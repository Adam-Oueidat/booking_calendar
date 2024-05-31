import ModalForm from "@/app/components/modal_form";
import EventModal from "@/app/components/event_modal";
import Link from "next/link";

export default async function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <EventModal>
        <ModalForm />
      </EventModal>
    </div>
  );
}