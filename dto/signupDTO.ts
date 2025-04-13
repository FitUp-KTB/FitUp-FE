interface SignupRequest {
  email : string;
  password : string;
  name : string;
  gender : string;
}

interface SignupResponse {
  userId: string;
  accessToken: string;
  refreshToken: string;
}

export type {SignupRequest, SignupResponse}
