"use client"
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import QuestItem from "@/components/common/QuestItem";
import {useState} from "react";
import {Quest} from "@/model/quest";

export default function QuestList() {
  const router = useRouter();

  const [dailyQuest, setDailyQuest] = useState<Quest>(
    { questId: "1", content: "물 2L 마시기", isSuccess: false },
  );

  const [sleepQuest, setSleepQuest] = useState<Quest>(
    { questId: "2", content: "수면 7시간 30분 유지", isSuccess: false },
  );

  const [fitnessQuest, setFitnessQuest] = useState<Quest[]>([
    { questId: "3", content: "벤치프레스 65kg 5세트 수행", isSuccess: false },
    { questId: "4", content: "덤벨 벤치프레스 20kg 5세트", isSuccess: false },
    { questId: "5", content: "인클라인 벤치프레스 55kg 5세트", isSuccess: false },
  ])

  const handleCheck = async (questId: string): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // 3개의 quest에서 해당 id를 찾음
        if (dailyQuest.questId === questId) {
          setDailyQuest((prev) => ({ ...prev, isSuccess: true }));
        } else if (sleepQuest.questId === questId) {
          setSleepQuest((prev) => ({ ...prev, isSuccess: true }));
        } else {
          setFitnessQuest((prev) =>
            prev.map((quest) =>
              quest.questId === questId ? { ...quest, isSuccess: true } : quest
            )
          );
        }
        resolve();
      }, 1000);
    })
  }

  const handleGoToPrompt = () => {
    router.push("/prompt");
  }

  return (
    <div className="bg-WHITE w-96 rounded-3xl shadow p-4 flex flex-col gap-4">
      <h2 className="text-xl font-bold text-gray-800">오늘의 퀘스트</h2>

      <div>
        <h4 className="text-lg font-semibold">일상</h4>
        <QuestItem key={dailyQuest.questId} quest={dailyQuest} type="daily" onFinish={handleCheck}/>

      </div>
      <div>
        <h4 className="text-lg font-semibold">수면</h4>
        <QuestItem key={sleepQuest.questId} quest={sleepQuest} type="sleep" onFinish={handleCheck}/>
      </div>
      <div>
        <h4 className="text-lg font-semibold">운동</h4>
        {fitnessQuest.map((quest: Quest) => (
          <QuestItem key={quest.questId} quest={quest} type="fitness" onFinish={handleCheck}/>
        ))}
      </div>

      <div className="flex-1" />

      <Button onClick={handleGoToPrompt}>퀘스트 편집하러 가기</Button>
    </div>
  );
}
