import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dumbbell, Silver } from "@/assets/images";
import ShinyTier from "../common/ShinyTier";

const CurrentTierInfo = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Image src={Dumbbell} alt="logo" width={24} height={24} className="border border-black rounded-xl" />
          나의 티어
        </CardTitle>
      </CardHeader>

      <CardContent className="flex justify-center items-center">
        <div className="flex-1">
          <ShinyTier imageSrc={Silver} />
        </div>
        <div className="flex-1">
        </div>
      </CardContent>


      {/* <CardFooter>
      </CardFooter> */}
    </Card>
  )
}

export default CurrentTierInfo;