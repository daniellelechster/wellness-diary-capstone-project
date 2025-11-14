import React, { useState } from 'react';
import '../App.css';

function Calendar({ entries = {}, selectedDate, onDateSelect }) {
  const [currentMonth, setCurrentMonth] = useState(
    selectedDate ? new Date(selectedDate) : new Date(2025, 10, 1)
  );

  const changeMonth = (offset) => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(newDate.getMonth() + offset);
    setCurrentMonth(newDate);
  };

  const selectedEntry = entries[selectedDate];

  const monthEntries = Object.values(entries).filter(entry => {
    const entryDate = new Date(entry.date);
    return (
      entryDate.getMonth() === currentMonth.getMonth() &&
      entryDate.getFullYear() === currentMonth.getFullYear()
    );
  });

  const avgMoodThisMonth =
    monthEntries.length > 0
      ? monthEntries.reduce((sum, e) => sum + (e.mood || 0), 0) / monthEntries.length
      : 0;

  const daysLogged = monthEntries.filter(e => e.mood).length;

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startWeekday = month === 10 ? 6 : firstDay.getDay(); // November starts on Saturday

  const daysInMonth = lastDay.getDate();
  const calendarDays = [];

  for (let i = 0; i < startWeekday; i++) {
    calendarDays.push(null);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    const dateStr = `${year}-${month + 1}-${i}`;
    const entry = entries[dateStr];
    calendarDays.push({ day: i, entry });
  }

  return (
    <div className="calendar-page">
      <h2>Your Calendar</h2>
      <p>Track your emotional journey over time</p>

      <div className="calendar-stats">
        <div>
          <h4>Average Mood</h4>
          <p>{avgMoodThisMonth.toFixed(1)}/10</p>
        </div>
        <div>
          <h4>Days Logged</h4>
          <p>{daysLogged}</p>
        </div>
        <div>
          <h4>Current Month</h4>
          <p>{currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
        </div>
      </div>

      <div className="calendar-controls">
        <button onClick={() => changeMonth(-1)}>←</button>
        <button onClick={() => changeMonth(1)}>→</button>
      </div>

      <div className="calendar-grid">
        {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map((d, i) => (
          <div key={i} className="calendar-weekday">{d}</div>
        ))}

        {calendarDays.map((d, idx) =>
          d === null ? (
            <div key={idx} className="calendar-day empty" />
          ) : (
            <div
              key={idx}
              className={`calendar-day ${d.entry ? 'logged' : ''}`}
              onClick={() => onDateSelect && onDateSelect(`${year}-${month + 1}-${d.day}`)}
            >
              {d.day}
            </div>
          )
        )}
      </div>

      {selectedEntry && (
        <div className="calendar-entry-details">
          <h3>{selectedDate}</h3>
          <p>Mood: {selectedEntry.mood}/10</p>
          {selectedEntry.reflection && <p>Reflection: {selectedEntry.reflection}</p>}
          {selectedEntry.weather && <p>Weather: {selectedEntry.weather}</p>}
          {selectedEntry.waterIntake && <p>Water: {selectedEntry.waterIntake} glasses</p>}
          {selectedEntry.sleepHours && <p>Sleep: {selectedEntry.sleepHours} hours</p>}
        </div>
      )}
    </div>
  );
}

export default Calendar;
