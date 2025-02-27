import {StatUpdateRequest, StatUpdateResponse} from "@/dto/statDTO";
import {BaseResponse} from "@/services/api/base/baseResponse";
import {jsonContentType} from "@/services/api/base/contentType";

const postStat = async (reqBody: StatUpdateRequest): Promise<BaseResponse<StatUpdateResponse>> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/stats`, {
    method: "POST",
    headers: jsonContentType,
    body: JSON.stringify(reqBody)
  });

  return await response.json();
}

export {postStat};
