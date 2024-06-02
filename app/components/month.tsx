import React from "react";
import Day from "./day";
import Link from "next/link";

interface MonthProps {
  year: number;
  month: number;
  events: any;
}

const Month: React.FC<MonthProps> = ({ month, year, events }) => {
  function getMonthName(month: number) {
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
    return monthNames[month];
  }
  function getDaysInMonth(year: number, month: number) {
    month = month + 1;
    if (month === 0) {
      // if January
      return new Date(year - 1, 12, 0).getDate(); // get days of December of previous year
    } else {
      return new Date(year, month, 0).getDate(); // get days of previous month
    }
  }

  function getWeekday(year: number, month: number, day: number) {
    return new Date(year, month, day).getDay();
  }

  function getFirstDayOfMonth(year: number, month: number) {
    return new Date(year, month, 0).getDay();
  }

  let firstDayOfMonth = getFirstDayOfMonth(year, month);
  let daysInPreviousMonth = getDaysInMonth(year, month - 1);
  let startDayOfPreviousMonth = daysInPreviousMonth - firstDayOfMonth + 1;

  let totalDays = firstDayOfMonth + getDaysInMonth(year, month);
  let remainingDays = 42 - totalDays;

  return (
    <>
      <div>
        <h1 className="text-4xl text-wrap  font-extrabold">Kom bo hos oss</h1>
        <h2 className="text-2xl font-bold">
          {getMonthName(month)} {year}
        </h2>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => (
          <div
            key={index}
            className="text-center flex flex-end justify-end items-end font-bold"
          >
            {day}
          </div>
        ))}
        {Array(firstDayOfMonth)
          .fill(null)
          .map((_, i) => (
            <div key={`prev-${i}`}>
              <Day
                month={month === 0 ? 11 : month - 1} // if January, set month to December
                year={month === 0 ? year - 1 : year} // if January, set year to previous year
                date={startDayOfPreviousMonth + i}
                events={events}
                prevMonth={true}
              />
            </div>
          ))}
        {(() => {
          let daysInMonth = getDaysInMonth(year, month);
          let days = [];
          for (let i = 1; i <= daysInMonth; i++) {
            days.push(
              <div key={i}>
                <Day month={month} year={year} date={i} events={events} />
              </div>
            );
          }
          return days;
        })()}
        {Array(remainingDays)
          .fill(null)
          .map((_, i) => (
            <div key={`next-${i}`}>
              <Day
                month={month === 11 ? 0 : month + 1} // if December, set month to January
                year={month === 11 ? year + 1 : year} // if December, set year to next year
                date={i + 1}
                events={events}
                nextMonth={true}
              />
            </div>
          ))}
      </div>
    </>
  );
};

export default Month;
