import { QuestTierResponse } from "@/dto/questTierDTO";
import { jsonHeaderWithToken } from "./base/headers";

export const getQuestTier = async (): Promise<QuestTierResponse> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/quests/tier`, {
      method: "GET",
      headers: jsonHeaderWithToken,
    });
    if (!response.ok) {
      throw new Error("");
    }
    console.log(response);
    const result = await response.json();
    console.log(result);
    return result.data
  } catch (error) {
    console.error("quests/tier 요청 에러:", error);
    throw error;
  }
};