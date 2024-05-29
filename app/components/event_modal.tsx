import { revalidatePath } from "next/cache";
import React from "react";
import ModalForm from "./modal_form";

interface EventModalProps {
  closeModal: () => void;
  removeEvent: () => void;
  currentEvent: boolean;
  date: number;
  calendarEvents: { [key: number]: any };
}

const EventModal: React.FC<EventModalProps> = ({
  currentEvent,
  closeModal,
  date,
}) => {

  return (
    <>
      <div className="fixed bg-center top-0 left-0 w-full h-full bg-black bg-opacity-50">
        <div className="content-center bg-blue-300 w-1/2 h-1/2 p-8 rounded-lg">
          <h1 className="text-2xl font-bold">Event</h1>

          <p>Event for {date}</p>
            <ModalForm />
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={closeModal}
            >
              Close
            </button>
          
        </div>
      </div>
    </>
  );
};

export default EventModal;
