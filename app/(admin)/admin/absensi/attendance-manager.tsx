"use client";

import { useMemo, useState, useTransition } from "react";
import { Check, Loader2, Save } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { saveAdminAttendanceAction } from "./actions";

export type AdminAttendanceStatus = "NONE" | "HADIR" | "IZIN" | "SAKIT" | "ALPHA";

export type AdminAttendanceRow = {
  id: string;
  name: string;
  nis: string;
  status: AdminAttendanceStatus;
  checkInAt: string;
};

type AttendanceManagerProps = {
  classId: string;
  date: string;
  rows: AdminAttendanceRow[];
};

const statusLabel: Record<AdminAttendanceStatus, string> = {
  NONE: "Belum hadir",
  HADIR: "Hadir",
  IZIN: "Izin",
  SAKIT: "Sakit",
  ALPHA: "Alpha",
};

export function AttendanceManager({ classId, date, rows }: AttendanceManagerProps) {
  const [statuses, setStatuses] = useState<Record<string, AdminAttendanceStatus>>(() =>
    Object.fromEntries(rows.map((row) => [row.id, row.status])),
  );
  const [search, setSearch] = useState("");
  const [isPending, startTransition] = useTransition();

  const filteredRows = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return rows;
    return rows.filter(
      (row) => row.name.toLowerCase().includes(query) || row.nis.toLowerCase().includes(query),
    );
  }, [rows, search]);

  const summary = useMemo(
    () =>
      rows.reduce<Record<AdminAttendanceStatus, number>>(
        (counts, row) => {
          counts[statuses[row.id] ?? row.status] += 1;
          return counts;
        },
        { NONE: 0, HADIR: 0, IZIN: 0, SAKIT: 0, ALPHA: 0 },
      ),
    [rows, statuses],
  );

  const save = () => {
    startTransition(async () => {
      const result = await saveAdminAttendanceAction({
        classId,
        date,
        entries: rows.map((row) => ({ studentId: row.id, status: statuses[row.id] ?? row.status })),
      });
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <div className="space-y-5">
      <div className="grid gap-2 sm:grid-cols-5">
        {(["HADIR", "IZIN", "SAKIT", "ALPHA", "NONE"] as const).map((status) => (
          <div key={status} className="rounded-xl border border-oxford-100 bg-oxford-50/50 px-3 py-2">
            <p className="text-xs text-oxford-500">{statusLabel[status]}</p>
            <p className="text-xl font-bold text-oxford-950">{summary[status]}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Cari nama siswa atau NIS..."
          className="max-w-md"
        />
        <Button onClick={save} disabled={isPending || !rows.length} className="bg-oxford-900 hover:bg-oxford-800">
          {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
          Simpan Absensi
        </Button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-oxford-100">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-oxford-100 bg-oxford-50/60 text-left">
              <th className="px-4 py-3 font-semibold text-oxford-800">Nama Siswa</th>
              <th className="px-4 py-3 font-semibold text-oxford-800">NIS</th>
              <th className="px-4 py-3 font-semibold text-oxford-800">Status</th>
              <th className="px-4 py-3 font-semibold text-oxford-800">Check-in</th>
            </tr>
          </thead>
          <tbody>
            {filteredRows.length ? filteredRows.map((row) => (
              <tr key={row.id} className="border-b border-oxford-50 last:border-0">
                <td className="px-4 py-3 font-medium text-oxford-900">{row.name}</td>
                <td className="px-4 py-3 text-oxford-500">{row.nis}</td>
                <td className="px-4 py-2">
                  <select
                    value={statuses[row.id] ?? row.status}
                    onChange={(event) =>
                      setStatuses((current) => ({
                        ...current,
                        [row.id]: event.target.value as AdminAttendanceStatus,
                      }))
                    }
                    className="h-10 min-w-36 rounded-lg border border-oxford-200 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400"
                  >
                    {(Object.keys(statusLabel) as AdminAttendanceStatus[]).map((status) => (
                      <option key={status} value={status}>{statusLabel[status]}</option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-3 text-oxford-500">
                  {row.checkInAt || "—"}
                  {row.status !== "NONE" && row.checkInAt ? <Check className="ml-1 inline h-3 w-3 text-emerald-600" /> : null}
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-oxford-500">Siswa tidak ditemukan.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-oxford-500">Pilih &quot;Belum hadir&quot; untuk menghapus catatan absensi siswa pada tanggal ini.</p>
    </div>
  );
}
