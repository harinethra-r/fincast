import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip,
  type ChartOptions,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { ALLOCATION } from "@/data/portfolio";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const current = ALLOCATION.map((a) => a.pct);
const target = [28, 28, 22, 12, 10];

export function RebalanceChart() {
  const data = {
    labels: ALLOCATION.map((a) => a.name),
    datasets: [
      {
        label: "Current",
        data: current,
        backgroundColor: "rgba(255,255,255,0.12)",
        borderRadius: 5,
      },
      {
        label: "Target",
        data: target,
        backgroundColor: "rgba(255,209,102,0.55)",
        borderRadius: 5,
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: "rgba(240,246,255,0.4)",
          font: { family: "DM Sans", size: 9 },
        },
      },
      tooltip: {
        backgroundColor: "var(--sky-raised)",
        titleColor: "var(--text)",
        bodyColor: "var(--sub)",
        borderColor: "var(--glass-border)",
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "var(--dim)", font: { size: 9 } },
      },
      y: {
        max: 50,
        grid: { color: "rgba(255,255,255,0.04)" },
        ticks: {
          color: "var(--dim)",
          font: { family: "DM Mono", size: 9 },
        },
      },
    },
  };

  return (
    <div className="glass-card chart-wrap h-[280px] w-full p-4">
      <p className="label-caps mb-1">Current vs target allocation</p>
      <p className="body-sub mb-2">After the pressure front clears</p>
      <div className="h-[220px]">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}
