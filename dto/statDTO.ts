// 회원 정보 반영 request
import {Stat} from "@/model/stat";

interface StatUpdateRequest {
  height?: number;
  weight?: number;
  muscleMass?: number;
  bodyFat?: number;
  pushUps?: number;
  sitUps?: number;
  runningPace?: number;
  runningTime?: number;
  squat?: number;
  benchPress?: number;
  deadlift?: number;
}

// 회원 정보 반영 response
type StatUpdateResponse = Stat;

// 회원 스탯 조회 response
interface StatListResponse {
  stats: Stat[];
}


export type {StatUpdateRequest, StatUpdateResponse, StatListResponse};
