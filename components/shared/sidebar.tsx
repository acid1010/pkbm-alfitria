"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Award,
  BarChart3,
  BookOpen,
  CalendarDays,
  ChevronDown,
  ClipboardCheck,
  FileCheck2,
  FileText,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  PenLine,
  School,
  Search,
  Settings,
  UserCircle,
  Users,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { logoutAction } from "@/components/shared/portal-actions";

const sidebarIcons = {
  Award,
  BarChart3,
  BookOpen,
  CalendarDays,
  ClipboardCheck,
  FileCheck2,
  FileText,
  GraduationCap,
  LayoutDashboard,
  PenLine,
  School,
  Settings,
  UserCircle,
  Users,
};

type SidebarItem = {
  href: string;
  label: string;
  section?: string;
  icon?: string;
};

type SidebarProps = {
  title: string;
  items: SidebarItem[];
  currentPath?: string;
  userName?: string | null;
};

export function Sidebar({ title, items, userName }: SidebarProps) {
  const pathname = usePathname();
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
        "group/sidebar flex w-full self-start flex-col overflow-x-hidden border-r border-white/10 bg-oxford-950 p-3 text-white transition-[width] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
        "md:sticky md:top-0 md:col-start-1 md:row-span-2 md:row-start-1 md:h-screen md:overflow-y-auto",
        "md:w-20 md:hover:w-72 md:focus-within:w-72",
      )}
    >
      <div className="flex items-center gap-3 px-2 py-2 md:px-2">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white p-1.5">
          <Image src="/logo.png" alt="Logo PKBM Al-Fitria" width={28} height={31} priority />
        </div>
        <div className="min-w-0 flex-1 transition-[max-width,opacity] duration-200 md:max-w-0 md:overflow-hidden md:opacity-0 md:delay-0 md:group-hover/sidebar:max-w-48 md:group-hover/sidebar:opacity-100 md:group-hover/sidebar:delay-100 md:group-focus-within/sidebar:max-w-48 md:group-focus-within/sidebar:opacity-100">
          <p className="truncate text-sm font-bold text-white">PKBM Al-Fitria</p>
          <p className="truncate text-xs text-oxford-300">{title}</p>
        </div>
      </div>

      <div className="relative mt-3">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-oxford-400" />
        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Cari menu..."
          aria-label="Cari menu"
          className="h-10 w-full rounded-lg border border-white/10 bg-white/5 pl-9 pr-3 text-sm text-white outline-none transition-opacity duration-200 placeholder:text-oxford-400 focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 md:opacity-0 md:group-hover/sidebar:opacity-100 md:group-hover/sidebar:delay-100 md:group-focus-within/sidebar:opacity-100"
        />
      </div>

      <nav className="mt-5 flex-1 space-y-5" aria-label={`${title} navigasi`}>
        {groups.length ? groups.map(([section, sectionItems]) => (
          <div key={section}>
              <div className="mb-2 flex max-h-8 items-center gap-2 overflow-hidden px-2 text-xs font-semibold text-oxford-400 transition-[max-height,opacity] duration-200 md:max-h-0 md:opacity-0 md:group-hover/sidebar:max-h-8 md:group-hover/sidebar:opacity-100 md:group-hover/sidebar:delay-100 md:group-focus-within/sidebar:max-h-8 md:group-focus-within/sidebar:opacity-100">
                <span>{section}</span>
                <span className="h-px flex-1 bg-white/10" />
                <ChevronDown className="h-3 w-3" aria-hidden="true" />
              </div>
            <ul className="space-y-1">
              {sectionItems.map((item) => {
                const isActive = pathname === item.href ||
                  (item.href !== dashboardPath && pathname.startsWith(`${item.href}/`));
                const Icon = item.icon
                  ? sidebarIcons[item.icon as keyof typeof sidebarIcons]
                  : null;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      title={item.label}
                      className={cn(
                        "flex items-center gap-3 rounded-lg border-l-2 px-3 py-2.5 text-sm font-medium transition-[padding,gap,color,background-color,border-color] duration-300 md:gap-0 md:px-4 md:group-hover/sidebar:gap-3 md:group-hover/sidebar:px-3 md:group-focus-within/sidebar:gap-3 md:group-focus-within/sidebar:px-3",
                        isActive
                          ? "border-gold-400 bg-white/10 font-semibold text-white"
                          : "border-transparent text-oxford-200 hover:bg-white/5 hover:text-white",
                      )}
                    >
                      {Icon ? <Icon className={cn("h-4 w-4 shrink-0", isActive ? "text-gold-400" : "text-oxford-400")} /> : null}
                      <span className="whitespace-nowrap transition-[max-width,opacity] duration-200 md:max-w-0 md:overflow-hidden md:opacity-0 md:group-hover/sidebar:max-w-52 md:group-hover/sidebar:opacity-100 md:group-hover/sidebar:delay-100 md:group-focus-within/sidebar:max-w-52 md:group-focus-within/sidebar:opacity-100">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        )) : (
          <p className="px-2 text-xs text-oxford-300">Menu tidak ditemukan.</p>
        )}
      </nav>

      <div className="mt-6 border-t border-white/10 pt-3">
        <div className="flex items-center gap-3 rounded-lg px-2 py-2">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white p-1.5">
            <Image src="/logo.png" alt="" width={28} height={31} />
          </div>
          <div className="min-w-0 flex-1 transition-[max-width,opacity] duration-200 md:max-w-0 md:overflow-hidden md:opacity-0 md:group-hover/sidebar:max-w-48 md:group-hover/sidebar:opacity-100 md:group-hover/sidebar:delay-100 md:group-focus-within/sidebar:max-w-48 md:group-focus-within/sidebar:opacity-100">
            <p className="truncate text-sm font-semibold text-white">{userName ?? "Pengguna"}</p>
            <p className="text-xs text-oxford-400">{title.replace("Portal ", "")}</p>
          </div>
        </div>
        <form action={logoutAction}>
          <button
            type="submit"
            title="Keluar"
            className={cn(
              "mt-1 flex min-h-10 w-full items-center gap-3 rounded-lg px-3 text-sm font-semibold text-oxford-200 transition-[padding,gap,color,background-color] duration-300 hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 md:gap-0 md:px-4 md:group-hover/sidebar:gap-3 md:group-hover/sidebar:px-3 md:group-focus-within/sidebar:gap-3 md:group-focus-within/sidebar:px-3",
            )}
          >
            <LogOut className="h-4 w-4 shrink-0" />
            <span className="whitespace-nowrap transition-[max-width,opacity] duration-200 md:max-w-0 md:overflow-hidden md:opacity-0 md:group-hover/sidebar:max-w-20 md:group-hover/sidebar:opacity-100 md:group-hover/sidebar:delay-100 md:group-focus-within/sidebar:max-w-20 md:group-focus-within/sidebar:opacity-100">Keluar</span>
          </button>
        </form>
      </div>
    </aside>
  );
}
