import { PageShell } from "@/components/shared/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { prisma } from "@/lib/prisma";
import { runWhenDatabaseReady } from "@/lib/db-config";
import { KelasManager, MapelManager, type KelasRow, type MapelRow, type TeacherOption } from "./akademik-managers";
export const dynamic = "force-dynamic";

export default async function AdminAkademikPage() {
  const [teachers, kelas, mapel] = await Promise.all([
    runWhenDatabaseReady(
      () =>
      prisma.teacher.findMany({
        select: { id: true, user: { select: { name: true } } },
        orderBy: { user: { name: "asc" } },
      }),
      [],
    ),
    runWhenDatabaseReady(
      () =>
      prisma.class.findMany({
        select: {
          id: true,
          name: true,
          grade: true,
          year: true,
          teacherId: true,
          teacher: { select: { user: { select: { name: true } } } },
          _count: { select: { students: true } },
        },
        orderBy: [{ grade: "asc" }, { name: "asc" }],
      }),
      [],
    ),
    runWhenDatabaseReady(
      () =>
      prisma.subject.findMany({
        select: {
          id: true,
          name: true,
          code: true,
          teacherId: true,
          teacher: { select: { user: { select: { name: true } } } },
        },
        orderBy: { name: "asc" },
      }),
      [],
    ),
  ]);

  const teacherOptions: TeacherOption[] = teachers.map((teacher) => ({
    id: teacher.id,
    name: teacher.user.name,
  }));

  const kelasRows: KelasRow[] = kelas.map((item) => ({
    id: item.id,
    name: item.name,
    grade: item.grade,
    year: item.year,
    teacherId: item.teacherId,
    teacherName: item.teacher?.user.name ?? null,
    studentCount: item._count.students,
  }));

  const mapelRows: MapelRow[] = mapel.map((item) => ({
    id: item.id,
    name: item.name,
    code: item.code,
    teacherId: item.teacherId,
    teacherName: item.teacher?.user.name ?? null,
  }));

  return (
    <PageShell
      title="Data Akademik"
      description="Kontrol data kelas, mata pelajaran, dan penugasan guru untuk seluruh unit."
    >
      <Card className="rounded-2xl border-oxford-100 shadow-sm">
        <CardContent className="p-6 md:p-8">
          <Tabs defaultValue="kelas">
            <TabsList className="mb-4">
              <TabsTrigger value="kelas">Kelas</TabsTrigger>
              <TabsTrigger value="mapel">Mata Pelajaran</TabsTrigger>
            </TabsList>
            <TabsContent value="kelas">
              <KelasManager kelas={kelasRows} teachers={teacherOptions} />
            </TabsContent>
            <TabsContent value="mapel">
              <MapelManager mapel={mapelRows} teachers={teacherOptions} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </PageShell>
  );
}
