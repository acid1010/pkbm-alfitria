import { PageShell } from "@/components/shared/page-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { DocumentRequestForm, CancelDocumentButton } from "./document-forms";
export const dynamic = "force-dynamic";

const statusVariant: Record<"REQUESTED" | "PROCESSING" | "DONE" | "REJECTED", "warning" | "secondary" | "success" | "danger"> = {
  REQUESTED: "warning",
  PROCESSING: "secondary",
  DONE: "success",
  REJECTED: "danger",
};

const statusLabel: Record<"REQUESTED" | "PROCESSING" | "DONE" | "REJECTED", string> = {
  REQUESTED: "Diajukan",
  PROCESSING: "Diproses",
  DONE: "Selesai",
  REJECTED: "Ditolak",
};

export default async function SiswaDokumenPage() {
  const session = await auth();
  const documents = await prisma.document.findMany({
    where: { student: { userId: session!.user.id } },
    orderBy: { requestedAt: "desc" },
  });

  return (
    <PageShell
      title="Dokumen Siswa"
      description="Kelola dokumen administratif siswa untuk kebutuhan surat keterangan dan arsip pembelajaran."
    >
      <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
        <Card className="rounded-2xl border-oxford-100 shadow-sm h-fit">
          <CardHeader>
            <CardTitle className="font-heading text-xl text-oxford-950">Ajukan Dokumen</CardTitle>
          </CardHeader>
          <CardContent>
            <DocumentRequestForm />
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-oxford-100 shadow-sm">
          <CardHeader>
            <CardTitle className="font-heading text-xl text-oxford-950">Riwayat Pengajuan</CardTitle>
          </CardHeader>
          <CardContent>
            {documents.length ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Jenis Dokumen</TableHead>
                    <TableHead>Tanggal Pengajuan</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Berkas</TableHead>
                    <TableHead>Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {documents.map((document) => (
                    <TableRow key={document.id}>
                      <TableCell className="font-medium text-oxford-900">{document.type}</TableCell>
                      <TableCell>
                        {new Intl.DateTimeFormat("id-ID", { timeZone: "Asia/Jakarta", dateStyle: "medium" }).format(document.requestedAt)}
                      </TableCell>
                      <TableCell><Badge variant={statusVariant[document.status]}>{statusLabel[document.status]}</Badge></TableCell>
                      <TableCell>
                        {document.fileUrl ? (
                          <a href={document.fileUrl} target="_blank" rel="noreferrer" className="font-semibold text-gold-600 hover:underline">Unduh</a>
                        ) : (
                          <span className="text-oxford-400">—</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {document.status === "REQUESTED" ? <CancelDocumentButton documentId={document.id} /> : <span className="text-oxford-400">—</span>}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p className="text-sm text-oxford-600">Belum ada pengajuan dokumen.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </PageShell>
  );
}
