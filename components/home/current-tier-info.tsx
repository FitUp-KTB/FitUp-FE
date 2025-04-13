"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import ShinyTier from "../common/ShinyTier";
import { getQuestTier } from "@/services/api/getQuestTier";
import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react";
import { useAtom } from "jotai";
import { expTierAtom } from "@/store/expTierAtom";
import { statAtom } from "@/store/statAtom";
import { judgeTier, judgeTierImageAssets } from "@/util/tier";

const CurrentTierInfo = () => {
  const [expTier, setExpTierAtom] = useAtom(expTierAtom);
  const [stats] = useAtom(statAtom);
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['exp'],
    queryFn: getQuestTier,
  });

  useEffect(() => {
    if (data) {
      const tier = judgeTier(data.previousExp);
      const updatedData = { ...data, tier };
      setExpTierAtom(updatedData);
    }
  }, [data, setExpTierAtom]);

  if (isLoading) return <div>현재 티어 불러오는 중...</div>;
  if (isError) return <div>에러 발생: {error.message}</div>;

  return (
    <Card className="flex-grow w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          프로필
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-0">
          <div className="flex flex-col items-center space-y-4 w-full md:w-auto md:flex-1">
            <CardDescription className="text-center text-md font-bold">MY 티어</CardDescription>
            <ShinyTier imageSrc={judgeTierImageAssets(expTier.tier)} badge={stats?.characterType} />
            <div className="text-center text-gray-600 font-bold text-2xl">
              {expTier.tier}
            </div>
            <div className="text-center text-gray-400 text-[10px]">* 전월 경험치 기준으로 티어가 결정됩니다.</div>
          </div>

          <div className="w-full h-px md:w-px md:h-52 bg-gray-300 my-4 md:my-0 md:mx-8"></div>

          <div className="flex flex-col justify-center items-center space-y-6 md:space-y-10 w-full md:w-auto md:flex-1">
            <div className="flex flex-col justify-center items-center">
              <div className="text-sm text-gray-400">MY 운동 유형</div>
              <h2 className="text-3xl md:text-4xl font-bold text-BLUE">
                {stats?.characterType}
              </h2>
              <div className="text-center text-gray-400 mt-2 text-[10px]">* 능력치 기반으로 결정됩니다.</div>
            </div>
            <div className="flex flex-col justify-center items-center space-y-2">
              <div className="text-sm text-gray-400">주요 스탯</div>
              <div className="flex flex-row gap-2 flex-wrap justify-center">
                <span className="bg-MALIBU px-2 rounded-full text-lg md:text-xl font-bold text-white">Strength</span>
                <span className="bg-PURPLE px-2 rounded-full text-lg md:text-xl font-bold text-white">Speed</span>
              </div>
              <div className="text-center text-gray-400 pt-2 text-[10px]">* 운동 유형을 결정짓는 주요 스탯입니다.</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default CurrentTierInfo;