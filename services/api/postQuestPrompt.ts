import {QuestCreateRequest, QuestCreateResponse} from "@/dto/questDTO";
import {jsonHeaderWithToken} from "@/services/api/base/headers";
import {BaseResponse} from "@/services/api/base/baseResponse";

const postQuestPrompt = async (reqBody: QuestCreateRequest): Promise<BaseResponse<QuestCreateResponse>> => {
  const response = await fetch(`https://vivi-o.site/api/v1/quests`, {
    method: "POST",
    headers: jsonHeaderWithToken,
    body: JSON.stringify(reqBody),
  });
  console.log(reqBody)

  return await response.json();
}

export {postQuestPrompt}
