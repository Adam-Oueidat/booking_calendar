"use client";
import { useState } from "react";
interface DayProps {
  date: number;
  event: boolean;
  currentWeekday: number;
}

function Day({ date, event: initialEvent, currentWeekday }: DayProps) {
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const [currentEvent, setEvent] = useState(initialEvent);
  function clickHandler() {
    setEvent(!currentEvent);
  }
  const divClass = currentEvent
    ? "w-24 h-24 hover:bg-gray-700 bg-gray-500 p-2 rounded"
    : "w-24 h-24 hover:bg-blue-700 bg-blue-500 p-2 rounded";

  return (
    <>
      <div className={divClass} onClick={clickHandler}>
        <p>{date}</p>
        <p>{weekdays[currentWeekday]}</p>
        <p>{currentEvent ? "Event" : "No Event"}</p>
      </div>
    </>
  );
}
export default Day;
