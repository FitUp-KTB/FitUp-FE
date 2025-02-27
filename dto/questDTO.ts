import {QuestData} from "@/model/questData";

// 퀘스트 생성 request
interface QuestCreateRequest {
  main_category: string;
  sub_category: string;
  user_request: string;
}

// 퀘스트 생성 response
interface QuestCreateResponse {
  dailyResultSeq: number;
  dailyQuest: QuestResponse
}

// 퀘스트 리스트 조회 response
type QuestListResponse = QuestOverview[]

// 퀘스트 상세 조회 response
type QuestResponse = QuestData;

// 퀘스트 수행 response
interface QuestCompleteResponse {
  dailyResultSeq: number;
  questId: string;
  questSuccessCount: number;
  questStatus: string;
  updatedAt: string;
}

export type {QuestCreateRequest, QuestCreateResponse, QuestListResponse, QuestResponse, QuestCompleteResponse};
