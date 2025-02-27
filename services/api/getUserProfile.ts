import {jsonHeaderWithToken} from "@/services/api/base/headers";
import {BaseResponse} from "@/services/api/base/baseResponse";
import {UserProfileResponse} from "@/dto/userProfileDTO";

const getUserProfile = async (): Promise<BaseResponse<UserProfileResponse>> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users`, {
    method: "GET",
    headers: jsonHeaderWithToken,
  });

  return await response.json();
}

export { getUserProfile };
