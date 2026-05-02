import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  type ChartOptions,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { PERFORMANCE_12M } from "@/data/portfolio";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip);

export function PerformanceChart() {
  const data = {
    labels: PERFORMANCE_12M.map((m) => m.month),
    datasets: [
      {
        label: "Portfolio",
        data: PERFORMANCE_12M.map((m) => m.value),
        borderColor: "rgba(255,209,102,0.8)",
        backgroundColor: "rgba(255,209,102,0.06)",
        borderWidth: 1.5,
        fill: true,
        tension: 0.4,
        pointRadius: 0,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
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
        grid: { color: "rgba(255,255,255,0.04)", lineWidth: 1 },
        ticks: {
          color: "rgba(240,246,255,0.35)",
          font: { family: "DM Mono", size: 9 },
        },
      },
      y: {
        grid: { color: "rgba(255,255,255,0.04)", lineWidth: 1 },
        ticks: {
          color: "rgba(240,246,255,0.35)",
          font: { family: "DM Mono", size: 9 },
          callback: (v) => "$" + Number(v) / 1000 + "k",
        },
      },
    },
  };

  return (
    <div className="glass-card chart-wrap h-[240px] w-full p-4">
      <p className="label-caps mb-1">12-month performance</p>
      <p className="body-sub mb-2">Illustrative — not investment advice</p>
      <div className="h-[170px]">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}
