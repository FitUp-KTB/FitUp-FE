import {QuestResponse} from "@/dto/questDTO";
import {jsonHeaderWithToken} from "@/services/api/base/headers";
import {BaseResponse} from "@/services/api/base/baseResponse";

const getQuest = async (dailyResultSeq: number): Promise<BaseResponse<QuestResponse>> => {
  const response = await fetch(`https://vivi-o.site/api/v1/quests/${dailyResultSeq}`, {
    method: "GET",
    headers: jsonHeaderWithToken,
  });

  return await response.json();
}

export {getQuest};
