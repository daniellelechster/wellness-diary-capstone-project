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

export default function MoodHistoryChart({ entries = [] }) {
  const data = [...entries].sort((a, b) => a.date.localeCompare(b.date));

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
                <Tooltip />
                <Line 
                    type="monotone"
                    dataKey="mood"
                    stroke="#ff6b6b"
                    strokeWidth={4}
                    dot={{ r: 6 }}
                    // activeDot={{ r: 1}}
                />
            </LineChart>
            </ResponsiveContainer>
        </div>
    </div>
    );
}
