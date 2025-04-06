import {BaseResponse} from "@/services/api/base/baseResponse";
import {jsonHeader} from "@/services/api/base/headers";
import {SignupRequest, SignupResponse} from "@/dto/signupDTO";

const postSignup = async (reqBody: SignupRequest): Promise<BaseResponse<SignupResponse>> => {
  const response = await fetch(`http://34.47.117.151:8080/api/v1/users`, {
    method: "POST",
    headers: jsonHeader,
    body: JSON.stringify(reqBody)
  });

  return await response.json();
}

export {postSignup};
