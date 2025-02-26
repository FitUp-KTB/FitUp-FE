"use client";
import {Radar} from "react-chartjs-2";
import {Chart, Filler, LineElement, PointElement, RadialLinearScale} from "chart.js";
import {COLORS} from "@/styles/colors";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import applyAlpha from "@/util/colorUtil";

Chart.register(RadialLinearScale, PointElement, LineElement, ChartDataLabels, Filler);

const data = {
  labels: ["Strength", "Endurance", "Speed", "Flexibility", "Stamina"],
  datasets: [{
    label: "유저 스탯",
    data: [40, 50, 80, 70, 50],
    fill: "start",
    backgroundColor: applyAlpha(COLORS.PURPLE, 0.4),
    borderColor: COLORS.PURPLE,
    pointBackgroundColor: COLORS.PURPLE,
  }]
}

const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    r: {
      angleLines: { display: true },
      suggestedMin: 0,
      suggestedMax: 100,
      ticks: {
        display: false,
      },
    },
  },
  plugins: {
    datalabels: {
      color: COLORS.BLACK,
      font: {
        size: 14,
        weight: "bold",
      },
      anchor: "end",
      align: "end",
      formatter: (value: number) => value,
    } as const,
  },
}

export default function StatRadarChart() {
  return (
    <div className="bg-WHITE w-72 h-72 rounded-3xl shadow p-4 flex flex-col">
      <h2 className="text-xl font-bold text-gray-800">스탯 차트</h2>

      <div className="flex-1 relative ">
        <Radar data={data} options={options} />
      </div>
    </div>
  );
}

