"use client";

import Link from "next/link";

import { Settings, UserRound, X } from "lucide-react";

interface SidebarFooterProps {
  collapsed: boolean;
  isActive: (href: string) => boolean;
}

export const SidebarFooter = ({ collapsed, isActive }: SidebarFooterProps) => {
  return (
    <div className="shrink-0 border-t border-neutral-200 pt-3">
      <Link
        href="/settings"
        className={`flex min-h-11 items-center gap-3 rounded-xl px-3 text-[13px] font-medium transition hover:scale-102 ${
          collapsed ? "justify-center px-0" : ""
        } ${isActive("/settings") ? "bg-[var(--secondary)] text-[var(--text)]" : ""}`}
      >
        <Settings size={20} className="shrink-0" />
        {!collapsed && <span>Settings</span>}
      </Link>

      <div
        className={`mt-3 flex items-center gap-3 border-t border-neutral-100 px-1 pt-4 ${
          collapsed ? "justify-center" : ""
        }`}
      >
        <div className="grid size-9 shrink-0 place-items-center rounded-full border border-neutral-200 bg-[var(--primary)] text-[var(--text-secondary)]">
          <UserRound size={20} />
        </div>

        {!collapsed && (
          <div className="min-w-0">
            <p className="truncate text-xs font-semibold text-[var(--text)]">
              My Profile
            </p>
            <p className="mt-1 text-[11px] text-[var(--primary)]">Book Lover</p>
          </div>
        )}
      </div>
    </div>
  );
};
