import React from "react";
import ModalForm from "./ModalForm";

interface EventModalProps {
  closeModal: () => void;
  removeEvent: () => void;
  date: number;
  dateString: string;
}

export default function EventModal({
  closeModal,
  dateString,
}: EventModalProps) {
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
        <div className="bg-blue-300 lg:w-1/3 p-5 rounded-lg">
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
