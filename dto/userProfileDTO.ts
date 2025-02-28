interface ApiResponse<T> {
  code: string;
  message: string;
  responseAt: string;
  data: T;
  success: boolean;
}

interface UserProfileResponse {
  email: string;
  name: string;
  nickName: string;
  height: number;
  weight: number;
  bodyFat: number;
  pushUps: number;
  sitUps: number;
  runningPace: number;
  runningTime: number;
  squat: number;
  benchPress: number;
  deadLift: number;
  muscleMass: number;
}

export type { ApiResponse, UserProfileResponse };