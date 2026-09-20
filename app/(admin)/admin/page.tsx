import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { StatCard } from "@/components/shared/stat-card";
import { DataTable } from "@/components/shared/data-table";
import { adminPpdbColumns } from "@/components/shared/admin-ppdb-columns";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminQuickActions } from "@/components/shared/admin-quick-actions";
import { PageShell } from "@/components/shared/page-shell";


export default async function AdminDashboardPage() {
  const session = await auth();

  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/login");
  }

  const [totalSiswa, totalGuru, totalPpdb, pendingPpdb, recentPpdb] = await Promise.all([
    prisma.student.count(),
    prisma.teacher.count(),
    prisma.pPDB.count(),
    prisma.pPDB.count({ where: { status: "PENDING" } }),
    prisma.pPDB.findMany({
      take: 8,
      orderBy: { createdAt: "desc" },
      select: {
        registrationNumber: true,
        name: true,
        phone: true,
        status: true,
      },
    }),
  ]);

  return (
    <PageShell variant="portal"
      title="Selamat datang, Admin"
      description="Lihat kondisi sekolah hari ini dan lanjutkan pekerjaan yang perlu ditangani."
      rightSlot={
        <div className="flex items-center gap-2">
          <Badge className="rounded-md bg-oxford-100 text-oxford-800 hover:bg-oxford-100">2025/2026</Badge>
          <AdminQuickActions schoolYear="2025/2026" />
        </div>
      }
    >

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Siswa aktif" value={String(totalSiswa)} description="Terdaftar di seluruh kelas" accent="bg-oxford-600" />
        <StatCard title="Tenaga pengajar" value={String(totalGuru)} description="Guru terdaftar" accent="bg-oxford-400" />
        <StatCard title="Pendaftar PPDB" value={String(totalPpdb)} description="Total pendaftaran masuk" />
        <StatCard title="Perlu ditinjau" value={String(pendingPpdb)} description="Pendaftaran menunggu keputusan" accent="bg-amber-500" />
      </div>

      <Tabs defaultValue="ppdb" className="space-y-4">
        <TabsList className="rounded-lg bg-oxford-100 text-oxford-700">
          <TabsTrigger value="ppdb">PPDB Terbaru</TabsTrigger>
          <TabsTrigger value="info">Info Sistem</TabsTrigger>
        </TabsList>
        <TabsContent value="ppdb">
          <Card className="rounded-xl border-oxford-100 bg-white shadow-none">
            <CardHeader>
              <CardTitle className="text-xl text-oxford-950">Pendaftar terbaru</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable columns={adminPpdbColumns} data={recentPpdb} searchKey="name" />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="info">
          <Card className="rounded-xl border-oxford-100 bg-white shadow-none">
            <CardHeader>
              <CardTitle className="text-xl text-oxford-950">Status sistem</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-oxford-600">
              Sistem akademik aktif dan data dashboard diperbarui saat halaman dibuka.
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageShell>
  );
}
