import {BaseResponse} from "@/model/baseResponse";
import {LoginRequest, LoginResponse} from "@/dto/loginDTO";

const jsonContentType = {"content-type": "application/json"};

const postLogin = async (reqBody: LoginRequest): Promise<BaseResponse<LoginResponse>> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/token`, {
    method: "POST",
    headers: jsonContentType,
    body: JSON.stringify(reqBody)
  });

  return await response.json();
}

export {postLogin};
