"use client";
import NavigateMonthButton from "@/src/components/calendar/NavigateMonthButton";
import Month from "@/src/components/calendar/Month";
import { useState, useEffect, Suspense, useCallback } from "react";

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
    <div className="grid py-5 md:py-0">
      <div className="flex justify-end items-end">
        <NavigateMonthButton onClick={previousMonth}>{"<"}</NavigateMonthButton>
        <NavigateMonthButton
          onClick={() => {
            setMonth(date.getMonth());
            setYear(date.getFullYear());
          }}
        >
          Today
        </NavigateMonthButton>
        <NavigateMonthButton onClick={nextMonth}>{">"}</NavigateMonthButton>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <Month month={month} year={year} />
      </Suspense>
    </div>
  );
}
