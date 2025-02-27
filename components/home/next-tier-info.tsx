import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import CircularGauge from "../ui/circular-gauge"
import Dumbbell from "@/assets/images/dumbbell.png"

const NextTierInfo = () => {
  return (
    <Card className="inline-block">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Image src={Dumbbell} alt="logo" width={24} height={24} className="border border-black rounded-xl" />
          다음 달 예정 티어
        </CardTitle>
        <CardDescription>
          다음 티어까지 남은 EXP 현황
        </CardDescription>
      </CardHeader>
      <CardContent>
        <CircularGauge
          value={65}                           // 현재 값 (0-100)
          maxValue={100}                       // 최대값 (기본값: 100)
          size={250}                           // 크기 (픽셀 단위, 기본값: 200)
          strokeWidth={20}                     // 선 두께 (픽셀 단위, 기본값: 15)
          primaryColor="#53ACFF"               // 진행 바 색상
          animate={true}                       // 애니메이션 사용 여부
          animationDuration={1000}             // 애니메이션 지속 시간(ms)
        >
          <CardTitle className="text-3xl text-BLUE">
            Silver
          </CardTitle>
          <span className="text-sm mt-1 text-gray-400">25 / 30 EXP</span>
        </CircularGauge>
      </CardContent>
      <CardFooter className="flex justify-center">
      </CardFooter>

    </Card>
  )
}

export default NextTierInfo
