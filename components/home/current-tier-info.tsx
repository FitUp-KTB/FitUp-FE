import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Silver } from "@/assets/images";
import ShinyTier from "../common/ShinyTier";

const CurrentTierInfo = () => {
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
            Silver
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default CurrentTierInfo;