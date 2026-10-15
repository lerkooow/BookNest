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
        <main className="min-h-screen md:ml-[260px]">{children}</main>
      </body>
    </html>
  );
}
