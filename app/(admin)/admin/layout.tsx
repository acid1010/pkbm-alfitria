import {
  BarChart3,
  BookOpen,
  ClipboardCheck,
  FileCheck2,
  GraduationCap,
  LayoutDashboard,
  Settings,
  Users,
} from "lucide-react";
import { redirect } from "next/navigation";

import { PortalHeader } from "@/components/shared/portal-header";
import { Sidebar } from "@/components/shared/sidebar";
import { auth } from "@/lib/auth";


const adminMenu = [
  { href: "/admin", label: "Dashboard", section: "Utama", icon: LayoutDashboard },
  { href: "/admin/siswa", label: "Manajemen Siswa", section: "Akademik", icon: Users },
  { href: "/admin/guru", label: "Manajemen Guru", section: "Akademik", icon: GraduationCap },
  { href: "/admin/akademik", label: "Data Akademik", section: "Akademik", icon: BookOpen },
  { href: "/admin/absensi", label: "Manajemen Absensi", section: "Akademik", icon: ClipboardCheck },
  { href: "/admin/ppdb", label: "Review PPDB", section: "Operasional", icon: FileCheck2 },
  { href: "/admin/laporan", label: "Laporan", section: "Operasional", icon: BarChart3 },
  { href: "/admin/settings", label: "Pengaturan", section: "Sistem", icon: Settings },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-oxford-50">
      <PortalHeader portal="Portal Admin" />
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 md:flex-row lg:px-8">
        <Sidebar title="Portal Admin" items={adminMenu} />
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
