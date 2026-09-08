"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  GraduationCap,
  PanelLeft,
  PanelLeftClose,
  Search,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";

type SidebarItem = {
  href: string;
  label: string;
  section?: string;
  icon?: LucideIcon;
};

type SidebarProps = {
  title: string;
  items: SidebarItem[];
  currentPath?: string;
};

export function Sidebar({ title, items }: SidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [search, setSearch] = useState("");
  const dashboardPath = items[0]?.href;

  const groups = useMemo(() => {
    const query = search.trim().toLowerCase();
    const grouped = new Map<string, SidebarItem[]>();

    for (const item of items) {
      if (query && !item.label.toLowerCase().includes(query)) continue;
      const section = item.section ?? "Menu";
      grouped.set(section, [...(grouped.get(section) ?? []), item]);
    }

    return [...grouped.entries()];
  }, [items, search]);

  return (
    <aside
      className={cn(
        "self-start rounded-2xl border border-slate-200 bg-[#f8f8f9] p-3 shadow-sm transition-[width] duration-200",
        "md:sticky md:top-6 md:max-h-[calc(100vh-3rem)] md:overflow-y-auto",
        collapsed ? "md:w-20" : "md:w-72",
        "w-full",
      )}
    >
      <div className={cn("flex items-center gap-3 px-2 py-2", collapsed && "md:justify-center md:px-0")}>
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-oxford-950 text-gold-400">
          <GraduationCap className="h-5 w-5" />
        </div>
        <div className={cn("min-w-0 flex-1", collapsed && "md:hidden")}>
          <p className="truncate text-sm font-bold text-slate-950">PKBM Al-Fitria</p>
          <p className="truncate text-[10px] font-semibold uppercase tracking-wider text-slate-500">{title}</p>
        </div>
        <button
          type="button"
          aria-label={collapsed ? "Perluas sidebar" : "Ciutkan sidebar"}
          title={collapsed ? "Perluas sidebar" : "Ciutkan sidebar"}
          onClick={() => setCollapsed((current) => !current)}
          className={cn(
            "hidden h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-white hover:text-slate-900 md:flex",
            collapsed && "md:absolute md:right-3 md:top-4",
          )}
        >
          {collapsed ? <PanelLeft className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
        </button>
      </div>

      <div className={cn("relative mt-3", collapsed && "md:hidden")}>
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Cari menu..."
          aria-label="Cari menu"
          className="h-10 w-full rounded-xl border border-slate-200 bg-white pl-9 pr-12 text-sm text-slate-800 outline-none transition focus:border-oxford-400 focus:ring-2 focus:ring-oxford-100"
        />
        <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 rounded-md border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-[10px] font-semibold text-slate-400">
          ⌘ K
        </span>
      </div>

      {collapsed ? (
        <button
          type="button"
          aria-label="Cari menu"
          title="Cari menu"
          onClick={() => setCollapsed(false)}
          className="mt-3 hidden h-10 w-full items-center justify-center rounded-xl text-slate-500 transition-colors hover:bg-white hover:text-slate-900 md:flex"
        >
          <Search className="h-4 w-4" />
        </button>
      ) : null}

      <nav className="mt-5 space-y-5" aria-label={`${title} navigasi`}>
        {groups.length ? groups.map(([section, sectionItems]) => (
          <div key={section}>
            {!collapsed ? (
              <div className="mb-2 flex items-center gap-2 px-2 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
                <span>{section}</span>
                <span className="h-px flex-1 bg-slate-200" />
                <ChevronDown className="h-3 w-3" />
              </div>
            ) : null}
            <ul className="space-y-1">
              {sectionItems.map((item) => {
                const isActive = pathname === item.href ||
                  (item.href !== dashboardPath && pathname.startsWith(`${item.href}/`));
                const Icon = item.icon;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      title={collapsed ? item.label : undefined}
                      className={cn(
                        "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                        collapsed && "md:justify-center md:px-0",
                        isActive
                          ? "border border-slate-200 bg-white font-semibold text-oxford-700 shadow-sm"
                          : "border border-transparent text-slate-600 hover:bg-white hover:text-slate-950",
                      )}
                    >
                      {Icon ? <Icon className={cn("h-4 w-4 shrink-0", isActive ? "text-oxford-600" : "text-slate-400")} /> : null}
                      <span className={cn(collapsed && "md:hidden")}>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        )) : (
          <p className="px-2 text-xs text-slate-500">Menu tidak ditemukan.</p>
        )}
      </nav>
    </aside>
  );
}
