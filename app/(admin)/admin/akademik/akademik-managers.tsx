"use client";
import { useMemo, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type ColumnDef } from "@tanstack/react-table";
import { z } from "zod";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import { DataTable } from "@/components/shared/data-table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import {
  createClassAction,
  createSubjectAction,
  deleteClassAction,
  deleteSubjectAction,
  updateClassAction,
  updateSubjectAction,
} from "./actions";

export type TeacherOption = { id: string; name: string };
export type KelasRow = {
  id: string;
  name: string;
  grade: number;
  year: string;
  teacherId: string | null;
  teacherName: string | null;
  studentCount: number;
};
export type MapelRow = {
  id: string;
  name: string;
  code: string;
  teacherId: string | null;
  teacherName: string | null;
};

// Mirror of the server schemas for inline validation
const kelasFormSchema = z.object({
  name: z.string().min(3, "Nama kelas minimal 3 karakter"),
  grade: z.coerce.number().int().min(1, "Tingkat minimal 1").max(13, "Tingkat maksimal 13"),
  year: z.string().regex(/^\d{4}\/\d{4}$/, "Format tahun ajaran: 2025/2026"),
});
const mapelFormSchema = z.object({
  name: z.string().min(3, "Nama mata pelajaran minimal 3 karakter"),
  code: z.string().min(2, "Kode minimal 2 karakter").max(10, "Kode maksimal 10 karakter"),
});

function TeacherSelect({
  value,
  onChange,
  teachers,
}: {
  value: string;
  onChange: (value: string) => void;
  teachers: TeacherOption[];
}) {
  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="h-9 w-full rounded-md border border-slate-200 bg-transparent px-3 py-1 text-sm shadow-sm"
    >
      <option value="">— Belum ditugaskan —</option>
      {teachers.map((teacher) => (
        <option key={teacher.id} value={teacher.id}>{teacher.name}</option>
      ))}
    </select>
  );
}

function KelasManager({ kelas, teachers }: { kelas: KelasRow[]; teachers: TeacherOption[] }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<KelasRow | null>(null);
  const [deleting, setDeleting] = useState<KelasRow | null>(null);
  const [isPending, startTransition] = useTransition();
  const [formError, setFormError] = useState<string | null>(null);
  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<{
    name: string;
    grade: string;
    year: string;
    teacherId: string;
  }>({
    defaultValues: { name: "", grade: "", year: "", teacherId: "" },
  });

  const openDialog = (row: KelasRow | null) => {
    setEditing(row);
    reset({
      name: row?.name ?? "",
      grade: row ? String(row.grade) : "",
      year: row?.year ?? "",
      teacherId: row?.teacherId ?? "",
    });
    setFormError(null);
    setDialogOpen(true);
  };

  const onSubmit = handleSubmit((values) => {
    const formData = new FormData();
    formData.set("name", values.name);
    formData.set("grade", values.grade);
    formData.set("year", values.year);
    formData.set("teacherId", watch("teacherId") ?? "");
    startTransition(async () => {
      const result = editing
        ? await updateClassAction(editing.id, formData)
        : await createClassAction(formData);
      if (!result.success) {
        setFormError(result.message);
        return;
      }
      toast.success(result.message);
      setDialogOpen(false);
    });
  });

  const confirmDelete = () => {
    if (!deleting) return;
    startTransition(async () => {
      const result = await deleteClassAction(deleting.id);
      if (result.success) { toast.success(result.message); } else { toast.error(result.message); }
      setDeleting(null);
    });
  };

  const columns = useMemo<ColumnDef<KelasRow>[]>(() => [
    { accessorKey: "name", header: "Nama Kelas" },
    { accessorKey: "grade", header: "Tingkat" },
    { accessorKey: "year", header: "Tahun Ajaran" },
    { accessorKey: "teacherName", header: "Wali Kelas", cell: ({ row }) =>
      row.original.teacherName ?? <span className="text-oxford-400">—</span>
    },
    { accessorKey: "studentCount", header: "Jumlah Siswa" },
    {
      id: "actions",
      header: "Aksi",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => openDialog(row.original)}>
            <Pencil className="h-3 w-3" /> Edit
          </Button>
          <Button variant="outline" size="sm" className="text-red-600 hover:bg-red-50" onClick={() => setDeleting(row.original)}>
            <Trash2 className="h-3 w-3" /> Hapus
          </Button>
        </div>
      ),
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
  ], []);

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={() => openDialog(null)} className="bg-oxford-900 hover:bg-oxford-800">
          <Plus className="mr-2 h-4 w-4" /> Tambah Kelas
        </Button>
      </div>
      <DataTable columns={columns} data={kelas} searchKey="name" />

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-heading text-xl text-oxford-950">{editing ? "Edit Kelas" : "Tambah Kelas"}</DialogTitle>
            <DialogDescription>Kelas dikelompokkan per tahun ajaran dengan wali kelas penanggung jawab.</DialogDescription>
          </DialogHeader>
          <form onSubmit={onSubmit} className="grid gap-4">
            <label className="space-y-2 text-sm font-medium">
              Nama Kelas
              <Input {...register("name")} placeholder="Paket A-1" />
              {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-2 text-sm font-medium">
                Tingkat
                <Input {...register("grade")} type="number" min={1} max={13} placeholder="7" />
                {errors.grade && <p className="text-sm text-red-600">{errors.grade.message}</p>}
              </label>
              <label className="space-y-2 text-sm font-medium">
                Tahun Ajaran
                <Input {...register("year")} placeholder="2025/2026" />
                {errors.year && <p className="text-sm text-red-600">{errors.year.message}</p>}
              </label>
            </div>
            <label className="space-y-2 text-sm font-medium">
              Wali Kelas
              <TeacherSelect value={watch("teacherId") ?? ""} onChange={(value) => setValue("teacherId", value)} teachers={teachers} />
            </label>
            {formError && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{formError}</p>}
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>Batal</Button>
              <Button type="submit" disabled={isPending} className="bg-oxford-900 hover:bg-oxford-800">
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {editing ? "Simpan Perubahan" : "Tambah Kelas"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={Boolean(deleting)} onOpenChange={(open) => !open && setDeleting(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-heading text-xl text-oxford-950">Hapus Kelas</DialogTitle>
            <DialogDescription>
              Yakin ingin menghapus kelas <span className="font-semibold text-oxford-900">{deleting?.name}</span>? Riwayat absensi kelas ikut terhapus. Kelas dengan siswa aktif tidak dapat dihapus.
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
    </div>
  );
}

function MapelManager({ mapel, teachers }: { mapel: MapelRow[]; teachers: TeacherOption[] }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<MapelRow | null>(null);
  const [deleting, setDeleting] = useState<MapelRow | null>(null);
  const [isPending, startTransition] = useTransition();
  const [formError, setFormError] = useState<string | null>(null);
  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<{
    name: string;
    code: string;
    teacherId: string;
  }>({
    defaultValues: { name: "", code: "", teacherId: "" },
  });

  const openDialog = (row: MapelRow | null) => {
    setEditing(row);
    reset({
      name: row?.name ?? "",
      code: row?.code ?? "",
      teacherId: row?.teacherId ?? "",
    });
    setFormError(null);
    setDialogOpen(true);
  };

  const onSubmit = handleSubmit((values) => {
    const formData = new FormData();
    formData.set("name", values.name);
    formData.set("code", values.code);
    formData.set("teacherId", watch("teacherId") ?? "");
    startTransition(async () => {
      const result = editing
        ? await updateSubjectAction(editing.id, formData)
        : await createSubjectAction(formData);
      if (!result.success) {
        setFormError(result.message);
        return;
      }
      toast.success(result.message);
      setDialogOpen(false);
    });
  });

  const confirmDelete = () => {
    if (!deleting) return;
    startTransition(async () => {
      const result = await deleteSubjectAction(deleting.id);
      if (result.success) { toast.success(result.message); } else { toast.error(result.message); }
      setDeleting(null);
    });
  };

  const columns = useMemo<ColumnDef<MapelRow>[]>(() => [
    { accessorKey: "name", header: "Mata Pelajaran" },
    { accessorKey: "code", header: "Kode" },
    { accessorKey: "teacherName", header: "Guru Pengampu", cell: ({ row }) =>
      row.original.teacherName ?? <span className="text-oxford-400">—</span>
    },
    {
      id: "actions",
      header: "Aksi",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => openDialog(row.original)}>
            <Pencil className="h-3 w-3" /> Edit
          </Button>
          <Button variant="outline" size="sm" className="text-red-600 hover:bg-red-50" onClick={() => setDeleting(row.original)}>
            <Trash2 className="h-3 w-3" /> Hapus
          </Button>
        </div>
      ),
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
  ], []);

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={() => openDialog(null)} className="bg-oxford-900 hover:bg-oxford-800">
          <Plus className="mr-2 h-4 w-4" /> Tambah Mata Pelajaran
        </Button>
      </div>
      <DataTable columns={columns} data={mapel} searchKey="name" />

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-heading text-xl text-oxford-950">{editing ? "Edit Mata Pelajaran" : "Tambah Mata Pelajaran"}</DialogTitle>
            <DialogDescription>Kode mata pelajaran harus unik, contoh: MAT101.</DialogDescription>
          </DialogHeader>
          <form onSubmit={onSubmit} className="grid gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-2 text-sm font-medium">
                Nama Mata Pelajaran
                <Input {...register("name")} placeholder="Matematika" />
                {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
              </label>
              <label className="space-y-2 text-sm font-medium">
                Kode
                <Input {...register("code")} placeholder="MAT101" />
                {errors.code && <p className="text-sm text-red-600">{errors.code.message}</p>}
              </label>
            </div>
            <label className="space-y-2 text-sm font-medium">
              Guru Pengampu
              <TeacherSelect value={watch("teacherId") ?? ""} onChange={(value) => setValue("teacherId", value)} teachers={teachers} />
            </label>
            {formError && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{formError}</p>}
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>Batal</Button>
              <Button type="submit" disabled={isPending} className="bg-oxford-900 hover:bg-oxford-800">
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {editing ? "Simpan Perubahan" : "Tambah Mata Pelajaran"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={Boolean(deleting)} onOpenChange={(open) => !open && setDeleting(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-heading text-xl text-oxford-950">Hapus Mata Pelajaran</DialogTitle>
            <DialogDescription>
              Yakin ingin menghapus <span className="font-semibold text-oxford-900">{deleting?.name}</span>? Mata pelajaran dengan data nilai tidak dapat dihapus.
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
    </div>
  );
}

export { KelasManager, MapelManager };
