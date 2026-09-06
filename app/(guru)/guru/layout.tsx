import { redirect } from "next/navigation";
import { Navbar } from "@/components/shared/navbar";
import { Sidebar } from "@/components/shared/sidebar";
import { auth } from "@/lib/auth";

const guruMenu = [
  { href: "/guru", label: "Dashboard" },
  { href: "/guru/nilai", label: "Input Nilai" },
  { href: "/guru/absensi", label: "Rekap Absensi" },
  { href: "/guru/kelas", label: "Data Kelas" },
  { href: "/guru/jadwal", label: "Jadwal Mengajar" },
  { href: "/guru/profil", label: "Profil" },
];

export default async function GuruLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session?.user || session.user.role !== "GURU") {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-oxford-50">
      <Navbar />
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 md:flex-row lg:px-8">
        <Sidebar title="Portal Guru" items={guruMenu} currentPath="/guru" />
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
