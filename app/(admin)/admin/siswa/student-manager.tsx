"use client";
import { useMemo, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type ColumnDef } from "@tanstack/react-table";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { z } from "zod";
import {
  createStudentAction,
  deleteStudentAction,
  updateStudentAction,
} from "./actions";

export type StudentRow = {
  id: string;
  name: string;
  email: string;
  nis: string;
  className: string | null;
  classId: string | null;
  phone: string;
  address: string;
  birthdate: string; // yyyy-mm-dd for <input type="date">
};

export type ClassOption = {
  id: string;
  name: string;
  year: string;
};

type FormValues = {
  name: string;
  email: string;
  password?: string;
  nis: string;
  classId?: string;
  birthdate: string;
  address: string;
  phone: string;
};

// Mirror of the server schema for inline validation; password optional on edit
const studentFormSchema = z.object({
  name: z.string().min(3, "Nama minimal 3 karakter"),
  email: z.string().email("Email tidak valid"),
  password: z.string().optional(),
  nis: z.string().min(4, "NIS minimal 4 karakter"),
  classId: z.string().optional(),
  birthdate: z.string().min(1, "Tanggal lahir wajib diisi"),
  address: z.string().min(5, "Alamat terlalu pendek"),
  phone: z.string().min(10, "Nomor HP tidak valid"),
});

function StudentDialog({
  open,
  editing,
  classes,
  onOpenChange,
  onSaved,
}: {
  open: boolean;
  editing: StudentRow | null;
  classes: ClassOption[];
  onOpenChange: (open: boolean) => void;
  onSaved: (result: { success: boolean; message: string }) => void;
}) {
  const [isPending, startTransition] = useTransition();
  const form = useForm<FormValues>({
    resolver: zodResolver(studentFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      nis: "",
      classId: "",
      birthdate: "",
      address: "",
      phone: "",
    },
  });

  // Reset the form whenever the dialog target changes (create vs edit)
  const key = editing?.id ?? "new";
  useMemo(() => {
    form.reset({
      name: editing?.name ?? "",
      email: editing?.email ?? "",
      password: "",
      nis: editing?.nis ?? "",
      classId: editing?.classId ?? "",
      birthdate: editing?.birthdate ?? "",
      address: editing?.address ?? "",
      phone: editing?.phone ?? "",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, open]);

  const onSubmit = (values: FormValues) => {
    const formData = new FormData();
    Object.entries(values).forEach(([field, value]) => {
      if (value !== undefined && value !== "") formData.set(field, String(value));
    });
    startTransition(async () => {
      const result = editing
        ? await updateStudentAction(editing.id, formData)
        : await createStudentAction(formData);
      if (!result.success) {
        toast.error(result.message);
        return;
      }
      toast.success(result.message);
      onOpenChange(false);
      onSaved(result);
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="font-heading text-xl text-oxford-950">
            {editing ? "Edit Siswa" : "Tambah Siswa"}
          </DialogTitle>
          <DialogDescription>
            {editing ? "Perbarui data siswa. Biarkan password kosong untuk mempertahankan password saat ini." : "Lengkapi data siswa baru. Password awal wajib diisi."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 sm:grid-cols-2">
            <FormField control={form.control} name="name" render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Lengkap</FormLabel>
                <FormControl><Input {...field} placeholder="Nama siswa" /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="nis" render={({ field }) => (
              <FormItem>
                <FormLabel>NIS</FormLabel>
                <FormControl><Input {...field} placeholder="2026100001" /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="email" render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl><Input {...field} type="email" placeholder="siswa@pkbm.id" /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="password" render={({ field }) => (
              <FormItem>
                <FormLabel>{editing ? "Password Baru (opsional)" : "Password"}</FormLabel>
                <FormControl><Input {...field} type="password" placeholder="••••••••" /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="classId" render={({ field }) => (
              <FormItem>
                <FormLabel>Kelas</FormLabel>
                <FormControl>
                  <select {...field} className="h-9 w-full rounded-md border border-slate-200 bg-transparent px-3 py-1 text-sm shadow-sm">
                    <option value="">— Belum ditempatkan —</option>
                    {classes.map((kelas) => (
                      <option key={kelas.id} value={kelas.id}>{kelas.name} · {kelas.year}</option>
                    ))}
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="birthdate" render={({ field }) => (
              <FormItem>
                <FormLabel>Tanggal Lahir</FormLabel>
                <FormControl><Input {...field} type="date" /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="phone" render={({ field }) => (
              <FormItem>
                <FormLabel>No. HP</FormLabel>
                <FormControl><Input {...field} placeholder="08xxxxxxxxxx" /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="address" render={({ field }) => (
              <FormItem className="sm:col-span-2">
                <FormLabel>Alamat</FormLabel>
                <FormControl><Input {...field} placeholder="Alamat lengkap siswa" /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <DialogFooter className="sm:col-span-2">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Batal</Button>
              <Button type="submit" disabled={isPending} className="bg-oxford-900 hover:bg-oxford-800">
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {editing ? "Simpan Perubahan" : "Tambah Siswa"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export function StudentManager({ students, classes }: { students: StudentRow[]; classes: ClassOption[] }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<StudentRow | null>(null);
  const [deleting, setDeleting] = useState<StudentRow | null>(null);
  const [isPending, startTransition] = useTransition();

  const openCreate = () => {
    setEditing(null);
    setDialogOpen(true);
  };
  const openEdit = (student: StudentRow) => {
    setEditing(student);
    setDialogOpen(true);
  };

  const confirmDelete = () => {
    if (!deleting) return;
    startTransition(async () => {
      const result = await deleteStudentAction(deleting.id);
      if (result.success) { toast.success(result.message); } else { toast.error(result.message); }
      setDeleting(null);
    });
  };

  const columns = useMemo<ColumnDef<StudentRow>[]>(() => [
    { accessorKey: "name", header: "Nama", cell: ({ row }) => (
      <div>
        <p className="font-medium text-oxford-900">{row.original.name}</p>
        <p className="text-xs text-oxford-500">{row.original.email}</p>
      </div>
    ) },
    { accessorKey: "nis", header: "NIS" },
    { accessorKey: "className", header: "Kelas", cell: ({ row }) =>
      row.original.className ? <Badge variant="secondary">{row.original.className}</Badge> : <span className="text-oxford-400">—</span>
    },
    { accessorKey: "phone", header: "No. HP" },
    {
      id: "actions",
      header: "Aksi",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => openEdit(row.original)}>
            <Pencil className="h-3 w-3" /> Edit
          </Button>
          <Button variant="outline" size="sm" className="text-red-600 hover:bg-red-50" onClick={() => setDeleting(row.original)}>
            <Trash2 className="h-3 w-3" /> Hapus
          </Button>
        </div>
      ),
    },
  ], []);

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={openCreate} className="bg-oxford-900 hover:bg-oxford-800">
          <Plus className="mr-2 h-4 w-4" /> Tambah Siswa
        </Button>
      </div>
      <DataTable columns={columns} data={students} searchKey="name" />
      <StudentDialog
        open={dialogOpen}
        editing={editing}
        classes={classes}
        onOpenChange={setDialogOpen}
        onSaved={() => undefined}
      />
      <Dialog open={Boolean(deleting)} onOpenChange={(open) => !open && setDeleting(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-heading text-xl text-oxford-950">Hapus Siswa</DialogTitle>
            <DialogDescription>
              Yakin ingin menghapus <span className="font-semibold text-oxford-900">{deleting?.name}</span>? Akun login beserta data absensi, nilai, dan dokumen siswa akan ikut terhapus secara permanen.
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
