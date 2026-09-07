import { redirect } from "next/navigation";
import { PortalHeader } from "@/components/shared/portal-header";
import { Sidebar } from "@/components/shared/sidebar";
import { auth } from "@/lib/auth";


const adminMenu = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/siswa", label: "Manajemen Siswa" },
  { href: "/admin/guru", label: "Manajemen Guru" },
  { href: "/admin/ppdb", label: "Review PPDB" },
  { href: "/admin/akademik", label: "Data Akademik" },
  { href: "/admin/laporan", label: "Laporan" },
  { href: "/admin/settings", label: "Pengaturan" },
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
        <Sidebar title="Portal Admin" items={adminMenu} currentPath="/admin" />
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
