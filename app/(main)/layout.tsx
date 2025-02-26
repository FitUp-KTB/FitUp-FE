import Link from "next/link";

export default function MainLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 헤더 */}
      <header className="bg-WHITE text-BLACK shadow w-full h-16">
        <h1 className="text-2xl p-4">로고</h1>
      </header>

      {/* 사이드바 + 컨텐츠 */}
      <div className="flex flex-1">
        {/* 사이드바 */}
        <aside className="w-24 bg-WHITE text-white p-4  flex flex-col justify-center">
          <ul>
            <li className="mt-2">
              <Link href="/home">🏠</Link>
            </li>
            <li className="mt-2">
              <Link href="/prompt">⚙️</Link>
            </li>
          </ul>
        </aside>

        {/* 컨텐츠 영역 */}
        <main className="flex-1 p-6 bg-BACKGROUND">
          {children}
        </main>
      </div>
    </div>
  );
}

