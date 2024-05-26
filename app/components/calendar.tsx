"use client";
import { get } from "http";
import Day from "./day";
import Month from "./month";
import { useState } from "react";

function Calendar() {
  const date = new Date();
  const daysInMonth = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let calendarEvents: { [key: number]: any } = {};
  for (let i = 1; i <= 12; i++) {
    calendarEvents[i] = {};
    for (let j = 1; j <= daysInMonth[i - 1]; j++) {
      calendarEvents[i][j] = false;
    }
  }

  const currentMonth = date.getMonth();
  const currentYear = date.getFullYear();
  let days = daysInMonth[currentMonth];
  // Check for leap year
  if (currentMonth === 1) {
    // February only!
    if (
      (currentYear % 4 === 0 && currentYear % 100 !== 0) ||
      currentYear % 400 === 0
    ) {
      days = 29;
    }
  }

  const [month, setMonth] = useState(currentMonth);
  function nextMonth() {
    setMonth((month + 1) % 12);
  }
  function previousMonth() {
    if (month === 0) {
      setMonth(11);
    } else {
      setMonth((month - 1) % 12);
    }
  }

  return (
    <>
      <div>
        <h2 className="text-2xl font-bold">
          {monthNames[month]} {currentYear}
        </h2>
      </div>
      <Month
        currentMonth={month}
        currentYear={currentYear}
        calendarEvents={calendarEvents}
      />
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
