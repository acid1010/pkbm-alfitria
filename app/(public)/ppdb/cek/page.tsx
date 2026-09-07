import { demoPpdbRows } from "@/lib/demo-data";
import { runWhenDatabaseReady, isDatabaseConfigured } from "@/lib/db-config";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageShell } from "@/components/shared/page-shell";
import { Button } from "@/components/ui/button";
import { Search, FileCheck, AlertCircle } from "lucide-react";


export default async function CekPpdbPage(
  props: {
    searchParams: Promise<{ reg?: string }>;
  }
) {
  const searchParams = await props.searchParams;
  const reg = searchParams.reg;
  const data = reg
    ? await runWhenDatabaseReady(
        () =>
          prisma.pPDB.findUnique({
            where: { registrationNumber: reg },
          }),
        demoPpdbRows.find((item) => item.registrationNumber === reg) ?? null,
      )
    : null;

  const statusColor: Record<string, string> = {
    PENDING: "bg-amber-100 text-amber-800",
    APPROVED: "bg-green-100 text-green-800",
    REJECTED: "bg-red-100 text-red-800",
  };

  return (
    <PageShell
      title="Cek Status PPDB"
      description="Masukkan nomor registrasi Anda untuk melihat status pendaftaran peserta didik baru."
    >
      <div className="space-y-6">
        {!isDatabaseConfigured ? (
          <div className="flex items-center gap-2 rounded-xl bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-amber-800">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>Pencarian memakai data contoh lokal.</span>
          </div>
        ) : null}

        {/* Search form */}
        <div className="rounded-2xl border border-oxford-100 bg-white p-6 md:p-8 shadow-sm">
          <form className="flex flex-col sm:flex-row gap-3" method="get">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-oxford-400" />
              </div>
              <input
                name="reg"
                placeholder="Contoh: PPDB-2026-0001"
                defaultValue={reg ?? ""}
                className="w-full rounded-xl border border-oxford-200 bg-oxford-50/50 py-3 pl-12 pr-4 text-oxford-900 placeholder:text-oxford-400 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-gold-500 transition-shadow text-sm"
              />
            </div>
            <Button type="submit" className="bg-oxford-900 hover:bg-oxford-800 text-white font-semibold rounded-xl px-8 h-12 shadow-sm cursor-pointer">
              <Search className="mr-2 h-4 w-4" />
              Cek Status
            </Button>
          </form>
        </div>

        {/* Result */}
        {data ? (
          <Card className="rounded-2xl border-oxford-100 shadow-sm overflow-hidden">
            <CardHeader className="bg-oxford-50/50 border-b border-oxford-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-green-100 text-green-600 flex items-center justify-center">
                  <FileCheck className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle className="text-oxford-900">{data.name}</CardTitle>
                  <p className="text-sm text-oxford-500 mt-0.5">{data.registrationNumber}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-oxford-400 mb-1">Status</p>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${statusColor[data.status] ?? "bg-oxford-100 text-oxford-700"}`}>
                    {data.status}
                  </span>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-oxford-400 mb-1">No. Registrasi</p>
                  <p className="text-sm font-semibold text-oxford-900">{data.registrationNumber}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : reg ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
            <AlertCircle className="h-8 w-8 text-red-400 mx-auto mb-3" />
            <p className="text-sm font-semibold text-red-800">Data tidak ditemukan</p>
            <p className="text-xs text-red-600 mt-1">Pastikan nomor registrasi yang dimasukkan sudah benar.</p>
          </div>
        ) : null}
      </div>
    </PageShell>
  );
}
