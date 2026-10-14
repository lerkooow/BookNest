"use client";

import { BookOpen, ChartPie, Library } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export const mainLinks = [
  { label: "Library", href: "/", icon: Library },
  { label: "Add my books", href: "/add-books", icon: BookOpen },
  { label: "Statistics", href: "/statistics", icon: ChartPie },
];

export const useSidebar = () => {
  const pathname = usePathname();

  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setCollapsed(localStorage.getItem("booknest-sidebar-collapsed") === "true");
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  function toggleCollapsed() {
    setCollapsed((current) => {
      const next = !current;

      try {
        localStorage.setItem("booknest-sidebar-collapsed", String(next));
      } catch {}

      return next;
    });
  }

  const isActive = (href: string) => {
    return href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);
  };

  return { collapsed, mobileOpen, setMobileOpen, toggleCollapsed, isActive };
};
