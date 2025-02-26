"use client";

import { useState, FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function MultiStepForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  // 모든 입력 데이터를 한 번에 관리
  const [formData, setFormData] = useState({
    height: "",
    weight: "",
    bodyFat: "",
    muscleMass: "",
    pushup: "",
    situp: "",
    runningPace: "",
    runningDuration: "",
    squat: "",
    benchPress: "",
    deadlift: "",
  });

  // 입력값 변경 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 다음 단계로 이동 (마지막 단계에서 제출)
  const handleNext = (e: FormEvent) => {
    e.preventDefault();
    if (step < 4) {
      setStep(step + 1);
    } else {
      // 마지막 단계에서 제출
      console.log("최종 제출 데이터:", formData);
      router.push("/home"); // 제출 후 이동할 페이지
    }
  };

  // 이전 단계로 이동
  const handlePrev = (e: FormEvent) => {
    e.preventDefault();
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#AEC3CF]">
      <div className="bg-white rounded-[30px] shadow p-8 w-[600px]">
        {/* 상단 문구 */}
        <h2 className="text-2xl font-semibold mb-6">
          신체 상태를 파악중입니다
        </h2>

        <form onSubmit={handleNext} className="space-y-6">
          {/* --------------- STEP 1 --------------- */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="flex gap-4">
                {/* 키 */}
                <div className="flex-1">
                  <label className="block text-sm mb-1">키</label>
                  <Input
                    type="number"
                    name="height"
                    value={formData.height}
                    onChange={handleChange}
                    placeholder="cm"
                    required
                    className="no-spinner h-12 text-lg"
                  />
                </div>
                {/* 몸무게 */}
                <div className="flex-1">
                  <label className="block text-sm mb-1">몸무게</label>
                  <Input
                    type="number"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    placeholder="kg"
                    required
                    className="no-spinner h-12 text-lg"
                  />
                </div>
              </div>
              <div className="flex gap-4">
                {/* 체지방률 */}
                <div className="flex-1">
                  <label className="block text-sm mb-1">체지방률</label>
                  <Input
                    type="number"
                    name="bodyFat"
                    value={formData.bodyFat}
                    onChange={handleChange}
                    placeholder="%"
                    required
                    className="no-spinner h-12 text-lg"
                  />
                </div>
                {/* 근량 */}
                <div className="flex-1">
                  <label className="block text-sm mb-1">근량</label>
                  <Input
                    type="number"
                    name="muscleMass"
                    value={formData.muscleMass}
                    onChange={handleChange}
                    placeholder="kg"
                    required
                    className="no-spinner h-12 text-lg"
                  />
                </div>
              </div>
            </div>
          )}

          {/* --------------- STEP 2 --------------- */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="flex gap-4">
                {/* 푸쉬업 개수 */}
                <div className="flex-1">
                  <label className="block text-sm mb-1">푸쉬업 개수</label>
                  <Input
                    type="number"
                    name="pushup"
                    value={formData.pushup}
                    onChange={handleChange}
                    placeholder="개수"
                    required
                    className="no-spinner h-12 text-lg"
                  />
                </div>
                {/* 싯업 개수 */}
                <div className="flex-1">
                  <label className="block text-sm mb-1">싯업 개수</label>
                  <Input
                    type="number"
                    name="situp"
                    value={formData.situp}
                    onChange={handleChange}
                    placeholder="개수"
                    required
                    className="no-spinner h-12 text-lg"
                  />
                </div>
              </div>
            </div>
          )}

          {/* --------------- STEP 3 --------------- */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="flex gap-4">
                {/* 러닝 페이스 */}
                <div className="flex-1">
                  <label className="block text-sm mb-1">러닝 페이스</label>
                  <Input
                    type="text"
                    name="runningPace"
                    value={formData.runningPace}
                    onChange={handleChange}
                    placeholder="예: 5분/km"
                    required
                    className="h-12 text-lg"
                  />
                </div>
                {/* 러닝 지속 시간 */}
                <div className="flex-1">
                  <label className="block text-sm mb-1">러닝 지속 시간</label>
                  <Input
                    type="number"
                    name="runningDuration"
                    value={formData.runningDuration}
                    onChange={handleChange}
                    placeholder="분"
                    required
                    className="no-spinner h-12 text-lg"
                  />
                </div>
              </div>
            </div>
          )}

          {/* --------------- STEP 4 --------------- */}
          {step === 4 && (
            <div className="space-y-4">
              <div className="flex gap-4">
                {/* 스쿼트 무게 */}
                <div className="flex-1">
                  <label className="block text-sm mb-1">스쿼트 무게</label>
                  <Input
                    type="number"
                    name="squat"
                    value={formData.squat}
                    onChange={handleChange}
                    placeholder="kg"
                    required
                    className="no-spinner h-12 text-lg"
                  />
                </div>
                {/* 벤치프레스 무게 */}
                <div className="flex-1">
                  <label className="block text-sm mb-1">벤치프레스 무게</label>
                  <Input
                    type="number"
                    name="benchPress"
                    value={formData.benchPress}
                    onChange={handleChange}
                    placeholder="kg"
                    required
                    className="no-spinner h-12 text-lg"
                  />
                </div>
                {/* 데드리프트 무게 */}
                <div className="flex-1">
                  <label className="block text-sm mb-1">
                    데드리프트 무게
                  </label>
                  <Input
                    type="number"
                    name="deadlift"
                    value={formData.deadlift}
                    onChange={handleChange}
                    placeholder="kg"
                    required
                    className="no-spinner h-12 text-lg"
                  />
                </div>
              </div>
            </div>
          )}

          {/* --------------- 버튼 영역 --------------- */}
          <div className="flex justify-between mt-4">
            {step > 1 && (
              <Button type="button" onClick={handlePrev}>
                이전
              </Button>
            )}
            <Button type="submit">
              {step === 4 ? "제출" : "다음"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}