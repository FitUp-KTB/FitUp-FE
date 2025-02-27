import {QuestCompleteResponse} from "@/dto/questDTO";
import {BaseResponse} from "@/services/api/base/baseResponse";
import {jsonHeaderWithToken} from "@/services/api/base/headers";

const postQuestComplete = async (dailyResultSeq: number, questId: string): Promise<BaseResponse<QuestCompleteResponse>> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/quests/${dailyResultSeq}/${questId}`, {
    method: "POST",
    headers: jsonHeaderWithToken,
  });

  return await response.json();
}

export {postQuestComplete}
