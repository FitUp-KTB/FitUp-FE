import type { Metadata } from "next";
import "@/styles/globals.css";
import localFont from 'next/font/local'
import { Provider } from "jotai";
import QueryProviders from "@/components/common/query-providers";

const pretendard = localFont({
  src: '../fonts/PretendardVariable.woff2',
  variable: '--font-pretendard',
})

export const metadata: Metadata = {
  title: "Fit-Up!",
  description: "Generated by create next app",
  icons: {
    icon: '/arrow_logo.png', // 또는 '/icon.png'
    shortcut: '/arrow_logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${pretendard.variable} font-pretendard bg-BACKGROUND overflow-x-hidden`}>
        <Provider>
          <QueryProviders>
            {children}
          </QueryProviders>
        </Provider>
      </body>
    </html>
  );
}
