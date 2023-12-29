// Import necessary dependencies
import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { FastField } from "formik";

ChartJS.register(...registerables);
Chart.register(ChartDataLabels);

// Define the LineChart component
const LineChart = (props) => {
  // Provided MIDI data
//   const midiData1 =
//   [
//     { channel: 0, note: 67, velocity: 100, time: 0 },
//     { channel: 0, note: 70, velocity: 100, time: 0 },
//     { channel: 3, note: 51, velocity: 100, time: 0 },
//     { channel: 0, note: 65, velocity: 100, time: 0 },
//     { channel: 0, note: 67, velocity: 100, time: 0 },
//     { channel: 3, note: 51, velocity: 100, time: 0 },
//     { channel: 0, note: 65, velocity: 100, time: 0 },
//     { channel: 0, note: 69, velocity: 100, time: 0 },
//     { channel: 3, note: 53, velocity: 100, time: 0 },
//     { channel: 0, note: 70, velocity: 100, time: 0 },
//     { channel: 0, note: 65, velocity: 100, time: 0 },
//     { channel: 0, note: 70, velocity: 100, time: 0 },
//     { channel: 3, note: 55, velocity: 100, time: 0 },
//     { channel: 0, note: 65, velocity: 100, time: 0 },
//     { channel: 0, note: 70, velocity: 100, time: 0 },
//     { channel: 3, note: 55, velocity: 100, time: 0 },
//   ];
  
//   const midiData2 =
//   [
//     { channel: 0, note: 67, velocity: 100, time: 0 },
//     { channel: 0, note: 71, velocity: 100, time: 0 },
//     { channel: 3, note: 53, velocity: 100, time: 0 },
//     { channel: 0, note: 63, velocity: 100, time: 0 },
//     { channel: 0, note: 66, velocity: 100, time: 0 },
//     { channel: 3, note: 50, velocity: 100, time: 0 },
//     { channel: 0, note: 64, velocity: 100, time: 0 },
//     { channel: 0, note: 68, velocity: 100, time: 0 },
//     { channel: 3, note: 54, velocity: 100, time: 0 },
//     { channel: 0, note: 70, velocity: 100, time: 0 },
//     { channel: 0, note: 66, velocity: 100, time: 0 },
//     { channel: 0, note: 69, velocity: 100, time: 0 },
//     { channel: 3, note: 52, velocity: 100, time: 0 },
//   ]
  const midiData1 = props.data1;
  const midiData2 = props.data2;


  console.log("length 1",midiData1?.length);
  console.log("length 2",midiData2?.length)

  // Extract relevant data for the chart
  const chartData = {
    labels: midiData1?.map((event) => event.channel), // Use an index-based label for simplicity
    datasets: [
      {
        label: "Note Velocity",
        data: midiData1?.map((event) => event.note),
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
        fill: false,
      },
      {
        label: 'Chart 2 - Note Velocity',
        data: midiData2?.map((event) => event.note),
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 2,
        fill: false,
      },
    ],
    
  };

  // Options for the chart
  // Options for the chart
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: "linear", // Use 'linear' for numeric data
        position: "bottom",
        title: {
          display: true,
          text: "Event Index",
        },
      },
      y: {
        type: "linear", // Use 'linear' for numeric data
        position: "left",
        title: {
          display: true,
          text: "Velocity",
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <Line data={chartData}  />
    </div>
  );
};

export default LineChart;