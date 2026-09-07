import { PageShell } from "@/components/shared/page-shell";
import { prisma } from "@/lib/prisma";
import { runWhenDatabaseReady } from "@/lib/db-config";
import { PpdbReviewTable, type PpdbRow } from "./ppdb-review-table";
export const dynamic = "force-dynamic";

export default async function AdminPpdbPage() {
  const submissions = await runWhenDatabaseReady(
    () =>
    prisma.pPDB.findMany({
      orderBy: [{ status: "asc" }, { createdAt: "desc" }],
    }),
    [],
  );

  const statusOrder: Record<PpdbRow["status"], number> = { PENDING: 0, APPROVED: 1, REJECTED: 2 };
  const rows: PpdbRow[] = submissions
    .map((submission) => ({
      id: submission.id,
      registrationNumber: submission.registrationNumber,
      name: submission.name,
      birthdate: submission.birthdate.toISOString().slice(0, 10),
      address: submission.address,
      phone: submission.phone,
      documents: submission.documents,
      status: submission.status,
    }))
    .sort((a, b) => statusOrder[a.status] - statusOrder[b.status]);

  return (
    <PageShell
      title="Review PPDB"
      description="Validasi berkas pendaftaran, verifikasi kelengkapan, dan finalisasi status penerimaan."
    >
      <div className="rounded-2xl border border-oxford-100 bg-white shadow-sm p-6 md:p-8">
        <PpdbReviewTable rows={rows} />
      </div>
    </PageShell>
  );
}
