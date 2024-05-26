import { get } from "http";
import Day from "./day";

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
  function getWeekday(year: number, month: number, day: number) {
    return new Date(year, month, day).getDay();
  }

  function getFirstDayOfMonth(year: number, month: number) {
    return new Date(year, month, 0).getDay();
  }
  let firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth);

  return (
    <>
      <div>
        <h2 className="text-2xl font-bold">
          {monthNames[currentMonth]} {currentYear}
        </h2>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {Array(firstDayOfMonth)
          .fill(null)
          .map((_, i) => (
            <div key={`empty-${i}`} />
          ))}
        {Object.entries(calendarEvents[currentMonth + 1]).map(
          ([date, event], i) => {
            let weekday = getWeekday(currentYear, currentMonth, parseInt(date));
            return (
              <div key={i}>
                <Day
                  date={parseInt(date)}
                  event={event as boolean}
                  currentWeekday={weekday}
                />
              </div>
            );
          }
        )}
      </div>
      <div>
        <div className="flex justify-between">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Previous
          </button>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default Calendar;
