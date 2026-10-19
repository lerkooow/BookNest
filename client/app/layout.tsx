import type { Metadata } from "next";
import { Suspense } from "react";

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
        <Suspense
          fallback={
            <aside
              aria-hidden="true"
              className="fixed inset-y-0 left-0 hidden w-[260px] border-r border-neutral-200 bg-[#faf9f6] md:block"
            />
          }
        >
          <Sidebar />
        </Suspense>
        <main className="min-h-screen pt-16 transition-[margin-left] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] md:ml-[var(--sidebar-width)] md:pt-0">
          {children}
        </main>
      </body>
    </html>
  );
}
