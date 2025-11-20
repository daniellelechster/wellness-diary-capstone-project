import React, { useState } from 'react';
import '../App.css';

function Calendar({ entries = {}, selectedDate, onDateSelect }) {
  const [currentMonth, setCurrentMonth] = useState(
    selectedDate ? new Date(selectedDate) : new Date(2025, 10, 1)
  );

const getMoodColor = (mood) => {
  switch(mood) {
    case 1: return '#A9A9A9'; // Very Low - gray
    case 2: return '#800080'; // Down - purple
    case 3: return '#8B0000'; // Frustrated - dark red
    case 4: return '#DC143C'; // Meh - crimson
    case 5: return '#FF4500'; // In the Middle - red-orange
    case 6: return '#FFA500'; // Okay - orange
    case 7: return '#FFFF00'; // Content - yellow
    case 8: return '#ADFF2F'; // Very Good - light green
    case 9: return '#228B22'; // Amazing - green
    default: return '#fff';    // Undefined
  }
};
  
  const pad = (n) => n.toString().padStart(2,'0');

  const changeMonth = (offset) => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(newDate.getMonth() + offset);
    setCurrentMonth(newDate);
  };

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startWeekday = month === 10 ? 6 : firstDay.getDay(); 
  const daysInMonth = lastDay.getDate();

  const calendarDays = Array.from({ length: startWeekday + daysInMonth }, (_, i) => {
    if (i < startWeekday) return null; 
    const day = i - startWeekday + 1;
    const dateStr = `${year}-${month + 1}-${pad(day)}`;
    const entry = entries[dateStr];
    return { day, entry, moodColor: entry?.mood ? getMoodColor(entry.mood) : '#fff' };
  });

  const monthEntries = Object.values(entries).filter(entry => {
    const entryDate = new Date(entry.date);
    return entryDate.getMonth() === month && entryDate.getFullYear() === year;
  });

  const avgMoodThisMonth =
    monthEntries.length > 0
      ? monthEntries.reduce((sum, e) => sum + (e.mood || 0), 0) / monthEntries.length
      : 0;
  const daysLogged = monthEntries.filter(e => e.mood).length;

  
  const moodLevels = [
  { level: 1, label: "Very Low", emoji: "😠" },
  { level: 2, label: "Down", emoji: "😢" },
  { level: 3, label: "Frustrated", emoji: "😣" },
  { level: 4, label: "Meh", emoji: "😕" },
  { level: 5, label: "In the Middle", emoji: "😐" },
  { level: 6, label: "Okay", emoji: "😏" },
  { level: 7, label: "Content", emoji: "😊" },
  { level: 8, label: "Very Good", emoji: "😄" },
  { level: 9, label: "Amazing", emoji: "😍" },
  ];

  const selectedEntry = entries[selectedDate];

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
              style={{ backgroundColor: d.moodColor }}
              onClick={() => onDateSelect && onDateSelect(`${year}-${pad(month + 1)}-${pad(d.day)}`)}
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

    <div className="calendar-mood-legend">
  <h4>Mood Legend</h4>
  <div className="calendar-legend-grid">
    {moodLevels.map(({ level, label, emoji }) => (
      <div key={level} className="calendar-legend-item">
        <div
          className="calendar-legend-color"
          style={{ backgroundColor: getMoodColor(level) }}
        />
        <span>{emoji} {label}</span>
      </div>
    ))}
  </div>
</div>
</div>
  );
}

export default Calendar;
