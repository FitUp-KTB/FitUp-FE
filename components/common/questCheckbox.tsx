import {Checkbox} from "@/components/ui/checkbox";
import {useState} from "react";

interface QuestCheckboxProps {
  questId: string;
  text: string;
  onCheck: (questId: string) => Promise<boolean>;
}

export default function QuestCheckbox({ questId, text, onCheck }: QuestCheckboxProps) {
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    if (isChecked || loading) return; // 이미 체크됐거나 로딩 중이면 실행 안 함

    setLoading(true);
    const success = await onCheck(questId);
    setLoading(false);

    if (success) {
      setIsChecked(true); // ✅ API 성공 시 체크 상태 유지
    }
  };


  return (
    <div className="flex items-center gap-2">
      <Checkbox
        id={questId}
        checked={isChecked}
        onCheckedChange={handleCheck}
        disabled={isChecked || loading}
      />
      <p className="text-sm text-gray-800">{text}</p>
    </div>
  );
}
