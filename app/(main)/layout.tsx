import Header from "@/components/common/header";
import Navigation from "@/components/common/Navigation";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 헤더 */}
      <Header />

      <div className="flex flex-1">
        {/* 컨텐츠 영역 */}
        <main className="flex-1 p-6 bg-BACKGROUND">
          {children}
        </main>

        {/* Floating Bottom Navigation */}
        <Navigation />
      </div>
    </div>
  );
}

