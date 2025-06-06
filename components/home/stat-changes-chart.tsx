"use client"

import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions
} from 'chart.js';
import { useSetAtom } from "jotai";
import { statAtom } from "@/store/statAtom";
import { getStats } from "@/services/api/getStats";
import { Stat } from "@/model/stat";
import { fillMissingData } from "@/util/fillMissingData";
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

// Chart.js 컴포넌트 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function StatChangesChart() {
  const [chartData, setChartData] = useState<ChartData<'line'>>({
    datasets: [],
  });
  const [chartOptions, setChartOptions] = useState<ChartOptions<'line'>>({});

  // 오늘의 스탯 정보 전역 상태
  const setStat = useSetAtom(statAtom);

  // 스탯 리스트 불러오기
  const fetchData = async () => {
    try {
      const response = await getStats();
      if (!response.success) {
        throw new Error(response.message)
      }
      setStat(response.data.stats[0])
      setChart(response.data.stats)
    } catch (error) {
      console.error(error);
    }
  }

  // Chart data setting
  const setChart = (stats: Stat[]) => {
    const days = fillMissingData(stats.map((stat) => stat.createdAt).reverse());

    setChartData({
      labels: days,
      datasets: [
        {
          label: "힘",
          data: fillMissingData(stats.map((stat) => stat.strength).reverse()),
          borderColor: '#CBAACB',
          backgroundColor: '#CBAACB80',
          tension: 0.3
        },
        {
          label: "지구력",
          data: fillMissingData(stats.map((stat) => stat.endurance).reverse()),
          borderColor: '#887CFF80',
          backgroundColor: '#887CFF50',
          tension: 0.3
        },
        {
          label: "순발력",
          data: fillMissingData(stats.map((stat) => stat.speed).reverse()),
          borderColor: '#ABDEE6',
          backgroundColor: '#ABDEE680',
          tension: 0.3
        },
        {
          label: "유연성",
          data: fillMissingData(stats.map((stat) => stat.flexibility).reverse()),
          borderColor: '#53ACFF80',
          backgroundColor: '#53ACFF50',
          tension: 0.3
        },
        {
          label: "스태미너",
          data: fillMissingData(stats.map((stat) => stat.stamina).reverse()),
          borderColor: '#55647680',
          backgroundColor: '#55647650',
          tension: 0.3
        }
      ]
    })
  }

  useEffect(() => {
    fetchData();
    // 차트 옵션 설정
    setChartOptions({
      responsive: true,
      maintainAspectRatio: false, // 컨테이너에 맞게 종횡비 조정
      plugins: {
        legend: {
          position: 'top' as const,
        },
      },
      scales: {
        y: {
          beginAtZero: false, // 0부터 시작하지 않음
          grace: '5%', // 데이터 위아래로 약간의 여백 추가
          ticks: {
            precision: 0 // 소수점 없이 정수로 표시
          }
        }
      }
    });
  }, []);

  return (
    <Card className="flex-1 min-w-[45%] flex flex-col">
      <CardHeader>
        <CardTitle>
          능력치 변화
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <div className="flex-1 w-full" style={{ minHeight: '250px' }}>
          {
            chartData.datasets.length > 0 && (
              <Line options={chartOptions} data={chartData} />
            )
          }
        </div>
      </CardContent>
    </Card>
  );
}