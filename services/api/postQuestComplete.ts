import { QuestCompleteResponse } from "@/dto/questDTO";
import { BaseResponse } from "@/services/api/base/baseResponse";
import { jsonHeaderWithToken } from "@/services/api/base/headers";

const postQuestComplete = async (dailyResultSeq: number, questId: string): Promise<BaseResponse<QuestCompleteResponse>> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/quests/${dailyResultSeq}/${questId}`, {
    method: "POST",
    headers: jsonHeaderWithToken(),
  });

  return await response.json();
}

export { postQuestComplete }
