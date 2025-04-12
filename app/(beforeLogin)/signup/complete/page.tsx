"use client"

import {useRouter, useSearchParams} from "next/navigation";
import {FormEvent, useState} from "react";
import {UserAdditionalProfileRequest} from "@/dto/userProfileDTO";
import {formatDateToyyyyMMdd} from "@/util/formatDate";
import {postUserAdditionalProfile} from "@/services/api/postUserAdditionalProfile";
import {DropdownCalendar} from "@/components/ui/dropdownCalendar";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import * as React from "react";

export default function SignupCompletePage() {
  const searchParams = useSearchParams();
  const name: string = searchParams.get('name') ?? "";

  const [date, setDate] = useState<Date | undefined>(new Date())
  const [goal, setGoal] = useState("");
  const [currentState, setCurrentState] = useState("");
  const [targetState, setTargetState] = useState("");
  const [chronic, setChronic] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const reqBody: UserAdditionalProfileRequest = {
        birthDate: formatDateToyyyyMMdd(date ?? new Date()),
        currentState: currentState,
        targetState: targetState,
        goal: goal,
        chronic: chronic
      };
      const response = await postUserAdditionalProfile(reqBody)

      if (!response.success) {
        alert("정보를 입력을 실패했습니다.")
        return;
      }

      router.push("/home");
    } catch (error) {
      console.error(error);
    }
  }

  const handleSkip = () => {
    router.push("/home");
  }

  return (
    <div className="relative min-h-screen flex justify-center items-center overflow-hidden">
      <div className="relative w-[800px] h-[520px]">
        <div
          className="relative z-10 w-[800px] h-[540px] flex flex-col gap-8 justify-center items-center m-auto py-32 rounded-3xl shadow-lg bg-white bg-opacity-60">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold">{name}님 환영합니다!</h1>
            <h2 className="text-lg text-gray-700">
              추가 정보를 입력하고 개인화된 목표를 설정하세요.
            </h2>
          </div>

          <form className="w-full max-w-3xl flex flex-col gap-8 pl-14 pr-14" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">생년월일</label>
                <div className="border shadow-sm rounded-md p-2 w-fit">
                  <DropdownCalendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="min-h-[330px]"
                  />
                </div>
              </div>


              <div className="flex flex-col gap-4">

                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-gray-700">목표가 있으신가요?</label>
                  <Input
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    type="text"
                    placeholder="ex) 근육 키우기"
                  />
                </div>

                <div className="flex flex-row gap-2">
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">현재 상태</label>
                    <Input
                      value={currentState}
                      onChange={(e) => setCurrentState(e.target.value)}
                      type="text"
                      placeholder="ex) 3대 200"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">목표 상태</label>
                    <Input
                      value={targetState}
                      onChange={(e) => setTargetState(e.target.value)}
                      type="text"
                      placeholder="ex) 3대 500"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1 mb-4">
                  <label className="text-sm font-medium text-gray-700">만성질환이 있으신가요?</label>
                  <Input
                    value={chronic}
                    onChange={(e) => setChronic(e.target.value)}
                    type="text"
                    placeholder="ex) 손목 터널 증후군"
                  />
                </div>


                <div className="flex flex-col gap-4 justify-center">
                  <Button type="submit" className="w-full">
                    완료
                  </Button>
                  <Button
                    type="button"
                    className="w-full shadow-none underline bg-transparent text-gray-700 hover:bg-transparent hover:text-black"
                    onClick={handleSkip}
                  >
                    나중에 입력하기
                  </Button>
                </div>
              </div>
            </div>

          </form>
        </div>
      </div>
    </div>
  )
}
