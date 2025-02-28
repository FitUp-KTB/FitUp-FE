import StatRadarChart from "@/components/home/statRadarChart";
import QuestList from "@/components/home/questList";
import { Calendar } from "@/components/ui/calendar";
import StatChangesChart from "@/components/home/stat-changes-chart";
import NextTierInfo from "@/components/home/next-tier-info";
import CurrentTierInfo from "@/components/home/current-tier-info";
import UserInfoCard from "@/components/common/user-info-card";


export default function HomePage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="w-full flex flex-wrap gap-6">
        <CurrentTierInfo />
        <StatRadarChart />
        <NextTierInfo />
      </div>

      <div className="w-full flex flex-wrap gap-6">
        <StatChangesChart />
        <Calendar />
        <QuestList />
        <UserInfoCard />
      </div>
    </div>
  )
}