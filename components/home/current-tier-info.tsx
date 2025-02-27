"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Bronze, Gold, Platinum, Silver, Diamond } from "@/assets/images";
import ShinyTier from "../common/ShinyTier";
import { getQuestTier } from "@/services/api/getQuestTier";
import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react";
import { useAtom } from "jotai";
import { expTierAtom } from "@/store/expTierAtom";
import { statAtom } from "@/store/statAtom";
import { StaticImageData } from "next/image";

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

      console.log(data);
      const updatedData = { ...data, tier };
      setExpTierAtom(updatedData);
    }
  }, [data, setExpTierAtom]);

  function judgeTier(exp: number | undefined) {
    if (exp === undefined) {
      return "Bronze";
    }

    let tier = "Bronze";

    if (exp >= 0 && exp < 350) {
      tier = "Bronze";
    } else if (exp >= 350 && exp < 500) {
      tier = "Silver";
    } else if (exp >= 500 && exp < 850) {
      tier = "Gold";
    } else if (exp >= 850 && exp < 1300) {
      tier = "Platinum";
    } else if (exp >= 1300) {
      tier = "Diamond";
    } else {
      tier = "Bronze"
    }
    return tier;
  }

  function judgeTierImageAssets(tier: string): StaticImageData {
    switch (tier) {
      case "Bronze":
        return Bronze;
      case "Silver":
        return Silver;
      case "Gold":
        return Gold;
      case "Platinum":
        return Platinum;
      case "Diamond":
        return Diamond;
      default:
        return Bronze; // 기본값은 Bronze
    }
  }

  if (isLoading) return <div>현재 티어 불러오는 중...</div>;
  if (isError) return <div>에러 발생: {error.message}</div>;

  return (
    <Card className="static min-w-[40%]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          프로필
        </CardTitle>
      </CardHeader>

      <CardContent className="flex justify-center items-center">
        <div className="flex-1 flex flex-col items-center space-y-4">
          <CardDescription className="text-center text-md font-bold">MY 티어</CardDescription>
          <ShinyTier imageSrc={judgeTierImageAssets(expTier.tier)} badge={stats?.characterType} />
          <div className="text-center text-gray-600 font-bold text-2xl">
            {expTier.tier}
          </div>
          <div className="text-center text-gray-400 text-[10px]">* 전월 경험치 기준으로 티어가 결정됩니다.</div>
        </div>
        <div className="mx-8 w-px h-52 bg-gray-300"></div>
        <div className="flex-1 flex flex-col justify-center items-center space-y-10">
          <div className="flex flex-col justify-center items-center">
            <div className="text-sm text-gray-400">MY 운동 유형</div>
            <h2 className="text-4xl font-bold text-BLUE">
              {stats?.characterType}
            </h2>
            <div className="text-center text-gray-400 mt-2 text-[10px]">* 능력치 기반으로 결정됩니다.</div>
          </div>
          <div className="flex flex-col justify-center items-center space-y-2">
            <div className="text-sm text-gray-400">주요 스탯</div>
            <div className="flex flex-row gap-2">
              <span className="bg-MALIBU px-2 rounded-full text-xl font-bold text-white">Strength</span>
              <span className="bg-PURPLE px-2 rounded-full text-xl font-bold text-white">Speed</span>
            </div>
            <div className="text-center text-gray-400 pt-2 text-[10px]">* 운동 유형을 결정짓는 주요 스탯입니다.</div>
          </div>


        </div>
      </CardContent>
    </Card>
  )
}

export default CurrentTierInfo;