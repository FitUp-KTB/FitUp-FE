import { StatUpdateRequest, StatUpdateResponse } from "@/dto/statDTO";
import { BaseResponse } from "@/services/api/base/baseResponse";
import { jsonHeaderWithToken } from "@/services/api/base/headers";

const postStat = async (reqBody: StatUpdateRequest): Promise<BaseResponse<StatUpdateResponse>> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/stats`, {
    method: "POST",
    headers: jsonHeaderWithToken,
    body: JSON.stringify(reqBody)
  });

  return await response.json();
}

export { postStat };
