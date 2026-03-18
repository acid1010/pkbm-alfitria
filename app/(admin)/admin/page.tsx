import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { demoPpdbRows } from "@/lib/demo-data";
import { isDatabaseConfigured, runWhenDatabaseReady } from "@/lib/db-config";
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

  const [totalSiswa, totalGuru, totalPpdb, recentPpdb] = await Promise.all([
    runWhenDatabaseReady(() => prisma.student.count(), 10),
    runWhenDatabaseReady(() => prisma.teacher.count(), 3),
    runWhenDatabaseReady(() => prisma.pPDB.count(), demoPpdbRows.length),
    runWhenDatabaseReady(
      () =>
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
      demoPpdbRows,
    ),
  ]);

  return (
    <PageShell
      title="Dashboard Admin"
      description="Ringkasan operasional utama PKBM, termasuk statistik pendaftar dan status sistem akademik."
      rightSlot={
        <div className="flex items-center gap-2">
          <Badge className="bg-gold-100 text-gold-900 hover:bg-gold-100">TA 2025/2026</Badge>
          <AdminQuickActions schoolYear="2025/2026" />
        </div>
      }
    >

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard title="Total Siswa" value={String(totalSiswa)} description="Siswa aktif saat ini" />
        <StatCard title="Total Guru" value={String(totalGuru)} description="Tenaga pengajar" />
        <StatCard title="Pendaftar PPDB" value={String(totalPpdb)} description="Semua pendaftaran masuk" />
      </div>

      <Tabs defaultValue="ppdb" className="space-y-4">
        <TabsList className="bg-oxford-100 text-oxford-700">
          <TabsTrigger value="ppdb">PPDB Terbaru</TabsTrigger>
          <TabsTrigger value="info">Info Sistem</TabsTrigger>
        </TabsList>
        <TabsContent value="ppdb">
          <Card className="rounded-2xl border-oxford-100 shadow-sm">
            <CardHeader>
              <CardTitle className="font-heading text-2xl text-oxford-950">Daftar Pendaftar PPDB</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable columns={adminPpdbColumns} data={recentPpdb} searchKey="name" />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="info">
          <Card className="rounded-2xl border-oxford-100 shadow-sm">
            <CardHeader>
              <CardTitle className="font-heading text-2xl text-oxford-950">Status Sistem</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-oxford-600">
              {isDatabaseConfigured
                ? "Data dashboard menggunakan server component + Prisma query langsung dari PostgreSQL."
                : "Database belum dikonfigurasi. Dashboard menampilkan angka dan data contoh agar UI tetap bisa diuji."}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageShell>
  );
}
