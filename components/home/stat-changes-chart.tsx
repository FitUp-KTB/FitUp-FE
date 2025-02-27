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

  useEffect(() => {
    // 차트 데이터 설정
    setChartData({
      labels: ['날짜1', '날짜2', '날짜3', '날짜4', '날짜5', '날짜6', '날짜7'],
      datasets: [
        {
          label: '스탯 A',
          data: [65, 59, 80, 81, 56, 55, 42],
          borderColor: '#CBAACB',
          backgroundColor: '#CBAACB80',
          tension: 0.5
        },
        {
          label: '스탯 B',
          data: [28, 48, 40, 19, 86, 27, 36],
          borderColor: '#887CFF80',
          backgroundColor: '#887CFF50',
          tension: 0.5
        },
        {
          label: '스탯 C',
          data: [33, 25, 35, 51, 54, 76, 45],
          borderColor: '#ABDEE6',
          backgroundColor: '#ABDEE680',
          tension: 0.5
        },
        {
          label: '스탯 D',
          data: [12, 45, 78, 34, 56, 67, 56],
          borderColor: '#53ACFF80',
          backgroundColor: '#53ACFF50',
          tension: 0.5
        },
        {
          label: '스탯 E',
          data: [43, 31, 52, 48, 62, 38, 42],
          borderColor: '#55647680',
          backgroundColor: '##55647650',
          tension: 0.5
        },
        {
          label: '스탯 F',
          data: [50, 39, 45, 70, 35, 60, 53],
          borderColor: '#F3B0C3',
          backgroundColor: '#d498e850',
          tension: 0.5
        }
      ]
    });

    // 차트 옵션 설정
    setChartOptions({
      responsive: true,
      plugins: {
        legend: {
          position: 'top' as const,
        },
        // title: {
        //   display: true,
        //   text: '능력치 변화 추이',
        // },
      },
    });
  }, []);

  return (
    <div className="w-[800px]">
      {
        chartData.datasets.length > 0 && (
          <Line options={chartOptions} data={chartData} />
        )
      }
    </div >
  );
}