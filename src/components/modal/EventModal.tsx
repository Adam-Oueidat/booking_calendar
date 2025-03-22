import React from "react";
import ModalForm from "./ModalForm";
import { useEffect } from "react";

type EventModalProps = {
  closeModal: () => void;
  removeEvent: () => void;
  date: number;
  dateString: string;
};

export default function EventModal({
  closeModal,
  dateString,
}: EventModalProps) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeModal();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeModal]);

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
        <div className="bg-slate-400 w-[90%] max-w-2xl p-8 rounded-lg shadow-xl">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Add event</h1>
              <p className="text-lg text-gray-700">{dateString}</p>
            </div>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
              onClick={closeModal}
              aria-label="Close modal"
            >
              X
            </button>
          </div>
          <ModalForm date={dateString} closeModal={closeModal} />
        </div>
      </div>
    </>
  );
}
