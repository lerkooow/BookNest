import type { Metadata } from "next";

import { Sidebar } from "@/components/ui/Sidebar/Sidebar";

import "./globals.css";

export const metadata: Metadata = {
  title: "BookNest",
  description: "Your personal book management app",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>
        <Sidebar />
        <main className="min-h-screen md:ml-[260px]">{children}</main>
      </body>
    </html>
  );
}
