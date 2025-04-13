import NavItem from "@/components/common/navItem"
import { Bot, House, Settings2 } from "lucide-react";

const Navigation = () => {
  return (
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-black shadow-lg rounded-full px-3 sm:px-6 py-1 sm:py-2 flex gap-1 sm:gap-6 z-50 min-w-[213px]">
      <NavItem href="/home" icon={<House size={20} />} label="홈" />
      <NavItem href="/prompt" icon={<Bot size={20} />} label="AI 퀘스트" />
      <NavItem href="/my-status" icon={<Settings2 size={20} />} label="수행능력" />
    </nav>
  )
}

export default Navigation