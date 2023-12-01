import React from 'react'
import Chart from "chart.js/auto"
import { Bar } from 'react-chartjs-2';

export default function WeekChart ({ data }) {
  const labels = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const counts = labels.map(day => {
    const matchingData = data.find(item => item._id === day);
    return matchingData ? matchingData.count : 0;
  });

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'No of Students',
        data: counts,
        backgroundColor: [
          "rgba(54, 162, 235, 0.4)",
          "rgba(255, 99, 132, 0.4)",
          "rgba(75, 192, 192, 0.4)",
          "rgba(255, 159, 64, 0.4)",
          "rgba(153, 102, 255, 0.4)",
          "rgba(255, 205, 86, 0.4)",
          "rgba(201, 203, 207, 0.4)",

        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 205, 86, 1)",
          "rgba(201, 203, 207, 1)",
        ],
        borderWidth: 2
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true
      }
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: context => `Count: ${context.formattedValue}`
        }
      }
    }
  };

  return (
      <Bar data={chartData} options={options} />
  );
};