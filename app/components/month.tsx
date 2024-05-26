import React from 'react';
import Day from './day';

interface MonthProps {
    currentYear: number;
    currentMonth: number;
    calendarEvents: { [key: number]: any };
}



const Month: React.FC<MonthProps> = ({currentMonth, currentYear, calendarEvents}) => {
    function getWeekday(year: number, month: number, day: number) {
            return new Date(year, month, day).getDay();
        }
    
        function getFirstDayOfMonth(year: number, month: number) {
            return new Date(year, month, 0).getDay();
        }
        let firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth);
    return (
        <>
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
      </>
    );
};

export default Month;