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

  return (
    <>
      <div>
        <h2 className="text-2xl font-bold">
          {monthNames[currentMonth]} {currentYear}
        </h2>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {[...Array(days)].map((_x, i) => (
          <div key={i}>
            <Day value={i + 1} />
          </div>
        ))}
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
