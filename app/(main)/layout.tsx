import NavItem from "@/components/common/navItem";
import {Bot, House, Settings2} from "lucide-react";
import Image from "next/image";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 헤더 */}
      <header className="bg-WHITE text-BLACK shadow w-full h-16 flex pl-5 pr-5 justify-between">
        <Image src="/images/logo.svg" alt="logo" width={100} height={66}/>
        <Image src="/images/default-profile.svg" alt="profile" width={40} height={40}/>
      </header>

      <div className="flex flex-1">
        {/* 컨텐츠 영역 */}
        <main className="flex-1 p-6 bg-BACKGROUND">
          {children}
        </main>

        {/* Floating Bottom Navigation */}
        <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-black shadow-lg rounded-full px-6 py-2 flex gap-6">
          <NavItem href="/home" icon={<House size={24}/>} label="홈"/>
          <NavItem href="/prompt" icon={<Bot size={24}/>} label="프롬프트"/>
          <NavItem href="/my-status" icon={<Settings2 size={24}/>} label="수행능력"/>
        </nav>

      </div>
    </div>
  );
}

