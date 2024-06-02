"use client";
import { get } from "http";
import Day from "./day";
import Month from "./month";
import { useState } from "react";

function Calendar({ events }: any) {
  const date = new Date();

  const [month, setMonth] = useState(date.getMonth());
  const [year, setYear] = useState(date.getFullYear());

  function nextMonth() {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth((month + 1) % 12);
    }
  }

  function previousMonth() {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth((month - 1) % 12);
    }
  }

  return (
    <>
      <Month month={month} year={year} events={events} />
      <div>
        <div className="flex justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={previousMonth}
          >
            Previous
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={nextMonth}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default Calendar;
