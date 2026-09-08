import { redirect } from "next/navigation";

import { PortalHeader } from "@/components/shared/portal-header";
import { Sidebar } from "@/components/shared/sidebar";
import { auth } from "@/lib/auth";


const guruMenu = [
  { href: "/guru", label: "Dashboard", section: "Utama", icon: "LayoutDashboard" },
  { href: "/guru/jadwal", label: "Jadwal Mengajar", section: "Pembelajaran", icon: "CalendarDays" },
  { href: "/guru/kelas", label: "Data Kelas", section: "Pembelajaran", icon: "School" },
  { href: "/guru/nilai", label: "Input Nilai", section: "Pembelajaran", icon: "PenLine" },
  { href: "/guru/absensi", label: "Rekap Absensi", section: "Pembelajaran", icon: "ClipboardCheck" },
  { href: "/guru/profil", label: "Profil", section: "Akun", icon: "UserCircle" },
];

export default async function GuruLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session?.user || session.user.role !== "GURU") {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-oxford-50">
      <PortalHeader portal="Portal Guru" />
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 md:flex-row lg:px-8">
        <Sidebar title="Portal Guru" items={guruMenu} />
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
