import React from "react";
import Day from "@/src/components/calendar/Day";
import { getEventsForMonth } from "@/src/components/actions";
import { useEffect, useState } from "react";

type MonthProps = {
  year: number;
  month: number;
};

export default function Month({ month, year }: MonthProps) {
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
  const [currentEvents, setCurrentEvents] = useState<Record<number, boolean>>(
    {}
  );
  const [nextMonthEvents, setNextMonthEvents] = useState<
    Record<number, boolean>
  >({});
  const [prevMonthEvents, setPrevMonthEvents] = useState<
    Record<number, boolean>
  >({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const fetchCurrentEvents = async () => {
      const events = await getEventsForMonth(year, month);
      const nextEvents = await getEventsForMonth(year, month + 1);
      const prevEvents = await getEventsForMonth(year, month - 1);
      setPrevMonthEvents(prevEvents);
      setNextMonthEvents(nextEvents);
      setCurrentEvents(events);
      setIsLoading(false);
    };

    fetchCurrentEvents();
    return () => {
      setIsLoading(true);
    };
  }, [month, year]);

  function getDaysInMonth(year: number, month: number) {
    month = month + 1;
    if (month === 0) {
      // if January
      return new Date(year - 1, 12, 0).getDate(); // get days of December of previous year
    } else {
      return new Date(year, month, 0).getDate(); // get days of previous month
    }
  }

  function isToday(date: number) {
    const today = new Date();
    return (
      today.getFullYear() === year &&
      today.getMonth() === month &&
      today.getDate() === date
    );
  }
  function getFirstDayOfMonth(year: number, month: number) {
    return new Date(year, month, 0).getDay();
  }

  const firstDayOfMonth = getFirstDayOfMonth(year, month);
  const daysInPreviousMonth = getDaysInMonth(year, month - 1);
  const startDayOfPreviousMonth = daysInPreviousMonth - firstDayOfMonth + 1;

  const totalDays = firstDayOfMonth + getDaysInMonth(year, month);
  const remainingDays = 42 - totalDays;

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex justify-center items-center font-bold text-center">
        Loading...
      </div>
    );
  }
  return (
    <>
      <div>
        <h2 className="text-2xl font-bold text-white">
          {getMonthName(month)} {year}
        </h2>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => (
          <div
            key={index}
            className="text-center flex flex-end justify-end items-end font-bold text-white"
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
                prevMonth={true}
                currentEvent={prevMonthEvents[i]}
              />
            </div>
          ))}
        {(() => {
          const daysInMonth = getDaysInMonth(year, month);
          const days = [];
          for (let i = 1; i <= daysInMonth; i++) {
            days.push(
              <div key={i}>
                <Day
                  month={month}
                  year={year}
                  date={i}
                  isToday={isToday(i)}
                  currentEvent={currentEvents[i]}
                />
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
                nextMonth={true}
                currentEvent={nextMonthEvents[i + 1]}
              />
            </div>
          ))}
      </div>
    </>
  );
}
