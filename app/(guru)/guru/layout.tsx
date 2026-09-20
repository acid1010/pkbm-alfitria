import { redirect } from "next/navigation";

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
    <div className="min-h-screen bg-oxford-50 md:grid md:grid-cols-[auto_minmax(0,1fr)]">
      <Sidebar title="Portal Guru" items={guruMenu} userName={session.user.name} />
      <main className="min-w-0 p-4 md:col-start-2 lg:p-6">{children}</main>
    </div>
  );
}
