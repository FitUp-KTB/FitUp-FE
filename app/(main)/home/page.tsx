import StatRadarChart from "@/components/home/statRadarChart";
import QuestList from "@/components/home/questList";
import { Calendar } from "@/components/ui/calendar";
import StatChangesChart from "@/components/home/stat-changes-chart";
import TierInfo from "@/components/home/tier-info";

export default function HomePage() {

  // 임시 더미 데이터
  const today = new Date()
  const currentMonth = today.getMonth()
  const currentYear = today.getFullYear()
  const coloredDates = {
    gray: [
      new Date(currentYear, currentMonth, 5),
      new Date(currentYear, currentMonth, 11),
      new Date(currentYear, currentMonth, 12),
      new Date(currentYear, currentMonth, 26)
    ],
    yellow: [
      new Date(currentYear, currentMonth, 2),
      new Date(currentYear, currentMonth, 7),
      new Date(currentYear, currentMonth, 16),
      new Date(currentYear, currentMonth, 24)
    ],
    blue: [
      new Date(currentYear, currentMonth, 3),
      new Date(currentYear, currentMonth, 15),
      new Date(currentYear, currentMonth, 21),
      new Date(currentYear, currentMonth, 1)
    ]
  }

  // API 데이터 핸들링 로직
  // useEffect(() => {
  //   if (apiData.length === 0) return;

  //   const newColoredDates = {
  //     gray: [] as Date[],
  //     yellow: [] as Date[],
  //     blue: [] as Date[]
  //   }

  //   apiData.forEach((quest) => {
  //     const questData = quest.created_at;
  //     const date = new Date(questData);

  //     if (quest.questSucessCount === 1) {
  //       newColoredDates.gray.push(date);
  //     } else if (quest.questSucessCount === 2) {
  //       newColoredDates.yellow.push(date);
  //     } else if (quest.questSucessCount >= 3) {
  //       newColoredDates.blue.push(date);
  //     }
  //   })

  //   setColoredDates(newColoredDates);
  // }, [])



  return (
    <div className="gap-8">
      <Calendar coloredDates={coloredDates} />
      <StatRadarChart />
      <QuestList />
      <StatChangesChart />
      <TierInfo />
    </div>
  )
}
