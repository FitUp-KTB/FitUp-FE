import {BaseResponse} from "@/services/api/base/baseResponse";
import {QuestAcceptRequest, QuestAcceptResponse} from "@/dto/questDTO";
import {jsonHeaderWithToken} from "@/services/api/base/headers";

const postQuestAccept = async (reqBody: QuestAcceptRequest): Promise<BaseResponse<QuestAcceptResponse>> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/quests/accept`, {
    method: "POST",
    headers: jsonHeaderWithToken,
    body: JSON.stringify(reqBody),
  });

  return await response.json();
}

export {postQuestAccept}
