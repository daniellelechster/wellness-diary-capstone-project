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

// map mood number → color + emoji
const moodStyles = {
  1: { color: "#a80000", emoji: "😖" },
  2: { color: "#c70000", emoji: "😢" },
  3: { color: "#e04f4f", emoji: "😣" },
  4: { color: "#e88f3a", emoji: "😕" },
  5: { color: "#f0c040", emoji: "😐" },
  6: { color: "#c7d840", emoji: "🙂" },
  7: { color: "#8fd35d", emoji: "😊" },
  8: { color: "#59c87a", emoji: "😄" },
  9: { color: "#1bbf68", emoji: "😍" }
};

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
