"use client"
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import QuestItem from "@/components/common/QuestItem";
import { useEffect, useState } from "react";
import { Quest } from "@/model/quest";
import { useAtomValue } from "jotai";
import { recentQuestOverviewAtom } from "@/store/recentQuestOverviewAtom";
import { getQuest } from "@/services/api/getQuest";
import { postQuestComplete } from "@/services/api/postQuestComplete";
import { checkIsToday } from "@/util/checkIsToday";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export default function QuestList() {
  const router = useRouter();

  const [dailyQuest, setDailyQuest] = useState<Quest>(
    { questId: "1", content: "", exp: 0, isSuccess: false },
  );

  const [sleepQuest, setSleepQuest] = useState<Quest>(
    { questId: "2", content: "", exp: 0, isSuccess: false },
  );

  const [fitnessQuest, setFitnessQuest] = useState<Quest[]>([
    { questId: "3", content: "", exp: 0, isSuccess: false },
    { questId: "4", content: "", exp: 0, isSuccess: false },
    { questId: "5", content: "", exp: 0, isSuccess: false },
  ])

  const recentQuestOverview = useAtomValue(recentQuestOverviewAtom);
  const [todayQuestExist, setTodayQuestExists] = useState<boolean>(false);

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
    if (recentQuestOverview && checkIsToday(recentQuestOverview.createdAt)) {
      fetchQuest(recentQuestOverview.dailyResultSeq)
      setTodayQuestExists(true);
    } else {
      setTodayQuestExists(false);
    }
  }, [recentQuestOverview]);

  const questComplete = async (questId: string) => {
    if (!recentQuestOverview) { return }
    try {
      const response = await postQuestComplete(recentQuestOverview.dailyResultSeq, questId);
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

    <Card>
      <CardHeader>
        <CardTitle>
          오늘의 퀘스트
        </CardTitle>
      </CardHeader>
      <CardContent className="w-96 h-[480px] flex flex-col gap-4">
        {todayQuestExist && (
          <div className="gap-2 flex flex-col">
            <div>
              <h4 className="text-lg font-semibold">일상</h4>
              <QuestItem key={dailyQuest.questId} quest={dailyQuest} type="daily" onFinish={questComplete} />

            </div>
            <div>
              <h4 className="text-lg font-semibold">수면</h4>
              <QuestItem key={sleepQuest.questId} quest={sleepQuest} type="sleep" onFinish={questComplete} />
            </div>
            <div>
              <h4 className="text-lg font-semibold">운동</h4>
              {fitnessQuest.map((quest: Quest) => (
                <QuestItem key={quest.questId} quest={quest} type="fitness" onFinish={questComplete} />
              ))}
            </div>

            <div className="flex-1" />

            <Button onClick={handleGoToPrompt} className="rounded-2xl bg-BLUE">퀘스트 편집하러 가기</Button>
          </div>
        )}

        {!todayQuestExist && (
          <div className="flex flex-col flex-1 justify-center items-center">
            <h2 className="text-lg font-bold text-gray-800">오늘의 퀘스트가 없습니다!</h2>
            <Button onClick={handleGoToPrompt}>퀘스트 생성하러 가기</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
