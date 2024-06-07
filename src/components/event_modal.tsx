import React from "react";
import ModalForm from "./modal_form";

interface EventModalProps {
  closeModal: () => void;
  removeEvent: () => void;
  date: number;
  dateString: string;
}

export default function EventModal({
  closeModal,
  date,
  dateString,
}: EventModalProps) {
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
        <div className="bg-blue-300 sm:w-1/4 p-10 rounded-lg">
          <button
            className="bg-red-500 hover:bg-red-700 text-white float-end font-bold py-2 px-4 rounded"
            onClick={closeModal}
          >
            X
          </button>
          <h1 className="text-2xl font-bold">Add event</h1>
          <ModalForm date={dateString} closeModal={closeModal} />
        </div>
      </div>
    </>
  );
}
