import {
  Award,
  CalendarDays,
  ClipboardCheck,
  FileText,
  LayoutDashboard,
  UserCircle,
} from "lucide-react";
import { redirect } from "next/navigation";

import { PortalHeader } from "@/components/shared/portal-header";
import { Sidebar } from "@/components/shared/sidebar";
import { auth } from "@/lib/auth";


const siswaMenu = [
  { href: "/siswa", label: "Dashboard", section: "Utama", icon: LayoutDashboard },
  { href: "/siswa/nilai", label: "Nilai", section: "Akademik", icon: Award },
  { href: "/siswa/absensi", label: "Absensi", section: "Akademik", icon: ClipboardCheck },
  { href: "/siswa/jadwal", label: "Jadwal", section: "Akademik", icon: CalendarDays },
  { href: "/siswa/dokumen", label: "Dokumen", section: "Layanan", icon: FileText },
  { href: "/siswa/profil", label: "Profil", section: "Akun", icon: UserCircle },
];

export default async function SiswaLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session?.user || session.user.role !== "SISWA") {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-oxford-50">
      <PortalHeader portal="Portal Siswa" />
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 md:flex-row lg:px-8">
        <Sidebar title="Portal Siswa" items={siswaMenu} />
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
