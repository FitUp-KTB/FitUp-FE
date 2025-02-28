export interface ApiResponse<T> {
  code: string;
  message: string;
  responseAt: string;
  data: T;
  success: boolean;
}

export interface UserProfileResponse {
  email: string;
  name: string;
  nickName: string;
  stat: UserStat;
}

export interface UserStat {
  createdAt: string;
  updatedAt: string;
  userStatSeq: number | null;
  user: User | null;
  height: number;
  weight: number;
  fat: number;
  muscleMass: number;
  pushUps: number;
  sitUp: number;
  runningPace: number;
  runningTime: number;
  squat: number;
  benchPress: number;
  deadLift: number;
}

export interface User {
  createdAt: string;
  updatedAt: string;
  userId: string;
  email: string;
  password: string;
  nickname: string;
  name: string;
  gender: "MALE" | "FEMALE" | string;
  goal: string;
  chronic: string;
  targetWeight: number;
  birthDate: string;
}