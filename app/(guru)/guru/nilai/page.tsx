import { PageShell } from "@/components/shared/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { GradeForm, type GradeStudentRow } from "./grade-form";
export const dynamic = "force-dynamic";

type GuruNilaiPageProps = {
  searchParams: Promise<{ classId?: string; subjectId?: string; semester?: string; type?: string }>;
};

const GRADE_TYPES = ["UH", "UTS", "UAS"] as const;

export default async function GuruNilaiPage(props: GuruNilaiPageProps) {
  const searchParams = await props.searchParams;
  const session = await auth();

  const teacher = await prisma.teacher.findUnique({
    where: { userId: session!.user.id },
    select: {
      classes: { select: { id: true, name: true, year: true }, orderBy: [{ grade: "asc" }, { name: "asc" }] },
      subjectsTaught: { select: { id: true, name: true, code: true }, orderBy: { name: "asc" } },
    },
  });
  const classes = teacher?.classes ?? [];
  const subjects = teacher?.subjectsTaught ?? [];

  const selectedClassId = classes.some((item) => item.id === searchParams.classId) ? searchParams.classId! : classes[0]?.id;
  const selectedSubjectId = subjects.some((item) => item.id === searchParams.subjectId) ? searchParams.subjectId! : subjects[0]?.id;
  const semester = searchParams.semester === "2" ? 2 : 1;
  const type = (GRADE_TYPES as readonly string[]).includes(searchParams.type ?? "")
    ? (searchParams.type as "UH" | "UTS" | "UAS")
    : "UH";

  const students: GradeStudentRow[] = selectedClassId && selectedSubjectId
    ? (await prisma.class.findFirst({
        where: { id: selectedClassId, teacher: { userId: session!.user.id } },
        select: {
          students: {
            select: {
              id: true,
              nis: true,
              user: { select: { name: true } },
              grades: {
                where: { subjectId: selectedSubjectId, semester, type },
                select: { score: true },
              },
            },
            orderBy: { user: { name: "asc" } },
          },
        },
      }))?.students.map((student) => ({
        id: student.id,
        nis: student.nis,
        name: student.user.name,
        existingScore: student.grades[0]?.score ?? null,
      })) ?? []
    : [];

  return (
    <PageShell
      title="Input Nilai"
      description="Kelola penilaian siswa per mata pelajaran dengan alur input yang terstruktur dan cepat."
    >
      <Card className="rounded-2xl border-oxford-100 shadow-sm">
        <CardContent className="p-6 md:p-8">
          <form className="mb-7 grid gap-4 border-b border-oxford-100 pb-6 md:grid-cols-[1fr_1fr_120px_120px_auto]">
            <label className="text-sm font-semibold text-oxford-800">Kelas
              <select name="classId" defaultValue={selectedClassId} className="mt-2 h-11 w-full rounded-xl border border-oxford-200 bg-white px-3 text-sm">
                {classes.map((item) => <option key={item.id} value={item.id}>{item.name} · {item.year}</option>)}
              </select>
            </label>
            <label className="text-sm font-semibold text-oxford-800">Mata Pelajaran
              <select name="subjectId" defaultValue={selectedSubjectId} className="mt-2 h-11 w-full rounded-xl border border-oxford-200 bg-white px-3 text-sm">
                {subjects.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
              </select>
            </label>
            <label className="text-sm font-semibold text-oxford-800">Semester
              <select name="semester" defaultValue={semester} className="mt-2 h-11 w-full rounded-xl border border-oxford-200 bg-white px-3 text-sm">
                <option value="1">1</option>
                <option value="2">2</option>
              </select>
            </label>
            <label className="text-sm font-semibold text-oxford-800">Jenis
              <select name="type" defaultValue={type} className="mt-2 h-11 w-full rounded-xl border border-oxford-200 bg-white px-3 text-sm">
                {GRADE_TYPES.map((item) => <option key={item} value={item}>{item}</option>)}
              </select>
            </label>
            <button type="submit" className="mt-auto h-11 rounded-xl bg-oxford-900 px-5 text-sm font-bold text-white hover:bg-oxford-800">Tampilkan</button>
          </form>

          {!classes.length || !subjects.length ? (
            <p className="text-sm text-oxford-600">Belum ada kelas atau mata pelajaran yang ditugaskan kepada Anda.</p>
          ) : students.length ? (
            <GradeForm
              classId={selectedClassId!}
              subjectId={selectedSubjectId!}
              semester={semester}
              type={type}
              students={students}
            />
          ) : (
            <p className="text-sm text-oxford-600">Belum ada siswa di kelas ini.</p>
          )}
        </CardContent>
      </Card>
    </PageShell>
  );
}
