import React, { createContext, useEffect, useState } from "react";
import Day from "@/src/components/calendar/Day";
import {
  getEventsForMonth,
  getRequestedEventsForMonth,
} from "@/src/app/api/server_actions/actions";

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
  const [requestedEvents, setRequestedEvents] = useState<{
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
      const [currentRequested, nextRequested, prevRequested] =
        await Promise.all([
          getRequestedEventsForMonth(year, month),
          getRequestedEventsForMonth(year, month + 1),
          getRequestedEventsForMonth(year, month - 1),
        ]);
      setEvents({ current: current, nextMonth: next, prevMonth: prev });
      setRequestedEvents({
        current: currentRequested,
        nextMonth: nextRequested,
        prevMonth: prevRequested,
      });
      setIsLoading(false);
      setRefreshing(false);
    };

    fetchEvents();
  }, [month, year, refreshing]);

  function getDaysInMonth(year: number, month: number) {
    month = month + 1;
    if (month === 0) {
      return new Date(year - 1, 12, 0).getDate();
    } else {
      return new Date(year, month, 0).getDate();
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
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">
          {monthName} {year}
        </h2>
      </div>

      <EventContext.Provider value={{ refreshing, setRefreshing }}>
        <div className="grid grid-cols-7 gap-1">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
            (day, index) => (
              <div
                key={index}
                className="text-center py-1 text-xs font-medium text-white/60"
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
                  month={month === 0 ? 11 : month - 1}
                  year={month === 0 ? year - 1 : year}
                  date={startDayOfPreviousMonth + i}
                  prevMonth={true}
                  currentEvent={events.prevMonth[startDayOfPreviousMonth + i]}
                  requestedEvent={
                    requestedEvents.prevMonth[startDayOfPreviousMonth + i]
                  }
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
                requestedEvent={requestedEvents.current[i + 1]}
              />
            </div>
          ))}

          {Array(remainingDays)
            .fill(null)
            .map((_, i) => (
              <div key={`next-${i}`}>
                <Day
                  month={month === 11 ? 0 : month + 1}
                  year={month === 11 ? year + 1 : year}
                  date={i + 1}
                  nextMonth={true}
                  currentEvent={events.nextMonth[i + 1]}
                  requestedEvent={requestedEvents.nextMonth[i + 1]}
                />
              </div>
            ))}
        </div>
      </EventContext.Provider>
    </div>
  );
}
