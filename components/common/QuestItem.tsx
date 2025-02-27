import { Button } from "@/components/ui/button";
import { Quest } from "@/model/quest";
import Image from "next/image";
import { Run, Bed, House } from "@/assets/images"; // 실제 export 위치에 맞게 수정


interface QuestItemProps {
  quest: Quest;
  type: "fitness" | "sleep" | "daily";
  onFinish: (questId: string) => Promise<void>;
}

export default function QuestItem({ quest, type, onFinish }: QuestItemProps) {
  const handleFinish = async () => {
    await onFinish(quest.questId);
  }

  // 그리고 iconSrc 함수 대신 직접 컴포넌트 사용
  return (
    <div className="flex flex-row items-center gap-2">
      <div className={`w-10 h-10 ${quest.isSuccess ? "bg-gradient-to-r from-purple-300 to-purple-500" : "bg-BACKGROUND"} rounded-full flex items-center justify-center shadow-lg mb-1`}>
        {type === "fitness" && <Image src={Run} alt="icon" width={24} height={24} />}
        {type === "sleep" && <Image src={Bed} alt="icon" width={24} height={24} />}
        {type === "daily" && <Image src={House} alt="icon" width={24} height={24} />}
      </div>
      <p>{quest.content}</p>
      <div className="flex-1" />
      <Button
        className={`${quest.isSuccess ? "bg-GRAY" : "bg-BLACK"}`}
        disabled={quest.isSuccess}
        onClick={handleFinish}
      >
        {quest.isSuccess ? "완료됨" : "완료"}
      </Button>
    </div>
  )
}
