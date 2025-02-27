import {BaseResponse} from "@/services/api/base/baseResponse";
import {LoginRequest, LoginResponse} from "@/dto/loginDTO";
import {jsonContentType} from "@/services/api/base/contentType";

const postLogin = async (reqBody: LoginRequest): Promise<BaseResponse<LoginResponse>> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/token`, {
    method: "POST",
    headers: jsonContentType,
    body: JSON.stringify(reqBody)
  });

  return await response.json();
}

export {postLogin};
