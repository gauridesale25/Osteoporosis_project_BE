import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, CategoryScale, LinearScale);

export default function ChartComponent({ data }) {
  return (
    <Bar
      data={{
        labels: Object.keys(data),
        datasets: [
          {
            label: "Probability",
            data: Object.values(data)
          }
        ]
      }}
    />
  );
}