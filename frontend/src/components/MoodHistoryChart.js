import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";
import { moodMap } from "./MoodUtils";

export default function MoodHistoryChart({ entries = [] }) {
  const data = [...entries]
    .sort((a, b) => a.date.localeCompare(b.date))
    .filter(entry => entry.mood) // ✅ only keep valid moods
    .map(entry => ({
      ...entry,
      color: moodMap[entry.mood]?.color,
      emoji: moodMap[entry.mood]?.emoji,
      label: moodMap[entry.mood]?.label,
    }));

  return (
    <div className="moodHistoryBox">
      <h3 className="moodHeader">Mood History</h3>

      <div
  style={{
    width: "98%",
    backgroundColor: "white",
    padding: ".5rem",
    borderRadius: "12px",
    boxShadow: "0 2px 6px rgba(0,1,1,1)"
  }}
>
  <ResponsiveContainer width="100%" height={250}>
    <LineChart data={data}>
      <CartesianGrid strokeDasharray="2 2" />
      <XAxis dataKey="date" style={{ fontWeight: "bold" }} />
      <YAxis domain={[1, 9]} style={{ fontWeight: "bold" }} />
      <Tooltip
        formatter={(value) => {
          const mood = moodMap[value];
          return mood ? mood.label : "Unknown";
        }}
        itemStyle={{ fontWeight: "bold" }}
      />
      <Line
        type="monotone"
        dataKey="mood"
        stroke="#ff6b6b"
        strokeWidth={4}
        dot={({ cx, cy, value }) => {
          const mood = moodMap[value];
          if (!mood) return null;
          return (
            <circle
              cx={cx}
              cy={cy}
              r={6}
              fill="white"
              stroke={mood.color}
              strokeWidth={6}
            />
          );
        }}
      />
    </LineChart>
  </ResponsiveContainer>
</div>

    </div>
  );
}
