"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function WorkoutSelection() {
  const [injuryStatus, setInjuryStatus] = useState<string | null>(null);
  const [injuryDescription, setInjuryDescription] = useState("");
  const [selectedWorkout, setSelectedWorkout] = useState<string | null>(null);
  const [selectedSubWorkout, setSelectedSubWorkout] = useState<string | null>(null);
  const [requestText, setRequestText] = useState("");

  // 이전 단계로 돌아가는 핸들러
  const handleGoBack = () => {
    if (selectedSubWorkout) {
      setSelectedSubWorkout(null);
    } else if (selectedWorkout) {
      setSelectedWorkout(null);
    } else if (injuryStatus) {
      setInjuryStatus(null);
    }
  };

  // 부상 여부 선택
  const handleInjurySelect = (status: string) => {
    setInjuryStatus(status);
  };

  // 운동 선택 핸들러
  const handleWorkoutSelect = (type: string) => {
    setSelectedWorkout(type);
    if (type === "기타") {
      setSelectedSubWorkout("기타");
    }
  };

  // 하위 운동 선택 핸들러
  const handleSubWorkoutSelect = (subType: string) => {
    setSelectedSubWorkout(subType);
  };

  // 요청 사항 전송 버튼 핸들러
  const handleSendRequest = () => {
    console.log("전송된 요청:", requestText);
    alert("퀘스트가 생성됩니다!");
  };

  // 운동별 하위 카테고리
  const subWorkouts: Record<string, string[]> = {
    유산소: ["러닝", "사이클", "줄넘기"],
    무산소: ["스쿼트", "벤치프레스", "데드리프트"],
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start pt-20 relative">
      {/* 아이콘 자리 (화면 최상단, z-index 적용) */}
      <div className="absolute top-6 w-16 h-16 bg-gray-200 rounded-full z-10"></div>

      <div className="bg-white rounded-[30px] shadow p-8 w-[500px] text-center relative">
        {/* 뒤로가기 버튼 (왼쪽 상단, 아이콘과 겹치지 않도록 배치) */}
        {injuryStatus && (
          <Button
            className="absolute top-4 left-4 text-gray-700 text-sm z-20"
            variant="ghost"
            onClick={handleGoBack}
          >
            ← 뒤로가기
          </Button>
        )}

        {/* 부상 여부 질문 */}
        {!injuryStatus && (
          <>
            <h2 className="text-2xl font-semibold mb-6">부상이 있나요?</h2>
            <div className="space-y-4">
              <Button className="w-full py-3 text-lg" onClick={() => handleInjurySelect("없음")}>
                없음
              </Button>
              <Button className="w-full py-3 text-lg" onClick={() => handleInjurySelect("있음")}>
                있음
              </Button>
            </div>
          </>
        )}

        {/* 부상 있음 선택 시 */}
        {injuryStatus === "있음" && !selectedWorkout && !selectedSubWorkout && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              부상 부위와 증상을 입력해주세요.
            </h3>
            <Input
              className="w-full py-2 mb-4"
              placeholder="예: 무릎 통증"
              value={injuryDescription}
              onChange={(e) => setInjuryDescription(e.target.value)}
            />
            <Button className="w-full py-3 text-lg mt-2" onClick={handleSendRequest}>
              퀘스트 생성
            </Button>
          </div>
        )}

        {/* 부상 없음 선택 시 운동 선택 화면 */}
        {injuryStatus === "없음" && !selectedWorkout && (
          <div className="mt-6">
            <h2 className="text-2xl font-semibold mb-6">어떤 운동을 하고 싶으신가요?</h2>
            <div className="space-y-4">
              {["유산소", "무산소", "기타"].map((type) => (
                <Button key={type} className="w-full py-3 text-lg" onClick={() => handleWorkoutSelect(type)}>
                  {type}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* 운동 선택 후 하위 항목 표시 (기타 제외) */}
        {selectedWorkout && selectedWorkout !== "기타" && !selectedSubWorkout && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              {`${selectedWorkout} 운동의 세부 항목을 선택하세요.`}
            </h3>
            <div className="space-y-4">
              {subWorkouts[selectedWorkout].map((subType) => (
                <Button key={subType} className="w-full py-3 text-lg" onClick={() => handleSubWorkoutSelect(subType)}>
                  {subType}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* 최종 선택 후 추가 요청 사항 입력 */}
        {selectedSubWorkout && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              추가 요청 사항을 입력해주세요.
            </h3>
            <Input
              className="w-full py-2 mb-4"
              placeholder="예: 운동 강도를 조절해 주세요."
              value={requestText}
              onChange={(e) => setRequestText(e.target.value)}
            />
            <Button className="w-full py-3 text-lg" onClick={handleSendRequest}>
              퀘스트 생성
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
