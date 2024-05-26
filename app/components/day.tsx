"use client";

interface DayProps {
  value: number;
}

function clickHandler() {
  console.log("Day clicked");
}

function Day({ value }: DayProps) {
  return (
    <>
      <div
        key={value}
        className="w-24 h-48 hover:bg-blue-700 bg-blue-500 p-2 rounded"
        onClick={clickHandler}
      >
        {value}
      </div>
    </>
  );
}
export default Day;
