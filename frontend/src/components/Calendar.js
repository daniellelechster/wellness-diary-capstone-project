import React from "react";

export function Calendar({ showWeekView }) {
  return (
    <div className="calendarView">
      {showWeekView ? (
        <p>📅 Weekly View (Mood by color)</p>
      ) : (
        <p>📆 Full Calendar Page</p>
      )}
    </div>
  );
}

export default Calendar;