"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {QuestAcceptRequest, QuestCreateRequest, QuestResponse} from "@/dto/questDTO";
import {postQuestPrompt} from "@/services/api/postQuestPrompt";
import QuestItem from "@/components/common/QuestItem";
import {Quest} from "@/model/quest";
import {postQuestAccept} from "@/services/api/postQuestAccept";
import {useRouter} from "next/navigation";

export default function WorkoutSelection() {
  const router = useRouter();
  // 부상이 있는지 없는지
  const [injuryStatus, setInjuryStatus] = useState<string | null>(null);
  // 부상 부위/증상 입력
  const [injuryDescription, setInjuryDescription] = useState("");
  // 선택한 운동 종류(유산소, 무산소, 기타)
  const [selectedWorkout, setSelectedWorkout] = useState<string | null>(null);
  // 세부 운동 항목
  const [selectedSubWorkout, setSelectedSubWorkout] = useState<string | null>(null);
  // 운동 추가 요청 사항
  const [requestText, setRequestText] = useState("");

  // 퀘스트 생성 완료. 수락 대기
  const [currentQuestion, setCurrentQuestion] = useState<QuestResponse | null>(null);

  // 이전 단계로 돌아가는 핸들러
  const handleGoBack = () => {
    if (selectedSubWorkout) {
      setSelectedSubWorkout(null);
      setSelectedWorkout(null);
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
  const handleSendRequest = async () => {
    let reqBody: QuestCreateRequest;
    // 부상 상태면
    if (injuryStatus === "있음") {
      reqBody = {
        mainCategory: "",
        subCategory: "",
        userRequest: "",
        injury: injuryDescription,
      }
    } else {
      // 부상 상태가 아닌 운동 상태
      reqBody = {
        mainCategory: selectedWorkout ?? "",
        subCategory: selectedSubWorkout ?? "",
        userRequest: requestText,
      }
    }

    try {
      const response = await postQuestPrompt(reqBody);

      if (!response.success) {
        throw new Error(response.message)
      }

      if (response.data) {
        setCurrentQuestion(response.data.dailyQuest)
      } else {
        alert("퀘스트 생성에 실패했습니다.")
      }
    } catch (error) {
      console.error(error);
    }

  };

  // 퀘스트 수락하기
  const handleQuestAccept = async () => {
    if (!currentQuestion) return;

    try {
      const reqBody: QuestAcceptRequest = {
        dailyQuest: currentQuestion,
      }
      const response = await postQuestAccept(reqBody);

      if (!response.success) {
        throw new Error(response.message)
      }
      // 수락 후 홈으로
      router.push("/home")
    } catch (error) {
      console.log(error);
    }
  }

  // 운동별 하위 카테고리
  const subWorkouts: Record<string, string[]> = {
    유산소: ["러닝", "사이클", "줄넘기"],
    무산소: ["등", "가슴", "어깨", "하체"],
  };

  return (
    <div className="flex flex-row justify-center top-6 gap-8">
      <div className="min-h-screen flex flex-col items-center justify-start pt-36 relative">
        {/* 아이콘 자리 (화면 최상단, z-index 적용) */}
        <div className="absolute top-24 w-16 h-16 bg-gray-200 rounded-full z-10"></div>

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
                <Button variant="outline" className="w-full py-6 text-lg" onClick={() => handleInjurySelect("없음")}>
                  없음
                </Button>
                <Button variant="outline" className="w-full py-6 text-lg" onClick={() => handleInjurySelect("있음")}>
                  있음
                </Button>
              </div>
            </>
          )}

          {/* 부상 있음 선택 시 */}
          {injuryStatus === "있음" && !selectedWorkout && !selectedSubWorkout && (
            <div className="mt-6">
              <h2 className="text-2xl font-semibold mb-6">
                부상 부위와 증상을 입력해주세요.
              </h2>
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
                  <Button key={type} variant="outline" className="w-full py-6 text-lg" onClick={() => handleWorkoutSelect(type)}>
                    {type}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* 운동 선택 후 하위 항목 표시 (기타 제외) */}
          {selectedWorkout && selectedWorkout !== "기타" && !selectedSubWorkout && (
            <div className="mt-6">
              <h2 className="text-2xl font-semibold mb-6">
                {`${selectedWorkout} 운동의 세부 항목을 선택하세요.`}
              </h2>
              <div className="space-y-4">
                {subWorkouts[selectedWorkout].map((subType) => (
                  <Button key={subType} variant="outline" className="w-full py-6 text-lg" onClick={() => handleSubWorkoutSelect(subType)}>
                    {subType}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* 최종 선택 후 추가 요청 사항 입력 */}
          {selectedSubWorkout && (
            <div className="mt-6">
              <h2 className="text-2xl font-semibold mb-6">
                추가 요청 사항을 입력해주세요.
              </h2>
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
      {currentQuestion && (
          <div className="bg-WHITE w-[400px] h-[500px] rounded-3xl shadow p-6 flex flex-col gap-4">
            <h2 className="text-xl font-bold text-gray-800">퀘스트 목록</h2>
            <div className="gap-4 flex flex-col">
              <div>
                <h4 className="text-lg font-semibold">일상</h4>
                <QuestItem key={currentQuestion?.daily.questId} quest={currentQuestion?.daily} type="daily"/>

              </div>
              <div>
                <h4 className="text-lg font-semibold">수면</h4>
                <QuestItem key={currentQuestion?.sleep.questId} quest={currentQuestion?.sleep} type="sleep"/>
              </div>
              <div>
                <h4 className="text-lg font-semibold">운동</h4>
                {currentQuestion?.fitness.map((quest: Quest) => (
                  <QuestItem key={quest.questId} quest={quest} type="fitness"/>
                ))}
              </div>

              <div className="flex-1" />
              <div className="flex flex-row justify-around">
                <Button variant="outline" onClick={handleSendRequest} className="border-BLACK w-2/5">퀘스트 다시 만들기</Button>
                <Button onClick={handleQuestAccept} className="w-2/5">퀘스트 수락하기</Button>
              </div>

            </div>


          </div>
      )}

    </div>
  );
}
