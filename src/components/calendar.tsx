"use client";

import NavigateMonthButton from "@/src/components/NavigateMonthButton";
import Month from "./Month";
import { useState, useEffect } from "react";

export default function Calendar() {
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
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowLeft") {
        previousMonth();
      }
      if (event.key === "ArrowRight") {
        nextMonth();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [month, year]);

  return (
    <div className="grid">
      <Month month={month} year={year} />
      <div className=" flex justify-end items-end">
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
    </div>
  );
}
