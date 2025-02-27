"use client";
import { Radar } from "react-chartjs-2";
import { Chart, ChartData, Filler, LineElement, PointElement, RadialLinearScale } from "chart.js";
import { COLORS } from "@/styles/colors";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import applyAlpha from "@/util/colorUtil";
import { statAtom } from "@/store/statAtom";
import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

Chart.register(RadialLinearScale, PointElement, LineElement, ChartDataLabels, Filler);

const options = {
  responsive: true,
  maintainAspectRatio: false,  // 이 설정 유지
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
      color: COLORS.MALIBU,
      font: {
        size: 12,
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
  const [chartData, setChartData] = useState<ChartData<'radar'>>({ datasets: [] })

  useEffect(() => {
    setChartData({
      labels: ["힘", "지구력", "민첩성", "유연성", "스태미너"],
      datasets: [{
        label: "나의 능력치",
        data: [
          stat?.strength ?? 0,
          stat?.endurance ?? 0,
          stat?.speed ?? 0,
          stat?.flexibility ?? 0,
          stat?.stamina ?? 0
        ],
        fill: "start",
        backgroundColor: applyAlpha("#8dc5f9", 0.4),
        borderColor: "#8dc5f9",
        pointBackgroundColor: "#8dc5f9",
        pointRadius: 2,  // 포인트 크기 키움
        borderWidth: 1,  // 테두리 굵기 키움
      }]
    })
  }, [stat]);


  return (
    <Card className="w-[28%]">
      <CardHeader>
        <CardTitle>
          능력치
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* 차트를 감싸는 div에 명시적 높이 지정 */}
        <div className="h-80 w-full">  {/* 높이를 h-80(20rem)으로 설정 */}
          <Radar data={chartData} options={options} />
        </div>
      </CardContent>
    </Card>
  );
}