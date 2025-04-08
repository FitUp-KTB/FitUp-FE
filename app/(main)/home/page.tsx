import StatRadarChart from "@/components/home/statRadarChart";
import QuestList from "@/components/home/questList";
import { Calendar } from "@/components/ui/calendar";
import StatChangesChart from "@/components/home/stat-changes-chart";
import NextTierInfo from "@/components/home/next-tier-info";
import CurrentTierInfo from "@/components/home/current-tier-info";
import UserInfoCard from "@/components/common/user-info-card";

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* 첫 번째 행 - 높이 414px */}
        <div className="md:col-span-4 lg:col-span-4 h-[414px]">
          <CurrentTierInfo />
        </div>
        <div className="md:col-span-4 lg:col-span-4 h-[414px]">
          <StatRadarChart />
        </div>
        <div className="md:col-span-4 lg:col-span-4 h-[414px]">
          <NextTierInfo />
        </div>

        {/* 두 번째 행 - 높이 540px */}
        <div className="md:col-span-6 lg:col-span-6 h-[540px]">
          <StatChangesChart />
        </div>
        <div className="md:col-span-3 lg:col-span-3 h-[540px]">
          <Calendar />
        </div>
        <div className="md:col-span-3 lg:col-span-3 h-[540px]">
          <QuestList />
        </div>

        {/* 세 번째 행 - 높이 282px */}
        <div className="col-span-1 md:col-span-12 h-[282px]">
          <UserInfoCard />
        </div>
      </div>
    </div>
  )
}