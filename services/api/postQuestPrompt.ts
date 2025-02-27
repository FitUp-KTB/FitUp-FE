import {QuestCreateRequest, QuestCreateResponse} from "@/dto/questDTO";
import {jsonHeaderWithToken} from "@/services/api/base/headers";
import {BaseResponse} from "@/services/api/base/baseResponse";

const postQuestPrompt = async (reqBody: QuestCreateRequest): Promise<BaseResponse<QuestCreateResponse>> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/quests`, {
    method: "POST",
    headers: jsonHeaderWithToken,
    body: JSON.stringify(reqBody),
  });

  return await response.json();
}

export {postQuestPrompt}
