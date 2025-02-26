import {Button} from "@/components/ui/button";
import Quest from "@/model/quest";
import Image from "next/image";
import {Color} from "@kurkle/color";
import {COLORS} from "@/styles/colors";

interface QuestItemProps {
  quest: Quest;
  type: "fitness" | "sleep" | "daily";
  onFinish: (questId: string) => Promise<void>;
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
    await onFinish(quest.questId);
  }

  return (
    <div className="flex flex-row items-center gap-2">
      <div className={`w-10 h-10 ${quest.success ? "bg-gradient-to-r from-purple-300 to-purple-500"  : "bg-BACKGROUND"} rounded-full flex items-center justify-center shadow-lg mb-1`}>
        <Image src={iconSrc()} alt="icon" width={24} height={24}/>
      </div>
      <p>{quest.content}</p>
      <div className="flex-1" />
      <Button
        className={`
        ${quest.success ? "bg-GRAY": "bg-BLACK"}
        `}
        disabled={quest.success}
        onClick={handleFinish}
      >
        {quest.success ? "완료됨" : "완료"}
      </Button>
    </div>
  )
}
