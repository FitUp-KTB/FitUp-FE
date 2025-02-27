import {BaseResponse} from "@/services/api/base/baseResponse";
import {jsonHeaderWithToken} from "@/services/api/base/headers";
import {QuestListResponse} from "@/dto/questDTO";

const getQuestOverviews = async (): Promise<BaseResponse<QuestListResponse>> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/quests`, {
    method: "GET",
    headers: jsonHeaderWithToken,
  });

  return await response.json();
}

export {getQuestOverviews};
