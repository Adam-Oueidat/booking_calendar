"use client";
import Month from "@/src/components/calendar/Month";
import { useState, useEffect, Suspense, useCallback } from "react";
import { Button } from "@repo/ui";

export default function Calendar() {
  const date = new Date();
  const [month, setMonth] = useState(date.getMonth());
  const [year, setYear] = useState(date.getFullYear());

  const nextMonth = useCallback(() => {
    setMonth((prevMonth) => (prevMonth === 11 ? 0 : prevMonth + 1));
    setYear((prevYear) => (month === 11 ? prevYear + 1 : prevYear));
  }, [month]);

  const previousMonth = useCallback(() => {
    setMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1));
    setYear((prevYear) => (month === 0 ? prevYear - 1 : prevYear));
  }, [month]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        previousMonth();
      }
      if (event.key === "ArrowRight") {
        nextMonth();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [previousMonth, nextMonth]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={previousMonth}
            aria-label="Previous month"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-cph-paper"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setMonth(date.getMonth());
              setYear(date.getFullYear());
            }}
          >
            Today
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={nextMonth}
            aria-label="Next month"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-cph-paper"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Button>
        </div>
      </div>

      <Suspense
        fallback={
          <div className="flex items-center justify-center h-[50vh]">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-cph-ochre"></div>
          </div>
        }
      >
        <Month month={month} year={year} />
      </Suspense>
    </div>
  );
}
