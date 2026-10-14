"use client";

import Link from "next/link";

import { BookOpen, PanelLeftClose, PanelLeftOpen, X } from "lucide-react";

interface SidebarHeaderProps {
  collapsed: boolean;
  toggleCollapsed: () => void;
  setMobileOpen: (open: boolean) => void;
}

export const SidebarHeader = ({
  collapsed,
  toggleCollapsed,
  setMobileOpen,
}: SidebarHeaderProps) => {
  return (
    <div
      className={`mb-8 flex min-h-10 items-center ${
        collapsed ? "flex-col gap-3" : "gap-3"
      }`}
    >
      <Link
        href="/"
        className={`flex min-w-0 items-center gap-3 ${
          collapsed ? "justify-center" : "flex-1"
        }`}
      >
        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[var(--primary)] text-white">
          <BookOpen size={23} />
        </span>

        {!collapsed && (
          <span className="text-xl font-bold tracking-tight text-neutral-900">
            BookNest
          </span>
        )}
      </Link>

      <button
        type="button"
        onClick={toggleCollapsed}
        aria-label={collapsed ? "Expand menu" : "Collapse menu"}
        title={collapsed ? "Expand menu" : "Collapse menu"}
        className="hidden size-8 shrink-0 place-items-center rounded-lg text-neutral-400 transition-all duration-200 ease-out hover:scale-105 hover:bg-neutral-100 hover:text-neutral-900 active:scale-95 md:grid"
      >
        {collapsed ? <PanelLeftOpen size={19} /> : <PanelLeftClose size={19} />}
      </button>

      <button
        type="button"
        onClick={() => setMobileOpen(false)}
        aria-label="Close menu"
        className="grid size-8 shrink-0 place-items-center rounded-lg text-neutral-400 transition-all duration-200 ease-out hover:scale-105 hover:bg-neutral-100 active:scale-95 md:hidden"
      >
        <X size={20} />
      </button>
    </div>
  );
};
