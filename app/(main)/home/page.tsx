import StatRadarChart from "@/components/home/statRadarChart";
import QuestList from "@/components/home/questList";
import { Calendar } from "@/components/ui/calendar";
import StatChangesChart from "@/components/home/stat-changes-chart";
import NextTierInfo from "@/components/home/next-tier-info";
import CurrentTierInfo from "@/components/home/current-tier-info";
import UserInfoCard from "@/components/common/user-info-card";

export default function HomePage() {
  return (
    <div className="">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-5">
          <CurrentTierInfo />
        </div>
        <div className="md:col-span-4">
          <StatRadarChart />
        </div>
        <div className="md:col-span-3">
          <NextTierInfo />
        </div>

        <div className="md:col-span-8">
          <StatChangesChart />
        </div>
        <div className="md:col-span-4">
          <Calendar />
        </div>

        <div className="md:col-span-4">
          <QuestList />
        </div>
        <div className="md:col-span-8">
          <UserInfoCard />
        </div>
      </div>
    </div>
  )
}