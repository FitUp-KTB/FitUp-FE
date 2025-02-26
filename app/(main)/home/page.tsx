import StatRadarChart from "@/components/home/statRadarChart";
import QuestList from "@/components/home/questList";

export default function HomePage() {
  return (
    <div className="flex flex-row gap-8">
      <StatRadarChart/>
      <QuestList/>
    </div>
  );
}
