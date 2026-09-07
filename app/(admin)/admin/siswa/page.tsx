import { PageShell } from "@/components/shared/page-shell";
import { prisma } from "@/lib/prisma";
import { runWhenDatabaseReady } from "@/lib/db-config";
import { StudentManager, type StudentRow } from "./student-manager";
export const dynamic = "force-dynamic";

export default async function AdminSiswaPage() {
  const [students, classes] = await Promise.all([
    runWhenDatabaseReady(
      () =>
      prisma.student.findMany({
        select: {
          id: true,
          nis: true,
          birthdate: true,
          address: true,
          phone: true,
          classId: true,
          user: { select: { name: true, email: true } },
          classRef: { select: { name: true } },
        },
        orderBy: { user: { name: "asc" } },
      }),
      [],
    ),
    runWhenDatabaseReady(
      () =>
      prisma.class.findMany({
        select: { id: true, name: true, year: true },
        orderBy: [{ grade: "asc" }, { name: "asc" }],
      }),
      [],
    ),
  ]);

  const rows: StudentRow[] = students.map((student) => ({
    id: student.id,
    name: student.user.name,
    email: student.user.email,
    nis: student.nis,
    className: student.classRef?.name ?? null,
    classId: student.classId,
    phone: student.phone,
    address: student.address,
    birthdate: student.birthdate.toISOString().slice(0, 10),
  }));

  return (
    <PageShell
      title="Manajemen Siswa"
      description="Kelola data siswa aktif, mutasi kelas, dan status akademik secara terpusat."
    >
      <div className="rounded-2xl border border-oxford-100 bg-white shadow-sm p-6 md:p-8">
        <StudentManager students={rows} classes={classes} />
      </div>
    </PageShell>
  );
}
