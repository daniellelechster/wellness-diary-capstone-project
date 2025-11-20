// import React from 'react';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
// import './WellnessDiary.css';

// const WellnessDiary = () => {
//   const moodData = [
//     { date: 'Mon', mood: 7 },
//     { date: 'Tue', mood: 6 },
//     { date: 'Wed', mood: 8 },
//     { date: 'Thu', mood: 7 },
//     { date: 'Fri', mood: 9 },
//     { date: 'Sat', mood: 8 },
//     { date: 'Sun', mood: 7 }
//   ];

//   const activityData = [
//     { name: 'Exercise', value: 30 },
//     { name: 'Meditation', value: 15 },
//     { name: 'Social', value: 25 },
//     { name: 'Work', value: 20 },
//     { name: 'Hobbies', value: 10 }
//   ];

//   const COLORS = ['#8b5cf6', '#ec4899', '#3b82f6', '#10b981', '#f59e0b'];

//   return (
//     <div className="container">
//       <header className="header">
//         <h1 className="title">Wellness Diary</h1>
//         <p className="subtitle">Track your mood and activities</p>
//       </header>

//       <div className="charts-grid">
//         <div className="chart-card">
//           <h2 className="chart-title">Mood Over Time</h2>
//           <p className="chart-description">Track your mood throughout the week (1-10 scale)</p>

//           <ResponsiveContainer width="100%" height={300}>
//             <LineChart data={moodData}>
//               <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
//               <XAxis
//                 dataKey="date"
//                 stroke="#6b7280"
//                 style={{ fontSize: '14px' }}
//               />
//               <YAxis
//                 domain={[0, 10]}
//                 stroke="#6b7280"
//                 style={{ fontSize: '14px' }}
//               />
//               <Tooltip
//                 contentStyle={{
//                   backgroundColor: '#fff',
//                   border: '1px solid #e5e7eb',
//                   borderRadius: '8px'
//                 }}
//               />
//               <Legend />
//               <Line
//                 type="monotone"
//                 dataKey="mood"
//                 stroke="#8b5cf6"
//                 strokeWidth={3}
//                 dot={{ fill: '#8b5cf6', r: 5 }}
//                 activeDot={{ r: 7 }}
//               />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>

//         <div className="chart-card">
//           <h2 className="chart-title">Activity Breakdown</h2>
//           <p className="chart-description">How you spend your time this week</p>
//           <ResponsiveContainer width="100%" height={300}>
//             <PieChart>
//               <Pie
//                 data={activityData}
//                 cx="50%"
//                 cy="50%"
//                 innerRadius={60}
//                 outerRadius={100}
//                 fill="#8884d8"
//                 paddingAngle={5}
//                 dataKey="value"
//                 label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
//               >
//                 {activityData.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                 ))}
//               </Pie>
//               <Tooltip
//                 contentStyle={{
//                   backgroundColor: '#fff',
//                   border: '1px solid #e5e7eb',
//                   borderRadius: '8px'
//                 }}
//               />
//             </PieChart>
//           </ResponsiveContainer>
         
//           <div className="legend-grid">
//             {activityData.map((activity, index) => (
//               <div key={activity.name} className="legend-item">
//                 <div
//                   className="legend-color"
//                   style={{ backgroundColor: COLORS[index] }}
//                 ></div>
//                 <span className="legend-text">{activity.name}</span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       <div className="summary-card">
//         <h2 className="chart-title">Weekly Summary</h2>
//         <div className="stats-grid">
//           <div className="stat-box stat-purple">
//             <p className="stat-value">7.4</p>
//             <p className="stat-label">Avg Mood</p>
//           </div>
//           <div className="stat-box stat-pink">
//             <p className="stat-value">5</p>
//             <p className="stat-label">Activities</p>
//           </div>
//           <div className="stat-box stat-blue">
//             <p className="stat-value">9</p>
//             <p className="stat-label">Peak Mood</p>
//           </div>
//           <div className="stat-box stat-green">
//             <p className="stat-value">100%</p>
//             <p className="stat-label">Time Tracked</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WellnessDiary;