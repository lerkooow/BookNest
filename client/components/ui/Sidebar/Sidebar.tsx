"use client";

import Link from "next/link";

import { Menu } from "lucide-react";

import { SidebarHeader } from "./SidebarHeader";
import { SidebarFooter } from "./SidebsrFooter";
import { mainLinks, useSidebar } from "./hooks/useSidebar";

export const Sidebar = () => {
  const { collapsed, mobileOpen, setMobileOpen, toggleCollapsed, isActive } =
    useSidebar();

  const renderLinks = (links: typeof mainLinks) =>
    links.map(({ label, href, icon: Icon }) => {
      const active = isActive(href);

      return (
        <Link
          key={href}
          href={href}
          title={collapsed ? label : undefined}
          aria-current={active ? "page" : undefined}
          className={`relative flex min-h-11 items-center gap-3 rounded-xl px-3 text-[13px] font-medium transition-colors ${
            collapsed ? "md:justify-center md:px-0" : ""
          } ${
            active
              ? "bg-[var(--secondary)] text-[var(--text)]"
              : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
          }`}
        >
          {active && (
            <span className="absolute bottom-2 left-0 top-2 w-[3px] rounded-r bg-[var(--secondary)]" />
          )}

          <Icon size={20} className="shrink-0" />

          <span className={collapsed ? "md:hidden" : undefined}>{label}</span>
        </Link>
      );
    });

  return (
    <>
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        aria-label="Open menu"
        aria-expanded={mobileOpen}
        className="fixed left-4 top-4 z-40 grid size-10 place-items-center rounded-xl border border-neutral-200 bg-white text-neutral-800 shadow-sm transition-all duration-200 ease-out hover:scale-105 hover:shadow-md active:scale-95 md:hidden"
      >
        <Menu size={21} />
      </button>

      <div
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ease-in-out md:hidden ${
          mobileOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        onClick={() => setMobileOpen(false)}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-dvh flex-col border-r bg-[#faf9f6] border-neutral-200
           px-3 py-5 will-change-transform transition-[width,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
             collapsed ? "w-[min(260px,100vw)] md:w-[76px]" : "w-[260px]"
           } ${
             mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
           }`}
      >
        <SidebarHeader
          collapsed={collapsed}
          toggleCollapsed={toggleCollapsed}
          setMobileOpen={setMobileOpen}
        />

        <nav
          aria-label="Main navigation"
          className="flex-1 space-y-7 overflow-y-auto overflow-x-hidden"
        >
          <section className="space-y-1">{renderLinks(mainLinks)}</section>
        </nav>
      </aside>
    </>
  );
};
