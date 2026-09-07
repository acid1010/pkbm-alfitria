import { PageShell } from "@/components/shared/page-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProfileForm } from "@/components/shared/profile-form";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { updateTeacherProfileAction } from "./actions";
export const dynamic = "force-dynamic";

export default async function GuruProfilPage() {
  const session = await auth();
  const teacher = await prisma.teacher.findUnique({
    where: { userId: session!.user.id },
    include: { user: { select: { name: true, email: true } } },
  });

  if (! teacher) {
    return (
      <PageShell title="Profil Guru" description="Kelola informasi profil profesional guru sebagai referensi akademik dan administrasi.">
        <Card className="rounded-2xl border-oxford-100 shadow-sm">
          <CardContent className="p-6 text-sm text-oxford-600">Profil guru tidak ditemukan.</CardContent>
        </Card>
      </PageShell>
    );
  }

  return (
    <PageShell
      title="Profil Guru"
      description="Kelola informasi profil profesional guru sebagai referensi akademik dan administrasi."
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <Card className="rounded-2xl border-oxford-100 shadow-sm">
          <CardHeader>
            <CardTitle className="font-heading text-xl text-oxford-950">Data Profil</CardTitle>
          </CardHeader>
          <CardContent>
            <ProfileForm
              mode="GURU"
              action={updateTeacherProfileAction}
              defaults={{ name: teacher.user.name, phone: teacher.phone }}
            />
          </CardContent>
        </Card>
        <Card className="rounded-2xl border-oxford-100 shadow-sm">
          <CardHeader>
            <CardTitle className="font-heading text-xl text-oxford-950">Info Penugasan</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-oxford-700">
            <p><span className="font-semibold text-oxford-900">Email:</span> {teacher.user.email}</p>
            <p><span className="font-semibold text-oxford-900">NIP:</span> {teacher.nip}</p>
            <div>
              <p className="font-semibold text-oxford-900">Mata Pelajaran:</p>
              <div className="mt-1 flex flex-wrap gap-1">
                {teacher.subjects.length ? teacher.subjects.map((subject) => (
                  <span key={subject} className="rounded-full bg-oxford-100 px-2 py-0.5 text-xs font-semibold text-oxford-800">{subject}</span>
                )) : <span className="text-oxford-400">Belum ada</span>}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  );
}
