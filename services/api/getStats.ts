import { StatListResponse } from "@/dto/statDTO";
import { BaseResponse } from "@/services/api/base/baseResponse";
import { jsonHeaderWithToken } from "@/services/api/base/headers";

const getStats = async (): Promise<BaseResponse<StatListResponse>> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/stats`, {
    method: "GET",
    headers: jsonHeaderWithToken,
  });

  return await response.json();
}

export { getStats };
