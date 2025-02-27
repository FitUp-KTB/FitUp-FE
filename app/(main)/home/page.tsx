import StatRadarChart from "@/components/home/statRadarChart";
import QuestList from "@/components/home/questList";
import { Calendar } from "@/components/ui/calendar";
import StatChangesChart from "@/components/home/stat-changes-chart";
import NextTierInfo from "@/components/home/next-tier-info";
import CurrentTierInfo from "@/components/home/current-tier-info";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-6">
      {/* 첫번째 줄 */}
      <div className="w-full flex flex-wrap gap-6">
        <CurrentTierInfo />
        <StatRadarChart />
        <NextTierInfo />
      </div>

      {/* 두번째 줄 */}
      <div className="w-full flex flex-wrap gap-6">
        <StatChangesChart />
        <Calendar />
        <QuestList />
      </div>
    </div>
  )
}