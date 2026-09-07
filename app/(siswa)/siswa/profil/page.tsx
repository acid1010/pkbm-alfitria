import { PageShell } from "@/components/shared/page-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProfileForm } from "@/components/shared/profile-form";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { updateStudentProfileAction } from "../dokumen/actions";
export const dynamic = "force-dynamic";

export default async function SiswaProfilPage() {
  const session = await auth();
  const student = await prisma.student.findUnique({
    where: { userId: session!.user.id },
    include: {
      user: { select: { name: true, email: true } },
      classRef: { select: { name: true, year: true } },
    },
  });

  if (! student) {
    return (
      <PageShell title="Profil Siswa" description="Lihat dan perbarui data pribadi sebagai bagian dari administrasi pembelajaran resmi.">
        <Card className="rounded-2xl border-oxford-100 shadow-sm">
          <CardContent className="p-6 text-sm text-oxford-600">Data siswa tidak ditemukan.</CardContent>
        </Card>
      </PageShell>
    );
  }

  return (
    <PageShell
      title="Profil Siswa"
      description="Lihat dan perbarui data pribadi sebagai bagian dari administrasi pembelajaran resmi."
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <Card className="rounded-2xl border-oxford-100 shadow-sm">
          <CardHeader>
            <CardTitle className="font-heading text-xl text-oxford-950">Data Profil</CardTitle>
          </CardHeader>
          <CardContent>
            <ProfileForm
              mode="SISWA"
              action={updateStudentProfileAction}
              defaults={{ name: student.user.name, phone: student.phone, address: student.address }}
            />
          </CardContent>
        </Card>
        <Card className="rounded-2xl border-oxford-100 shadow-sm">
          <CardHeader>
            <CardTitle className="font-heading text-xl text-oxford-950">Info Akademik</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-oxford-700">
            <p><span className="font-semibold text-oxford-900">Email:</span> {student.user.email}</p>
            <p><span className="font-semibold text-oxford-900">NIS:</span> {student.nis}</p>
            <p><span className="font-semibold text-oxford-900">Kelas:</span> {student.classRef ? `${student.classRef.name} · ${student.classRef.year}` : "Belum ditempatkan"}</p>
            <p><span className="font-semibold text-oxford-900">Tanggal Lahir:</span> {new Intl.DateTimeFormat("id-ID", { timeZone: "Asia/Jakarta", dateStyle: "long" }).format(student.birthdate)}</p>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  );
}
