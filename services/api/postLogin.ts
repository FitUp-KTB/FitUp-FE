import { BaseResponse } from "@/services/api/base/baseResponse";
import { LoginRequest, LoginResponse } from "@/dto/loginDTO";
import { jsonHeader } from "@/services/api/base/headers";

const postLogin = async (reqBody: LoginRequest): Promise<BaseResponse<LoginResponse>> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/users/token`, {
    method: "POST",
    headers: jsonHeader,
    body: JSON.stringify(reqBody)
  });

  return await response.json();
}

export { postLogin };
