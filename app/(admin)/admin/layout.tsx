import { redirect } from "next/navigation";

import { Sidebar } from "@/components/shared/sidebar";
import { auth } from "@/lib/auth";


const adminMenu = [
  { href: "/admin", label: "Dashboard", section: "Utama", icon: "LayoutDashboard" },
  { href: "/admin/siswa", label: "Manajemen Siswa", section: "Akademik", icon: "Users" },
  { href: "/admin/guru", label: "Manajemen Guru", section: "Akademik", icon: "GraduationCap" },
  { href: "/admin/akademik", label: "Data Akademik", section: "Akademik", icon: "BookOpen" },
  { href: "/admin/absensi", label: "Manajemen Absensi", section: "Akademik", icon: "ClipboardCheck" },
  { href: "/admin/ppdb", label: "Review PPDB", section: "Operasional", icon: "FileCheck2" },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-oxford-50 md:grid md:grid-cols-[auto_minmax(0,1fr)]">
      <Sidebar title="Portal Admin" items={adminMenu} userName={session.user.name} />
      <main className="min-w-0 p-4 md:col-start-2 lg:p-6">{children}</main>
    </div>
  );
}
