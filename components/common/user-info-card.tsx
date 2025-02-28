"use client"

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { User, Activity, Dumbbell, Footprints, Weight, Heart } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getUserProfile } from '@/services/api/getUserProfile';

const UserInfoCard = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['userInfo'],
    queryFn: getUserProfile,
  });

  if (isLoading) return <div>사용자 정보 불러오는 중...</div>;
  if (isError) return <div>에러 발생: {error.message}</div>;

  const userInfo = data?.data;

  return (
    <Card className="flex-1 min-w-[300px]">
      <CardHeader>
        <CardTitle>사용자 정보</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col md:flex-row flex-wrap gap-4">
        {/* 기본 프로필 정보 */}
        <div className="flex-1 bg-slate-50 rounded-lg p-6 min-w-[250px]">
          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mb-4">
            <User className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-lg font-medium mb-2">기본 정보</h3>
          <ul className="text-sm text-gray-700 space-y-2">
            <li className="flex items-center">
              <span className="w-2 h-2 bg-blue-400 rounded-full mr-2 flex-shrink-0"></span>
              <span className="font-medium">이름:</span> {userInfo?.name || '-'}
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-blue-400 rounded-full mr-2 flex-shrink-0"></span>
              <span className="font-medium">닉네임:</span> {userInfo?.nickName || '-'}
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-blue-400 rounded-full mr-2 flex-shrink-0"></span>
              <span className="font-medium">이메일:</span> {userInfo?.email || '-'}
            </li>
          </ul>
        </div>

        {/* 신체 측정 */}
        <div className="flex-1 bg-slate-50 rounded-lg p-6 min-w-[250px]">
          <div className="w-12 h-12 bg-[#CBAACB] rounded-full flex items-center justify-center mb-4">
            <Weight className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-lg font-medium mb-2">신체 측정</h3>
          <ul className="text-sm text-gray-700 space-y-2">
            <li className="flex items-center">
              <span className="w-2 h-2 bg-[#CBAACB] rounded-full mr-2 flex-shrink-0"></span>
              <span className="font-medium">키:</span> {userInfo?.height ? `${userInfo.height}cm` : '-'}
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-[#CBAACB] rounded-full mr-2 flex-shrink-0"></span>
              <span className="font-medium">몸무게:</span> {userInfo?.weight ? `${userInfo.weight}kg` : '-'}
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-[#CBAACB] rounded-full mr-2 flex-shrink-0"></span>
              <span className="font-medium">체지방:</span> {userInfo?.bodyFat ? `${userInfo.bodyFat}%` : '-'}
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-[#CBAACB] rounded-full mr-2 flex-shrink-0"></span>
              <span className="font-medium">근육량:</span> {userInfo?.muscleMass ? `${userInfo.muscleMass}kg` : '-'}
            </li>
          </ul>
        </div>

        {/* 상체 운동 */}
        <div className="flex-1 bg-slate-50 rounded-lg p-6 min-w-[250px]">
          <div className="w-12 h-12 bg-[#ABDEE6] rounded-full flex items-center justify-center mb-4">
            <Dumbbell className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-lg font-medium mb-2">상체 운동</h3>
          <ul className="text-sm text-gray-700 space-y-2">
            <li className="flex items-center">
              <span className="w-2 h-2 bg-[#ABDEE6] rounded-full mr-2 flex-shrink-0"></span>
              <span className="font-medium">팔굽혀펴기:</span> {userInfo?.pushUps || '-'}회
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-[#ABDEE6] rounded-full mr-2 flex-shrink-0"></span>
              <span className="font-medium">윗몸일으키기:</span> {userInfo?.sitUps || '-'}회
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-[#ABDEE6] rounded-full mr-2 flex-shrink-0"></span>
              <span className="font-medium">벤치프레스:</span> {userInfo?.benchPress ? `${userInfo.benchPress}kg` : '-'}
            </li>
          </ul>
        </div>

        {/* 하체 운동 */}
        <div className="flex-1 bg-slate-50 rounded-lg p-6 min-w-[250px]">
          <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mb-4">
            <Activity className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-lg font-medium mb-2">하체 운동</h3>
          <ul className="text-sm text-gray-700 space-y-2">
            <li className="flex items-center">
              <span className="w-2 h-2 bg-purple-500 rounded-full mr-2 flex-shrink-0"></span>
              <span className="font-medium">스쿼트:</span> {userInfo?.squat ? `${userInfo.squat}kg` : '-'}
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-purple-500 rounded-full mr-2 flex-shrink-0"></span>
              <span className="font-medium">데드리프트:</span> {userInfo?.deadLift ? `${userInfo.deadLift}kg` : '-'}
            </li>
          </ul>
        </div>

        {/* 유산소 */}
        <div className="flex-1 bg-slate-50 rounded-lg p-6 min-w-[250px]">
          <div className="w-12 h-12 bg-cyan-500 rounded-full flex items-center justify-center mb-4">
            <Footprints className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-lg font-medium mb-2">유산소 운동</h3>
          <ul className="text-sm text-gray-700 space-y-2">
            <li className="flex items-center">
              <span className="w-2 h-2 bg-cyan-500 rounded-full mr-2 flex-shrink-0"></span>
              <span className="font-medium">달리기 페이스:</span> {userInfo?.runningPace ? `${userInfo.runningPace}분/km` : '-'}
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-cyan-500 rounded-full mr-2 flex-shrink-0"></span>
              <span className="font-medium">달리기 시간:</span> {userInfo?.runningTime ? `${userInfo.runningTime}분` : '-'}
            </li>
          </ul>
        </div>

        {/* 종합 건강 지표 */}
        <div className="flex-1 bg-slate-50 rounded-lg p-6 min-w-[250px]">
          <div className="w-12 h-12 bg-red-400 rounded-full flex items-center justify-center mb-4">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-lg font-medium mb-2">건강 지표</h3>
          <p className="text-sm text-gray-700 flex items-center">
            <span className="w-2 h-2 bg-red-400 rounded-full mr-2 flex-shrink-0"></span>
            {userInfo?.height && userInfo?.weight ? (
              <>
                <span className="font-medium">BMI:</span> {(userInfo.weight / ((userInfo.height / 100) ** 2)).toFixed(1)}
              </>
            ) : '충분한 데이터가 없습니다'}
          </p>
          <p className="text-sm text-gray-500 mt-2 flex items-center">
            <span className="w-2 h-2 bg-gray-400 rounded-full mr-2 flex-shrink-0"></span>
            * 헬스 기록 데이터가 부족합니다. 운동을 기록하여 더 많은 정보를 확인하세요.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserInfoCard;