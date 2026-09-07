import { PageShell } from "@/components/shared/page-shell";
import { prisma } from "@/lib/prisma";
import { runWhenDatabaseReady } from "@/lib/db-config";
import { TeacherManager, type TeacherRow } from "./teacher-manager";
export const dynamic = "force-dynamic";

export default async function AdminGuruPage() {
  const teachers = await runWhenDatabaseReady(
    () =>
    prisma.teacher.findMany({
      select: {
        id: true,
        nip: true,
        phone: true,
        subjects: true,
        user: { select: { name: true, email: true } },
        _count: { select: { classes: true } },
      },
      orderBy: { user: { name: "asc" } },
    }),
    [],
  );

  const rows: TeacherRow[] = teachers.map((teacher) => ({
    id: teacher.id,
    name: teacher.user.name,
    email: teacher.user.email,
    nip: teacher.nip,
    phone: teacher.phone,
    subjects: teacher.subjects,
    classCount: teacher._count.classes,
  }));

  return (
    <PageShell
      title="Manajemen Guru"
      description="Kelola data pendidik, penugasan mata pelajaran, dan distribusi kelas mengajar."
    >
      <div className="rounded-2xl border border-oxford-100 bg-white shadow-sm p-6 md:p-8">
        <TeacherManager teachers={rows} />
      </div>
    </PageShell>
  );
}
