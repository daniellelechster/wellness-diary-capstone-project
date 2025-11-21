import React from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip
} from "recharts";

export default function MoodHistoryChart({ entries }) {
    const data = Object.values(entries).sort((a,b) =>
    a.date.localeCompare(b.date)
);

return (
    <div className="moodHistoryBox">
        <h3 className="moodHeader">Mood History</h3>
        
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data} margin={{ top: 20, right: 20, bottom: 10, left: 0}}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="date" />
                <YAxis domain={[1, 9]} tickCount={9} />
                <Tooltip />
                <Line type="monotone" dataKey="mood" stroke="#ff6b6b" strokeWidth={3} />
            </LineChart>
        </ResponsiveContainer>
    </div>
);
}