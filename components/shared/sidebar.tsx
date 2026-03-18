import Link from "next/link";
import { cn } from "@/lib/utils";

type SidebarItem = {
  href: string;
  label: string;
};

type SidebarProps = {
  title: string;
  items: SidebarItem[];
  currentPath?: string;
};

export function Sidebar({ title, items, currentPath }: SidebarProps) {
  return (
    <aside className="w-full rounded-3xl border border-oxford-100 bg-white p-5 shadow-sm md:w-72 md:p-6">
      <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-gold-700">{title}</h2>
      <ul className="space-y-1">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={cn(
                "block rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200",
                currentPath?.startsWith(item.href)
                  ? "bg-oxford-900 text-gold-100 shadow-sm hover:bg-oxford-800"
                  : "text-oxford-700 hover:bg-oxford-50 hover:text-oxford-900",
              )}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
