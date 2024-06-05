import { revalidatePath } from "next/cache";
import React from "react";
import ModalForm from "./modal_form";

interface EventModalProps {
  closeModal: () => void;
  removeEvent: () => void;
  date: number;
  children: React.ReactNode;
}

export default function EventModal({
  closeModal,
  date,
  children,
}: EventModalProps) {
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-blue-300 w-1/2 h-1/2 p-8 rounded-lg">
          <h1 className="text-2xl font-bold">Event</h1>
          <p>Event for {date}</p>
          {children}
          <div>
            <button
              className="bg-red-500 hover:bg-red-700 text-white float-end font-bold py-2 px-4 rounded"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
