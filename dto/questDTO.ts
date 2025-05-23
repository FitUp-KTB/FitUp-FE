import {QuestData} from "@/model/questData";

// 퀘스트 생성 request
interface QuestCreateRequest {
  mainCategory: string;
  subCategory: string;
  userRequest: string;
  injury?: string;
}

// 퀘스트 생성 response
interface QuestCreateResponse {
  dailyQuest: QuestResponse
}

// 퀘스트 수락 Request
type QuestAcceptRequest = QuestCreateResponse;

// 퀘스트 수락 Response
interface QuestAcceptResponse {
  dailyResultSeq: number;
  dailyQuest: QuestResponse
}

// 퀘스트 리스트 조회 response
interface QuestListResponse {
  quests: QuestOverview[];
}

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

export type {QuestCreateRequest, QuestCreateResponse, QuestAcceptRequest, QuestAcceptResponse, QuestListResponse, QuestResponse, QuestCompleteResponse};
