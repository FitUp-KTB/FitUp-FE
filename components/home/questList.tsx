"use client"
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import QuestItem from "@/components/common/QuestItem";
import {useEffect, useState} from "react";
import {Quest} from "@/model/quest";
import {useAtomValue} from "jotai";
import {todayResultSeqAtom} from "@/store/todayResultSeqAtom";
import {getQuest} from "@/services/api/getQuest";
import {log} from "node:util";
import {postQuestComplete} from "@/services/api/postQuestComplete";

export default function QuestList() {
  const router = useRouter();

  const [dailyQuest, setDailyQuest] = useState<Quest>(
    { questId: "1", content: "", isSuccess: false },
  );

  const [sleepQuest, setSleepQuest] = useState<Quest>(
    { questId: "2", content: "", isSuccess: false },
  );

  const [fitnessQuest, setFitnessQuest] = useState<Quest[]>([
    { questId: "3", content: "", isSuccess: false },
    { questId: "4", content: "", isSuccess: false },
    { questId: "5", content: "", isSuccess: false },
  ])

  const dailyResultSeq = useAtomValue(todayResultSeqAtom);

  const fetchQuest = async (seq: number) => {
    try {
      const response = await getQuest(seq)
      if (!response.success) {
        throw new Error(response.message);
      }
      setDailyQuest(response.data.daily);
      setSleepQuest(response.data.sleep);
      setFitnessQuest(response.data.fitness);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (dailyResultSeq) {
      fetchQuest(dailyResultSeq)
    }
  }, [dailyResultSeq]);

  const questComplete = async (questId: string) => {
    if (!dailyResultSeq) {return}
    try {
      const response = await postQuestComplete(dailyResultSeq, questId);
      if (!response.success) {
        throw new Error(response.message)
      }
      handleCheck(questId)
    } catch (error) {
      console.error(error);
    }
  }

  const handleCheck = (questId: string) => {
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
  }

  const handleGoToPrompt = () => {
    router.push("/prompt");
  }

  return (
    <div className="bg-WHITE w-96 rounded-3xl shadow p-4 flex flex-col gap-4">
      <h2 className="text-xl font-bold text-gray-800">오늘의 퀘스트</h2>

      <div>
        <h4 className="text-lg font-semibold">일상</h4>
        <QuestItem key={dailyQuest.questId} quest={dailyQuest} type="daily" onFinish={questComplete}/>

      </div>
      <div>
        <h4 className="text-lg font-semibold">수면</h4>
        <QuestItem key={sleepQuest.questId} quest={sleepQuest} type="sleep" onFinish={questComplete}/>
      </div>
      <div>
        <h4 className="text-lg font-semibold">운동</h4>
        {fitnessQuest.map((quest: Quest) => (
          <QuestItem key={quest.questId} quest={quest} type="fitness" onFinish={questComplete}/>
        ))}
      </div>

      <div className="flex-1" />

      <Button onClick={handleGoToPrompt}>퀘스트 편집하러 가기</Button>
    </div>
  );
}
