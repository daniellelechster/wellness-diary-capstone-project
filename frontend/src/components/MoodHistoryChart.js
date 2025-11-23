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
  .map((entry) => ({
    ...entry,
    color: moodMap[entry.mood]?.color,
    emoji: moodMap[entry.mood]?.emoji,
    label: moodMap[entry.mood]?.label,
  }));

    return (
        
        <div className="moodHistoryBox">
        <h3 className="moodHeader">Mood History</h3>

        <div style={{ 
            width: "98%",
            height: "18rem",
            backgroundColor: "white",
            padding: ".5rem",
            borderRadius: "12px",
            boxShadow: "0 2px 6px rgba(0,1,1,1)"
            }}
        >
            <ResponsiveContainer>
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="2 2" />
                <XAxis 
                    dataKey="date"
                    style={{ fontWeight: "bold" }}
                />
                <YAxis
                    domain={[1, 9]}                
                    style={{ fontWeight: "bold" }}
                />
                <Tooltip
                    formatter={(value) => {
                        const mood = moodMap[value];
                        return `${mood.label}`;
                    }}
                    contentStyle={{ backgroundColor: "{mood.color}", borderRadius: "8px" }}
                    itemStyle={(value) => {
                        const mood = moodMap[value];
                        return { color: mood.color };
                    }}

                />
                <Line 
                    type="monotone"
                    dataKey="mood"
                    stroke="#ff6b6b"
                    strokeWidth={4}
                    dot={({ cx, cy, value }) => {
                        const mood = moodMap[value];
                        return (
                        <circle
                            cx={cx}
                            cy={cy}
                            r={6}                 // radius of the dot
                            fill='white'     // use the mapped color
                            stroke={mood.color}        // optional outline
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
