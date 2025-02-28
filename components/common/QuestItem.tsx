import { Button } from "@/components/ui/button";
import { Quest } from "@/model/quest";
import Image from "next/image";
import { Run, Bed, House } from "@/assets/images"; // 실제 export 위치에 맞게 수정


interface QuestItemProps {
  quest: Quest;
  type: "fitness" | "sleep" | "daily";
  onFinish?: (questId: string) => Promise<void>;
}

export default function QuestItem({ quest, type, onFinish }: QuestItemProps) {
  const handleFinish = async () => {
    if (!onFinish) return;

    await onFinish(quest.questId);
  }

  // 그리고 iconSrc 함수 대신 직접 컴포넌트 사용
  return (
    <div className="flex flex-wrap items-center gap-2 py-2">
      <div className={`w-10 h-10 flex-none shadow-xl ${quest.isSuccess ? "bg-gradient-to-r from-BLUE to-MALIBU" : "bg-BACKGROUND"} rounded-full flex items-center justify-center shadow-lg mb-1`}>
        {type === "fitness" && <Image src={Run} alt="icon" width={24} height={24} />}
        {type === "sleep" && <Image src={Bed} alt="icon" width={24} height={24} />}
        {type === "daily" && <Image src={House} alt="icon" width={24} height={24} />}
      </div>

      <p className="flex-1 min-w-0 break-words text-sm text-gray-600">{quest.content}</p>

      {onFinish && (
        <Button
          className={`min-w-5 flex-none hover:bg-gray-500 ease-in shadow-lg ${quest.isSuccess ? "bg-GRAY text-gray-300" : "bg-MALIBU"} px-3 `}
          disabled={quest.isSuccess}
          onClick={handleFinish}
        >
          +{quest.exp}exp
        </Button>
      )}
    </div>


  )
}
