"use client"

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { User, Weight, Activity, Heart, Dumbbell, Target } from 'lucide-react';
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
  const userStat = userInfo?.stat || {};
  const userDetail = userStat?.user || {};

  // Calculate age from birthDate
  const calculateAge = (birthDate) => {
    if (!birthDate) return "미설정";
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return `${age}세`;
  };

  // Format gender
  const formatGender = (gender) => {
    if (!gender) return "미설정";
    return gender === "MALE" ? "남성" : "여성";
  };

  return (
    <Card className="flex-1 min-w-[300px] space-y-2">
      <CardHeader>
        <CardTitle>사용자 정보</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col md:flex-row gap-4 justify-between">
        {/* 기본 프로필 */}
        <div className="flex-1 bg-slate-50 rounded-lg p-6">
          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mb-4">
            <User className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-lg font-medium mb-2">기본 프로필</h3>
          <div className="text-sm space-y-2">
            <p className="flex items-center">
              <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
              <span className="font-medium">이름:</span> {userInfo?.name || "미설정"}
            </p>
            <p className="flex items-center">
              <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
              <span className="font-medium">닉네임:</span> {userInfo?.nickName || "미설정"}
            </p>
            <p className="flex items-center">
              <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
              <span className="font-medium">이메일:</span> {userInfo?.email || "미설정"}
            </p>
          </div>
        </div>

        {/* 신체 정보 */}
        <div className="flex-1 bg-slate-50 rounded-lg p-6">
          <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mb-4">
            <Weight className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-lg font-medium mb-2">신체 정보</h3>
          <div className="text-sm space-y-2">
            <p className="flex items-center">
              <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
              <span className="font-medium">키:</span> {userStat.height || 0}cm
            </p>
            <p className="flex items-center">
              <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
              <span className="font-medium">체중:</span> {userStat.weight || 0}kg
            </p>
            <p className="flex items-center">
              <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
              <span className="font-medium">목표 체중:</span> {userDetail.targetWeight || 0}kg
            </p>
          </div>
        </div>

        {/* 신체 조성 */}
        <div className="flex-1 bg-slate-50 rounded-lg p-6">
          <div className="w-12 h-12 bg-cyan-500 rounded-full flex items-center justify-center mb-4">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-lg font-medium mb-2">신체 조성</h3>
          <div className="text-sm space-y-2">
            <p className="flex items-center">
              <span className="w-2 h-2 bg-cyan-400 rounded-full mr-2"></span>
              <span className="font-medium">체지방:</span> {userStat.fat || 0}kg
            </p>
            <p className="flex items-center">
              <span className="w-2 h-2 bg-cyan-400 rounded-full mr-2"></span>
              <span className="font-medium">근육량:</span> {userStat.muscleMass || 0}kg
            </p>
            <p className="flex items-center">
              <span className="w-2 h-2 bg-cyan-400 rounded-full mr-2"></span>
              <span className="font-medium">나이:</span> {calculateAge(userDetail.birthDate)}
            </p>
          </div>
        </div>
      </CardContent>
      <CardContent className="flex flex-col md:flex-row gap-4 justify-between">
        {/* 기초 체력 */}
        <div className="flex-1 bg-slate-50 rounded-lg p-6">
          <div className="w-12 h-12 bg-[#CBAACB] rounded-full flex items-center justify-center mb-4">
            <Activity className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-lg font-medium mb-2">기초 체력</h3>
          <div className="text-sm space-y-2">
            <p className="flex items-center">
              <span className="w-2 h-2 bg-[#CBAACB] rounded-full mr-2"></span>
              <span className="font-medium">푸시업:</span> {userStat.pushUps || 0}회
            </p>
            <p className="flex items-center">
              <span className="w-2 h-2 bg-[#CBAACB] rounded-full mr-2"></span>
              <span className="font-medium">윗몸일으키기:</span> {userStat.sitUp || 0}회
            </p>
            <p className="flex items-center">
              <span className="w-2 h-2 bg-[#CBAACB] rounded-full mr-2"></span>
              <span className="font-medium">달리기:</span> {userStat.runningTime || 0}분 ({userStat.runningPace || 0}km/h)
            </p>
          </div>
        </div>

        {/* 웨이트 정보 */}
        <div className="flex-1 bg-slate-50 rounded-lg p-6">
          <div className="w-12 h-12 bg-[#ABDEE6] rounded-full flex items-center justify-center mb-4">
            <Dumbbell className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-lg font-medium mb-2">웨이트 정보</h3>
          <div className="text-sm space-y-2">
            <p className="flex items-center">
              <span className="w-2 h-2 bg-[#ABDEE6] rounded-full mr-2"></span>
              <span className="font-medium">스쿼트:</span> {userStat.squat || 0}kg
            </p>
            <p className="flex items-center">
              <span className="w-2 h-2 bg-[#ABDEE6] rounded-full mr-2"></span>
              <span className="font-medium">벤치프레스:</span> {userStat.benchPress || 0}kg
            </p>
            <p className="flex items-center">
              <span className="w-2 h-2 bg-[#ABDEE6] rounded-full mr-2"></span>
              <span className="font-medium">데드리프트:</span> {userStat.deadLift || 0}kg
            </p>
          </div>
        </div>

        {/* 개인 설정 */}
        <div className="flex-1 bg-slate-50 rounded-lg p-6">
          <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center mb-4">
            <Target className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-lg font-medium mb-2">개인 설정</h3>
          <div className="text-sm space-y-2">
            <p className="flex items-center">
              <span className="w-2 h-2 bg-amber-400 rounded-full mr-2"></span>
              <span className="font-medium">성별:</span> {formatGender(userDetail.gender)}
            </p>
            <p className="flex items-center">
              <span className="w-2 h-2 bg-amber-400 rounded-full mr-2"></span>
              <span className="font-medium">목표:</span> {userDetail.goal || "미설정"}
            </p>
            <p className="flex items-center">
              <span className="w-2 h-2 bg-amber-400 rounded-full mr-2"></span>
              <span className="font-medium">건강 이슈:</span> {userDetail.chronic || "없음"}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserInfoCard;