import React from "react";

export function MoodCalendar({ showWeekView }) {
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