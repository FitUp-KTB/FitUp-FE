import {BaseResponse} from "@/services/api/base/baseResponse";
import {QuestAcceptRequest, QuestAcceptResponse} from "@/dto/questDTO";
import {jsonHeaderWithToken} from "@/services/api/base/headers";

const postQuestAccept = async (reqBody: QuestAcceptRequest): Promise<BaseResponse<QuestAcceptResponse>> => {
  const response = await fetch(`https://vivi-o.site/api/v1/quests/accept`, {
    method: "POST",
    headers: jsonHeaderWithToken,
    body: JSON.stringify(reqBody),
  });

  return await response.json();
}

export {postQuestAccept}
