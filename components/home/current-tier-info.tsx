"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Silver } from "@/assets/images";
import ShinyTier from "../common/ShinyTier";
import { getQuestTier } from "@/services/api/getQuestTier";
import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react";
import { useAtom } from "jotai";
import { expTierAtom } from "@/store/expTierAtom";

const CurrentTierInfo = () => {
  const [expTier, setExpTierAtom] = useAtom(expTierAtom);
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

  if (isLoading) return <div>현재 티어 불러오는 중...</div>;
  if (isError) return <div>에러 발생: {error.message}</div>;

  return (
    <Card className="static min-w-[30%]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          내 정보
        </CardTitle>
      </CardHeader>

      <CardContent className="flex justify-center items-center">
        <div className="space-y-4">
          <CardDescription className="text-center text-md font-bold">내 티어</CardDescription>
          <ShinyTier imageSrc={Silver} />
          <div className="text-center font-bold text-2xl">
            {expTier.tier}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default CurrentTierInfo;