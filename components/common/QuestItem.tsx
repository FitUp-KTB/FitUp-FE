import {Button} from "@/components/ui/button";
import {Quest} from "@/model/quest";
import Image from "next/image";

interface QuestItemProps {
  quest: Quest;
  type: "fitness" | "sleep" | "daily";
  onFinish?: (questId: string) => Promise<void>;
}

export default function QuestItem({quest, type, onFinish}: QuestItemProps) {
  const iconSrc = (): string => {
    switch (type) {
      case "fitness":
        return "/images/run.svg";
      case "sleep":
        return "/images/bed.svg";
      case "daily":
        return "/images/house.svg";
    }
  }

  const handleFinish = async () => {
    if (!onFinish) return;

    await onFinish(quest.questId);
  }

  return (
    <div className="flex flex-row items-center gap-2">
      <div className={`w-10 h-10 ${quest.isSuccess ? "bg-gradient-to-r from-purple-300 to-purple-500"  : "bg-BACKGROUND"} rounded-full flex items-center justify-center shadow-lg mb-1`}>
        <Image src={iconSrc()} alt="icon" width={24} height={24}/>
      </div>
      <p>{quest.content}</p>
      <div className="flex-1" />
      {onFinish && (
        <Button
          className={`
        ${quest.isSuccess ? "bg-GRAY": "bg-BLACK"}
        `}
          disabled={quest.isSuccess}
          onClick={handleFinish}
        >
          {quest.isSuccess ? "완료됨" : "완료"}
        </Button>
      )}
    </div>
  )
}
