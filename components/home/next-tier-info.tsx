"use client"

import { useAtom } from "jotai"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import CircularGauge from "../ui/circular-gauge"
import { expTierAtom } from "@/store/expTierAtom"
import { useMemo } from "react"

const NextTierInfo = () => {
  const [expTier] = useAtom(expTierAtom);

  // 티어별 경험치 경계값
  const TIER_DEADLINE = [350, 500, 850, 1300];
  // 티어 이름 배열
  const TIER_NAMES = ["Bronze", "Silver", "Gold", "Platinum", "Diamond"];

  // 계산 로직을 useMemo로 분리하여 성능 최적화
  const tierInfo = useMemo(() => {
    let preDeadline = 0;
    let nextDeadline = TIER_DEADLINE[0];
    let nextTier = TIER_NAMES[0];

    // 현재 경험치가 속한 구간 찾기
    for (let i = 0; i < TIER_DEADLINE.length; i++) {
      if (expTier.currentExp < TIER_DEADLINE[i]) {
        nextDeadline = TIER_DEADLINE[i];
        preDeadline = i > 0 ? TIER_DEADLINE[i - 1] : 0;
        nextTier = TIER_NAMES[i];
        break;
      }

      // 최대 티어에 도달한 경우
      if (i === TIER_DEADLINE.length - 1 && expTier.currentExp >= TIER_DEADLINE[i]) {
        preDeadline = TIER_DEADLINE[i];
        nextDeadline = preDeadline;
        nextTier = TIER_NAMES[i];
      }
    }

    // 게이지 값 계산 (현재 구간에서의 진행도, 0-100)
    const currentGauge = nextDeadline === preDeadline
      ? 100
      : Math.floor(((expTier.currentExp - preDeadline) / (nextDeadline - preDeadline)) * 100);

    // 다음 티어까지 남은 경험치
    const remainExp = nextDeadline - expTier.currentExp;

    return {
      preDeadline,
      nextDeadline,
      nextTier,
      currentGauge,
      remainExp
    };
  }, [expTier.currentExp]); // 의존성 배열: currentExp가 변경될 때만 재계산

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          다음 달 예정 티어
        </CardTitle>
        <CardDescription className="w-full text-center">
          다음 티어까지 남은 EXP
        </CardDescription>
      </CardHeader>
      <CardContent className="w-full flex justify-center">
        <CircularGauge
          value={tierInfo.currentGauge}
          maxValue={100}
          size={250}
          strokeWidth={20}
          primaryColor="#53ACFF"
          animate={true}
          animationDuration={1000}
        >
          <div className="text-3xl text-BLUE font-bold">
            {tierInfo.nextTier}
          </div>
          <span className="text-sm mt-1 text-gray-400">
            {expTier.currentExp - tierInfo.preDeadline} / {tierInfo.nextDeadline - tierInfo.preDeadline} EXP
          </span>
        </CircularGauge>
      </CardContent>
      <CardFooter className="flex justify-center items-center w-full">
        <div className="text-center text-lg font-medium">
          총 획득 경험치:
          <span className="text-BLUE ml-1">
            {expTier.currentExp} EXP
          </span>
        </div>
      </CardFooter>
    </Card>
  )
}

export default NextTierInfo