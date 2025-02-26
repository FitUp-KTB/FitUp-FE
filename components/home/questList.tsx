"use client"
import QuestCheckbox from "@/components/common/questCheckbox";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";

export default function QuestList() {
  const router = useRouter();

  const handleCheck = async (questId: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("questId: ", questId);
        resolve(true);
      }, 1000);
    })
  }

  const handleGoToPrompt = () => {
    router.push("/prompt");
  }

  return (
    <div className="bg-WHITE w-72 h-96 rounded-3xl shadow p-4 flex flex-col gap-4">
      <h2 className="text-xl font-bold text-gray-800">오늘의 퀘스트</h2>

      <div>
        <h4>일상</h4>
        <QuestCheckbox questId="QUEST1" text="물 2L 마시기" onCheck={handleCheck}/>

      </div>
      <div>
        <h4>수면</h4>
        <QuestCheckbox questId="QUEST2" text="8시간 수면" onCheck={handleCheck}/>
      </div>
      <div>
        <h4>운동</h4>
        <QuestCheckbox questId="QUEST3" text="턱걸이 10회" onCheck={handleCheck}/>
        <QuestCheckbox questId="QUEST4" text="푸시업 10회" onCheck={handleCheck}/>
        <QuestCheckbox questId="QUEST5" text="달리기 3KM" onCheck={handleCheck}/>
      </div>

      <div className="flex-1" />

      <Button onClick={handleGoToPrompt}>퀘스트 편집하러 가기</Button>
    </div>
  );
}
