import {jsonHeaderWithToken} from "@/services/api/base/headers";
import {BaseResponse} from "@/services/api/base/baseResponse";
import {UserProfileResponse} from "@/dto/userProfileDTO";

const getUserProfile = async (): Promise<BaseResponse<UserProfileResponse>> => {
  const response = await fetch(`https://vivi-o.site/api/v1/users`, {
    method: "GET",
    headers: jsonHeaderWithToken,
  });

  return await response.json();
}

export { getUserProfile };
