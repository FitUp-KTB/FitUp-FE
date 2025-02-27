"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker, type ModifiersStyles } from "react-day-picker"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { useSetAtom } from "jotai";
import { recentQuestOverviewAtom } from "@/store/recentQuestOverviewAtom";
import { getQuestOverviews } from "@/services/api/getQuestOverviews";
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./card"

type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  coloredDates?: {
    gray?: Date[];
    yellow?: Date[];
    blue?: Date[];
  }
}

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  // 달력 데이터 상태 관리
  const [coloredDates, setColoredDates] = React.useState<{
    gray: Date[];
    yellow: Date[];
    blue: Date[];
  }>({
    gray: [],
    yellow: [],
    blue: []
  });

  // 색상 지정을 위한 modifiers 설정
  const modifiers = React.useMemo(() => {
    return {
      gray: coloredDates.gray || [],
      yellow: coloredDates.yellow || [],
      blue: coloredDates.blue || [],
    }
  }, [coloredDates])

  // 각 색상별 스타일 정의
  const modifiersStyles: ModifiersStyles = {
    gray: {
      backgroundColor: 'rgba(156, 163, 175, 0.2)', // 퀘스트 1개 완료
      color: '#6b7280'
    },
    yellow: {
      backgroundColor: 'rgba(245, 158, 11, 0.2)', // 퀘스트 2개 완료
      color: '#f59e0b'
    },
    blue: {
      backgroundColor: 'rgba(59, 130, 246, 0.2)', // 퀘스트 3개 이상 완료
      color: '#3b82f6'
    },
  }

  // dailyResultSeq 저장
  const setRecentQuestOverview = useSetAtom(recentQuestOverviewAtom);
  // 퀘스트 리스트 불러오기
  const fetchData = async () => {
    try {
      const response = await getQuestOverviews();
      if (!response.success) {
        throw new Error(response.message)
      }

      // 새로운 coloredDates 객체 생성
      const newColoredDates = {
        gray: [] as Date[],
        yellow: [] as Date[],
        blue: [] as Date[]
      };

      // API 응답 데이터 처리
      if (response.data.quests && Array.isArray(response.data.quests)) {
        // 일별 퀘스트 성공 카운트를 집계하기 위한 맵
        const dateCountMap = new Map();

        response.data.quests.forEach(quest => {
          // createdAt이나 created_at 필드에서 날짜 추출
          const dateStr = quest.createdAt
          if (!dateStr) return;

          // 날짜 문자열을 Date 객체로 변환
          const date = new Date(dateStr);
          if (isNaN(date.getTime())) return; // 유효하지 않은 날짜면 건너뜀

          // 날짜를 YYYY-MM-DD 형식의 키로 변환
          const dateKey = date.toISOString().split('T')[0];

          // 해당 날짜의 카운트 증가
          if (dateCountMap.has(dateKey)) {
            dateCountMap.set(dateKey, dateCountMap.get(dateKey) + 1);
          } else {
            dateCountMap.set(dateKey, 1);
          }

          // dailyResultSeq 저장 (첫 번째 퀘스트에서만)
          if (quest === response.data.quests[0] && quest.dailyResultSeq) {
            setRecentQuestOverview(quest);
          }
        });

        // 날짜별 카운트에 따라 coloredDates 분류
        dateCountMap.forEach((count, dateKey) => {
          const date = new Date(dateKey);

          if (count === 1) {
            newColoredDates.gray.push(date);
          } else if (count === 2) {
            newColoredDates.yellow.push(date);
          } else if (count >= 3) {
            newColoredDates.blue.push(date);
          }
        });

        // 상태 업데이트
        setColoredDates(newColoredDates);
      }

    } catch (error) {
      console.error('퀘스트 데이터 로딩 오류:', error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Card className="w-[37.5%]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          월별 퀘스트 진행도
        </CardTitle>
      </CardHeader>

      <CardContent className="flex justify-center">
        <div className="inline-block">
          <DayPicker
            showOutsideDays={showOutsideDays}
            className={cn("inline-block p-3 rounded-xl bg-white", className)}
            modifiers={modifiers}
            modifiersStyles={modifiersStyles}
            classNames={{
              months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
              month: "space-y-4",
              caption: "flex justify-center pt-1 relative items-center",
              caption_label: "text-sm font-medium",
              nav: "space-x-1 flex items-center",
              nav_button: cn(
                buttonVariants({ variant: "outline" }),
                "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
              ),
              nav_button_previous: "absolute left-1",
              nav_button_next: "absolute right-1",
              table: "w-full border-collapse space-y-1",
              head_row: "flex px-1 space-x-2",
              head_cell:
                "text-muted-foreground rounded-md w-full font-normal text-[0.8rem]",
              row: "flex w-full mt-2",
              cell: cn(
                "relative p-0 m-1 rounded-md text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md",
                props.mode === "range"
                  ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
                  : "[&:has([aria-selected])]:rounded-md"
              ),
              day: cn(
                buttonVariants({ variant: "ghost" }),
                "h-12 w-12 p-0 font-normal aria-selected:opacity-100"
              ),
              day_range_start: "day-range-start",
              day_range_end: "day-range-end",
              day_selected:
                "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
              day_today: "bg-accent text-accent-foreground",
              day_outside:
                "day-outside text-muted-foreground aria-selected:bg-accent/50 aria-selected:text-muted-foreground",
              day_disabled: "text-muted-foreground opacity-50",
              day_range_middle:
                "aria-selected:bg-accent aria-selected:text-accent-foreground",
              day_hidden: "invisible",
              ...classNames,
            }}
            components={{
              IconLeft: ({ className, ...props }) => (
                <ChevronLeft className={cn("h-8 w-8", className)} {...props} />
              ),
              IconRight: ({ className, ...props }) => (
                <ChevronRight className={cn("h-8 w-8", className)} {...props} />
              ),
            }}
            {...props}
          />
          <div className="mt-2 grid grid-cols-3 gap-4 text-md">
            <div className="flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-gray-400 bg-opacity-20 mr-2"></div>
              <span>1개</span>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500 bg-opacity-20 mr-2"></div>
              <span>2개</span>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-blue-500 bg-opacity-20 mr-2"></div>
              <span>3개 이상</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
Calendar.displayName = "Calendar"

export { Calendar }