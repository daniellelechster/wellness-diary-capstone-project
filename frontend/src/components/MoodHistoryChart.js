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

export default function MoodHistoryChart({ entries = {} }) {
    const data = Object.values(entries)
    .sort((a, b) => a.date.localeCompare(b.date))
    .map(entry => ({
        ...entry,
        // Convert "YYYY-MM-DD" → "MM/DD"
        date: new Date(entry.date).toLocaleDateString("en-US", {
        month: "numeric",
        day: "numeric"
        })
    }));

    return (
        
        <div className="moodHistoryBox">
        <h3 className="moodHeader">Mood History</h3>

        <div style={{ 
            width: "100%",
            height: "300px",
            backgroundColor: "white",
            padding: ".5rem",
            borderRadius: "12px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
            }}
        >
        <div className="moodHistoryWrapper">
            <div className="chartInnerContainer">
            <ResponsiveContainer>
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                    dataKey="date"
                    style={{ fontWeight: "bold" }}
                />
                <YAxis
                    domain={[1, 9]}                
                    style={{ fontWeight: "bold" }}
                />
                <Tooltip />
                <Line 
                    type="monotone"
                    dataKey="mood"
                    stroke="#ff6b6b"
                    strokeWidth={4}
                    dot={{ r: 6 }}
                    activeDot={{ r: 8}}
                />
            </LineChart>
            </ResponsiveContainer>
        </div>
    </div>
    </div>
    </div>
    );
}
