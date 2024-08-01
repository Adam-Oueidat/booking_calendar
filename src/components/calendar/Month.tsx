import React, { createContext, useEffect, useState } from "react";
import Day from "@/src/components/calendar/Day";
import { getEventsForMonth } from "@/src/components/actions";

type MonthProps = {
  year: number;
  month: number;
};

type RefreshingContextValue = {
  refreshing: boolean;
  setRefreshing: React.Dispatch<React.SetStateAction<boolean>>;
};
export const EventContext = createContext<RefreshingContextValue>({
  refreshing: false,
  setRefreshing: () => undefined,
});
export default function Month({ month, year }: MonthProps) {
  const [refreshing, setRefreshing] = useState(false);
  const [events, setEvents] = useState<{
    current: Record<number, boolean>;
    nextMonth: Record<number, boolean>;
    prevMonth: Record<number, boolean>;
  }>({
    current: {},
    nextMonth: {},
    prevMonth: {},
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);

      const [current, next, prev] = await Promise.all([
        getEventsForMonth(year, month),
        getEventsForMonth(year, month + 1),
        getEventsForMonth(year, month - 1),
      ]);
      setEvents({ current: current, nextMonth: next, prevMonth: prev });
      setIsLoading(false);
      setRefreshing(false);
    };

    fetchEvents();
  }, [month, year, refreshing]);

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
  const MAX_TOTAL_DAYS = 42;
  const firstDayOfMonth = getFirstDayOfMonth(year, month);
  const daysInPreviousMonth = getDaysInMonth(year, month - 1);
  const startDayOfPreviousMonth = daysInPreviousMonth - firstDayOfMonth + 1;

  const totalDays = firstDayOfMonth + getDaysInMonth(year, month);
  const remainingDays = MAX_TOTAL_DAYS - totalDays;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  const monthName = new Date(year, month).toLocaleString("default", {
    month: "long",
  });

  return (
    <div>
      <div>
        <h2 className="text-2xl font-bold text-white">
          {monthName} {year}
        </h2>
      </div>
      <EventContext.Provider value={{ refreshing, setRefreshing }}>
        <div className="grid grid-cols-7 gap-1">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
            (day, index) => (
              <div
                key={index}
                className="text-center flex flex-end justify-end items-end font-bold text-white"
              >
                {day}
              </div>
            )
          )}
          {Array(firstDayOfMonth)
            .fill(null)
            .map((_, i) => (
              <div key={`prev-${i}`}>
                <Day
                  month={month === 0 ? 11 : month - 1} // if January, set month to December
                  year={month === 0 ? year - 1 : year} // if January, set year to previous year
                  date={startDayOfPreviousMonth + i}
                  prevMonth={true}
                  currentEvent={events.prevMonth[i]}
                />
              </div>
            ))}
          {Array.from({ length: getDaysInMonth(year, month) }, (_, i) => (
            <div key={i}>
              <Day
                month={month}
                year={year}
                date={i + 1}
                isToday={isToday(i + 1)}
                currentEvent={events.current[i + 1]}
              />
            </div>
          ))}
          {Array(remainingDays)
            .fill(null)
            .map((_, i) => (
              <div key={`next-${i}`}>
                <Day
                  month={month === 11 ? 0 : month + 1} // if December, set month to January
                  year={month === 11 ? year + 1 : year} // if December, set year to next year
                  date={i + 1}
                  nextMonth={true}
                  currentEvent={events.nextMonth[i + 1]}
                />
              </div>
            ))}
        </div>
      </EventContext.Provider>
    </div>
  );
}
