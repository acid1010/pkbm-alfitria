"use client";
import { useMemo, useState, useTransition } from "react";
import { type ColumnDef } from "@tanstack/react-table";
import { Check, X, Trash2, Loader2, Download } from "lucide-react";
import { DataTable } from "@/components/shared/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { deletePpdbAction, updatePpdbStatusAction } from "./actions";

export type PpdbRow = {
  id: string;
  registrationNumber: string;
  name: string;
  birthdate: string;
  address: string;
  phone: string;
  documents: string[];
  status: "PENDING" | "APPROVED" | "REJECTED";
};

const statusVariant: Record<PpdbRow["status"], "warning" | "success" | "danger"> = {
  PENDING: "warning",
  APPROVED: "success",
  REJECTED: "danger",
};

const statusLabel: Record<PpdbRow["status"], string> = {
  PENDING: "Menunggu",
  APPROVED: "Diterima",
  REJECTED: "Ditolak",
};

export function PpdbReviewTable({ rows }: { rows: PpdbRow[] }) {
  const [detail, setDetail] = useState<PpdbRow | null>(null);
  const [deleting, setDeleting] = useState<PpdbRow | null>(null);
  const [isPending, startTransition] = useTransition();

  const setStatus = (row: PpdbRow, status: "APPROVED" | "REJECTED") => {
    startTransition(async () => {
      const result = await updatePpdbStatusAction(row.id, status);
      if (result.success) { toast.success(result.message); } else { toast.error(result.message); }
    });
  };

  const confirmDelete = () => {
    if (!deleting) return;
    startTransition(async () => {
      const result = await deletePpdbAction(deleting.id);
      if (result.success) { toast.success(result.message); } else { toast.error(result.message); }
      setDeleting(null);
    });
  };

  const columns = useMemo<ColumnDef<PpdbRow>[]>(() => [
    { accessorKey: "registrationNumber", header: "No. Registrasi" },
    { accessorKey: "name", header: "Nama" },
    { accessorKey: "phone", header: "No. HP" },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <Badge variant={statusVariant[row.original.status]}>{statusLabel[row.original.status]}</Badge>,
    },
    {
      id: "actions",
      header: "Aksi",
      cell: ({ row }) => {
        const ppdb = row.original;
        return (
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={() => setDetail(ppdb)}>Detail</Button>
            {ppdb.status !== "APPROVED" && (
              <Button size="sm" className="bg-emerald-700 hover:bg-emerald-600" disabled={isPending} onClick={() => setStatus(ppdb, "APPROVED")}>
                <Check className="h-3 w-3" /> Terima
              </Button>
            )}
            {ppdb.status !== "REJECTED" && (
              <Button size="sm" variant="outline" className="text-amber-700 hover:bg-amber-50" disabled={isPending} onClick={() => setStatus(ppdb, "REJECTED")}>
                <X className="h-3 w-3" /> Tolak
              </Button>
            )}
            <Button variant="outline" size="sm" className="text-red-600 hover:bg-red-50" onClick={() => setDeleting(ppdb)}>
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        );
      },
    },
  ], [isPending]);

  return (
    <>
      <DataTable columns={columns} data={rows} searchKey="name" />

      {/* Detail pendaftar */}
      <Dialog open={Boolean(detail)} onOpenChange={(open) => !open && setDetail(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-heading text-xl text-oxford-950">Detail Pendaftar</DialogTitle>
            <DialogDescription>{detail?.registrationNumber}</DialogDescription>
          </DialogHeader>
          {detail && (
            <dl className="space-y-2 text-sm">
              {[
                ["Nama", detail.name],
                ["Tanggal Lahir", detail.birthdate],
                ["No. HP", detail.phone],
                ["Alamat", detail.address],
                ["Dokumen", detail.documents.length ? detail.documents.join(", ") : "Tidak ada"],
                ["Status", statusLabel[detail.status]],
              ].map(([label, value]) => (
                <div key={label} className="flex gap-2">
                  <dt className="w-32 shrink-0 font-semibold text-oxford-800">{label}</dt>
                  <dd className="text-oxford-700">{value}</dd>
                </div>
              ))}
            </dl>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setDetail(null)}>Tutup</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Konfirmasi hapus */}
      <Dialog open={Boolean(deleting)} onOpenChange={(open) => !open && setDeleting(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-heading text-xl text-oxford-950">Hapus Pendaftar</DialogTitle>
            <DialogDescription>
              Yakin ingin menghapus pendaftar <span className="font-semibold text-oxford-900">{deleting?.name}</span> ({deleting?.registrationNumber})? Tindakan ini permanen.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleting(null)}>Batal</Button>
            <Button variant="destructive" onClick={confirmDelete} disabled={isPending}>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Ya, Hapus
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export function ExportHint() {
  return (
    <p className="flex items-center gap-1 text-xs text-oxford-500">
      <Download className="h-3 w-3" /> Dokumen fisik diverifikasi saat daftar ulang di kantor PKBM.
    </p>
  );
}
