interface BaseResponse<T> {
  code: string;
  message: string;
  responseAt: string;
  success: boolean;
  data: T;
}

export type {BaseResponse};
