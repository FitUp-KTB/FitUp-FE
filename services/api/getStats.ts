import {StatListResponse} from "@/dto/statDTO";
import {BaseResponse} from "@/services/api/base/baseResponse";
import {jsonContentType} from "@/services/api/base/contentType";

const getStats = async (): Promise<BaseResponse<StatListResponse>> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/stats`, {
    method: "GET",
    headers: jsonContentType,
  });

  return await response.json();
}

export {getStats};
