import {QuestResponse} from "@/dto/questDTO";

const getQuest = async (dailyResultSeq: number): Promise<BaseResponse<QuestResponse>> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/quests/${dailyResultSeq}`, {
    method: "GET",
    headers: jsonHeaderWithToken,
  });

  return await response.json();
}

export {getQuest};
