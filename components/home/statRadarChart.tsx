"use client";
import {Radar} from "react-chartjs-2";
import {Chart, ChartData, Filler, LineElement, PointElement, RadialLinearScale} from "chart.js";
import {COLORS} from "@/styles/colors";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import applyAlpha from "@/util/colorUtil";
import {statAtom} from "@/store/statAtom";
import {useAtomValue} from "jotai";
import {useEffect, useState} from "react";

Chart.register(RadialLinearScale, PointElement, LineElement, ChartDataLabels, Filler);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    r: {
      angleLines: {display: true},
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
  const stat = useAtomValue(statAtom);
  const [chartData, setChartData] = useState<ChartData<'radar'>>({datasets: []})

  useEffect(() => {
    setChartData({
      labels: ["Strength", "Endurance", "Speed", "Flexibility", "Stamina"],
      datasets: [{
        label: "유저 스탯",
        data: [
          stat?.strength ?? 0,
          stat?.endurance ?? 0,
          stat?.speed ?? 0,
          stat?.flexibility ?? 0,
          stat?.stamina ?? 0
        ],
        fill: "start",
        backgroundColor: applyAlpha(COLORS.PURPLE, 0.4),
        borderColor: COLORS.PURPLE,
        pointBackgroundColor: COLORS.PURPLE,
      }]
    })
  }, [stat]);


  return (
    <div className="bg-WHITE w-72 h-72 rounded-3xl shadow p-4 flex flex-col">
      <h2 className="text-xl font-bold text-gray-800">스탯 차트</h2>

      <div className="flex-1 relative ">
        <Radar data={chartData} options={options}/>
      </div>
    </div>
  );
}

