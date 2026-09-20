"use client";
import { useEffect, useMemo, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type ColumnDef } from "@tanstack/react-table";
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
  createTeacherAction,
  deleteTeacherAction,
  updateTeacherAction,
} from "./actions";

export type TeacherRow = {
  id: string;
  name: string;
  username: string;
  email: string;
  nip: string;
  phone: string;
  subjects: string[];
  classCount: number;
};

type FormValues = {
  name: string;
  username: string;
  email: string;
  password?: string;
  nip: string;
  phone: string;
};

const teacherFormSchema = z.object({
  name: z.string().min(3, "Nama minimal 3 karakter"),
  username: z.string().trim().min(3, "Username minimal 3 karakter"),
  email: z.string().email("Email tidak valid"),
  password: z.string().optional(),
  nip: z.string().min(4, "NIP minimal 4 karakter"),
  phone: z.string().min(10, "Nomor HP tidak valid"),
});

function TeacherDialog({
  open,
  editing,
  onOpenChange,
}: {
  open: boolean;
  editing: TeacherRow | null;
  onOpenChange: (open: boolean) => void;
}) {
  const [isPending, startTransition] = useTransition();
  const form = useForm<FormValues>({
    resolver: zodResolver(teacherFormSchema),
    defaultValues: { name: "", username: "", email: "", password: "", nip: "", phone: "" },
  });

  useEffect(() => {
    if (!open) return;
    form.reset({
      name: editing?.name ?? "",
      username: editing?.username ?? "",
      email: editing?.email ?? "",
      password: "",
      nip: editing?.nip ?? "",
      phone: editing?.phone ?? "",
    });
  }, [editing, form, open]);

  const onSubmit = (values: FormValues) => {
    const formData = new FormData();
    formData.set("name", values.name);
    formData.set("username", values.username);
    formData.set("email", values.email);
    formData.set("password", values.password ?? "");
    formData.set("nip", values.nip);
    formData.set("phone", values.phone);
    startTransition(async () => {
      const result = editing
        ? await updateTeacherAction(editing.id, formData)
        : await createTeacherAction(formData);
      if (!result.success) {
        toast.error(result.message);
        return;
      }
      toast.success(result.message);
      onOpenChange(false);
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="font-heading text-xl text-oxford-950">
            {editing ? "Edit Guru" : "Tambah Guru"}
          </DialogTitle>
          <DialogDescription>
            {editing ? "Perbarui data guru. Biarkan password kosong untuk mempertahankan password saat ini." : "Lengkapi data guru baru. Password awal wajib diisi."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 sm:grid-cols-2">
          <label className="space-y-2 text-sm font-medium">
            Nama Lengkap
            <Input {...form.register("name")} placeholder="Nama guru" />
            {form.formState.errors.name && <p className="text-sm text-red-600">{form.formState.errors.name.message}</p>}
          </label>
          <label className="space-y-2 text-sm font-medium">
            NIP
            <Input {...form.register("nip")} placeholder="1990001234" />
            {form.formState.errors.nip && <p className="text-sm text-red-600">{form.formState.errors.nip.message}</p>}
          </label>
          <label className="space-y-2 text-sm font-medium">
            Username Login
            <Input {...form.register("username")} placeholder="guru01" autoComplete="username" />
            {form.formState.errors.username && <p className="text-sm text-red-600">{form.formState.errors.username.message}</p>}
          </label>
          <label className="space-y-2 text-sm font-medium">
            Email Kontak
            <Input {...form.register("email")} type="email" placeholder="guru@pkbm.id" />
            {form.formState.errors.email && <p className="text-sm text-red-600">{form.formState.errors.email.message}</p>}
          </label>
          <label className="space-y-2 text-sm font-medium">
            {editing ? "Password Baru (opsional)" : "Password"}
            <Input {...form.register("password")} type="password" placeholder="••••••••" />
            {form.formState.errors.password && <p className="text-sm text-red-600">{form.formState.errors.password.message}</p>}
          </label>
          <label className="space-y-2 text-sm font-medium">
            No. HP
            <Input {...form.register("phone")} placeholder="08xxxxxxxxxx" />
            {form.formState.errors.phone && <p className="text-sm text-red-600">{form.formState.errors.phone.message}</p>}
          </label>
          <DialogFooter className="sm:col-span-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Batal</Button>
            <Button type="submit" disabled={isPending} className="bg-oxford-900 hover:bg-oxford-800">
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {editing ? "Simpan Perubahan" : "Tambah Guru"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function TeacherManager({ teachers }: { teachers: TeacherRow[] }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<TeacherRow | null>(null);
  const [deleting, setDeleting] = useState<TeacherRow | null>(null);
  const [isPending, startTransition] = useTransition();

  const confirmDelete = () => {
    if (!deleting) return;
    startTransition(async () => {
      const result = await deleteTeacherAction(deleting.id);
      if (result.success) { toast.success(result.message); } else { toast.error(result.message); }
      setDeleting(null);
    });
  };

  const columns = useMemo<ColumnDef<TeacherRow>[]>(() => [
    { accessorKey: "name", header: "Nama", cell: ({ row }) => (
      <div>
        <p className="font-medium text-oxford-900">{row.original.name}</p>
        <p className="text-xs text-oxford-500">Login: {row.original.username}</p>
        <p className="text-xs text-oxford-400">{row.original.email}</p>
      </div>
    ) },
    { accessorKey: "nip", header: "NIP" },
    { accessorKey: "phone", header: "No. HP" },
    { accessorKey: "subjects", header: "Mata Pelajaran", cell: ({ row }) => (
      <div className="flex flex-wrap gap-1">
        {row.original.subjects.map((subject) => (
          <span key={subject} className="rounded-full bg-oxford-100 px-2 py-0.5 text-xs font-semibold text-oxford-800">{subject}</span>
        ))}
      </div>
    ) },
    { accessorKey: "classCount", header: "Wali Kelas", cell: ({ row }) => (
      row.original.classCount > 0
        ? <span className="font-semibold text-oxford-800">{row.original.classCount} kelas</span>
        : <span className="text-oxford-400">—</span>
    ) },
    {
      id: "actions",
      header: "Aksi",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => { setEditing(row.original); setDialogOpen(true); }}>
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
        <Button onClick={() => { setEditing(null); setDialogOpen(true); }} className="bg-oxford-900 hover:bg-oxford-800">
          <Plus className="mr-2 h-4 w-4" /> Tambah Guru
        </Button>
      </div>
      <DataTable columns={columns} data={teachers} searchKey="name" />
      <TeacherDialog open={dialogOpen} editing={editing} onOpenChange={setDialogOpen} />
      <Dialog open={Boolean(deleting)} onOpenChange={(open) => !open && setDeleting(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-heading text-xl text-oxford-950">Hapus Guru</DialogTitle>
            <DialogDescription>
              Yakin ingin menghapus <span className="font-semibold text-oxford-900">{deleting?.name}</span>? Akun login guru akan terhapus secara permanen.
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
