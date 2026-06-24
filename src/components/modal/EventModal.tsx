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
      <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-xs z-10 animate-fadeIn">
        <div className="bg-cph-navy2 border border-cph-sky/15 w-[90%] max-w-2xl rounded-xl shadow-xl transform transition-all duration-300 ease-out animate-slideUp">
          <div className="p-8">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h1 className="font-display text-3xl font-bold mb-2 text-cph-ochre">
                  Add event
                </h1>
                <p className="text-lg text-cph-sky">{dateString}</p>
              </div>
              <button
                className="text-cph-sky/70 hover:text-cph-paper transition-colors duration-200 p-2 rounded-full hover:bg-white/5"
                onClick={closeModal}
                aria-label="Close modal"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <ModalForm date={dateString} closeModal={closeModal} />
          </div>
        </div>
      </div>
    </>
  );
}
