import { redirect } from "next/navigation";
import { PortalHeader } from "@/components/shared/portal-header";
import { Sidebar } from "@/components/shared/sidebar";
import { auth } from "@/lib/auth";


const siswaMenu = [
  { href: "/siswa", label: "Dashboard" },
  { href: "/siswa/nilai", label: "Nilai" },
  { href: "/siswa/absensi", label: "Absensi" },
  { href: "/siswa/jadwal", label: "Jadwal" },
  { href: "/siswa/dokumen", label: "Dokumen" },
  { href: "/siswa/profil", label: "Profil" },
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
        <Sidebar title="Portal Siswa" items={siswaMenu} currentPath="/siswa" />
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
