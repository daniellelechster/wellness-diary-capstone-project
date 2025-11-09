import React from 'react';
import Chart from 'react-apexcharts';

function WellnessChart() {
  const series = [
    {
      name: "Mood (1-10)",
      data: [5, 7, 8, 6, 7, 9, 8.5]
    },
    {
      name: "Hours Slept",
      data: [6, 7.5, 8, 6, 7, 9, 8]
    }
  ];

  const options = {
    chart: {
      id: 'mood-vs-sleep'
    },
    xaxis: {
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    stroke: {
      curve: 'smooth'
    }
  };

  return (
    <div className="chart-container">
      <Chart
        options={options}
        series={series}
        type="line"
        width="500"
      />
    </div>
  );
}

export default WellnessChart;