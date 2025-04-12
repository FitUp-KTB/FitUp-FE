import {BaseResponse} from "@/services/api/base/baseResponse";
import {jsonHeaderWithToken} from "@/services/api/base/headers";
import {UserAdditionalProfileRequest} from "@/dto/userProfileDTO";

const postUserAdditionalProfile = async (reqBody: UserAdditionalProfileRequest): Promise<BaseResponse<void>> => {
  const response = await fetch(`https://dev.fitup.space/api/v1/users/profile`, {
    method: "POST",
    headers: jsonHeaderWithToken,
    body: JSON.stringify(reqBody)
  });

  return await response.json();
}

export {postUserAdditionalProfile};
