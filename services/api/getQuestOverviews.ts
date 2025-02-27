import {BaseResponse} from "@/services/api/base/baseResponse";
import {jsonHeaderWithToken} from "@/services/api/base/headers";
import {QuestListResponse} from "@/dto/questDTO";

const getQuestOverviews = async (): Promise<BaseResponse<QuestListResponse>> => {
  const response = await fetch(`https://vivi-o.site/api/v1/quests`, {
    method: "GET",
    headers: jsonHeaderWithToken,
  });

  return await response.json();
}

export {getQuestOverviews};
