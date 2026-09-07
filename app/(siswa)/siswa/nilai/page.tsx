import { PageShell } from "@/components/shared/page-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { runWhenDatabaseReady } from "@/lib/db-config";
export const dynamic = "force-dynamic";

const TYPE_LABEL: Record<"UH" | "UTS" | "UAS", string> = {
  UH: "Ulangan Harian",
  UTS: "UTS",
  UAS: "UAS",
};

export default async function SiswaNilaiPage() {
  const session = await auth();
  const grades = await runWhenDatabaseReady(
    () =>
      prisma.grade.findMany({
        where: { student: { userId: session!.user.id } },
        select: {
          score: true,
          semester: true,
          type: true,
          subject: { select: { name: true } },
        },
        orderBy: [{ subject: { name: "asc" } }, { semester: "asc" }],
      }),
    [] as { score: number; semester: number; type: "UH" | "UTS" | "UAS"; subject: { name: string } }[],
  );

  // Group by subject → per-semester averages
  const bySubject = new Map<string, { s1: typeof grades; s2: typeof grades }>();
  for (const grade of grades) {
    const entry = bySubject.get(grade.subject.name) ?? { s1: [], s2: [] };
    (grade.semester === 1 ? entry.s1 : entry.s2).push(grade);
    bySubject.set(grade.subject.name, entry);
  }

  const average = (items: typeof grades) =>
    items.length ? (items.reduce((sum, item) => sum + item.score, 0) / items.length).toFixed(1) : "—";

  return (
    <PageShell
      title="Nilai Siswa"
      description="Pantau perkembangan capaian belajar pada setiap mata pelajaran dan semester."
    >
      <Card className="rounded-2xl border-oxford-100 shadow-sm">
        <CardHeader>
          <CardTitle className="font-heading text-xl text-oxford-950">Rekap Nilai</CardTitle>
        </CardHeader>
        <CardContent>
          {bySubject.size ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mata Pelajaran</TableHead>
                  <TableHead>Detail Nilai</TableHead>
                  <TableHead>Rata-rata Sem. 1</TableHead>
                  <TableHead>Rata-rata Sem. 2</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[...bySubject.entries()].map(([subject, entry]) => (
                  <TableRow key={subject}>
                    <TableCell className="font-medium text-oxford-900">{subject}</TableCell>
                    <TableCell className="text-sm text-oxford-600">
                      {[...entry.s1, ...entry.s2]
                        .map((grade) => `${TYPE_LABEL[grade.type]}: ${grade.score} (S${grade.semester})`)
                        .join(" · ") || "—"}
                    </TableCell>
                    <TableCell className="font-semibold text-oxford-900">{average(entry.s1)}</TableCell>
                    <TableCell className="font-semibold text-oxford-900">{average(entry.s2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-sm text-oxford-600">Belum ada nilai yang diinput guru.</p>
          )}
        </CardContent>
      </Card>
    </PageShell>
  );
}
