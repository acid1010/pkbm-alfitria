"use client";

import { useState, useTransition } from "react";
import { Camera, CheckCircle2, ChevronLeft, Loader2 } from "lucide-react";

import { absenAction, getSiswaByKelas, type AbsenResult } from "@/app/absensi/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type ClassOption = { id: string; name: string; grade: number; year: string };
type StudentOption = { id: string; name: string; nis: string };

export function AbsenForm({ classes }: { classes: ClassOption[] }) {
  const [classId, setClassId] = useState("");
  const [students, setStudents] = useState<StudentOption[]>([]);
  const [studentId, setStudentId] = useState("");
  const [selfie, setSelfie] = useState<File | null>(null);
  const [result, setResult] = useState<AbsenResult | null>(null);
  const [isLoadingStudents, startStudentTransition] = useTransition();
  const [isPending, startTransition] = useTransition();

  const selectClass = (nextClassId: string) => {
    setClassId(nextClassId);
    setStudentId("");
    setStudents([]);
    setSelfie(null);
    setResult(null);
    if (!nextClassId) return;

    startStudentTransition(async () => setStudents(await getSiswaByKelas(nextClassId)));
  };

  const reset = () => {
    setClassId("");
    setStudents([]);
    setStudentId("");
    setSelfie(null);
    setResult(null);
  };

  const submit = () => {
    if (!classId || !studentId || !selfie) return;
    const formData = new FormData();
    formData.set("classId", classId);
    formData.set("studentId", studentId);
    formData.set("selfie", selfie);
    startTransition(async () => setResult(await absenAction(formData)));
  };

  if (result?.success) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center shadow-sm">
        <CheckCircle2 className="mx-auto h-14 w-14 text-emerald-600" />
        <h2 className="mt-4 font-heading text-3xl font-bold text-oxford-950">Absensi berhasil</h2>
        <p className="mt-2 text-oxford-700">{result.studentName} tercatat hadir pukul {result.checkInAt} WIB.</p>
        <Button className="mt-6 bg-oxford-900 hover:bg-oxford-800" onClick={reset}>Absen untuk siswa lain</Button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-oxford-100 bg-white p-6 shadow-sm md:p-8">
      <div className="mb-7 flex items-center gap-3">
        <div className="rounded-xl bg-gold-100 p-3 text-gold-700"><Camera className="h-6 w-6" /></div>
        <div><h2 className="font-heading text-2xl font-bold text-oxford-950">Isi absensi</h2><p className="text-sm text-oxford-600">Foto selfie diperlukan untuk konfirmasi kehadiran.</p></div>
      </div>
      <div className="space-y-5">
        <label className="block text-sm font-semibold text-oxford-800">Kelas
          <select value={classId} onChange={(event) => selectClass(event.target.value)} className="mt-2 flex h-12 w-full rounded-xl border border-oxford-200 bg-white px-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-gold-400" disabled={isPending}>
            <option value="">Pilih kelas</option>
            {classes.map((classItem) => <option key={classItem.id} value={classItem.id}>{classItem.name} · {classItem.year}</option>)}
          </select>
        </label>
        <label className="block text-sm font-semibold text-oxford-800">Nama siswa
          <select value={studentId} onChange={(event) => setStudentId(event.target.value)} className="mt-2 flex h-12 w-full rounded-xl border border-oxford-200 bg-white px-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-gold-400 disabled:cursor-not-allowed disabled:bg-oxford-50" disabled={!classId || isLoadingStudents || isPending}>
            <option value="">{isLoadingStudents ? "Memuat siswa..." : "Pilih nama siswa"}</option>
            {students.map((student) => <option key={student.id} value={student.id}>{student.name} ({student.nis})</option>)}
          </select>
        </label>
        <label className="block text-sm font-semibold text-oxford-800">Selfie kehadiran
          <Input type="file" accept="image/jpeg,image/png" capture="user" className="mt-2 h-12 cursor-pointer rounded-xl border-oxford-200" onChange={(event) => setSelfie(event.target.files?.[0] ?? null)} disabled={!studentId || isPending} />
          <span className="mt-2 block text-xs font-normal text-oxford-500">JPG atau PNG, maksimal 5 MB.</span>
        </label>
        {selfie ? <p className="rounded-lg bg-oxford-50 px-3 py-2 text-sm text-oxford-700">Foto dipilih: {selfie.name}</p> : null}
        {result && !result.success ? <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{result.message}</p> : null}
        <Button className="h-12 w-full bg-gold-500 font-bold text-oxford-950 hover:bg-gold-400" onClick={submit} disabled={!classId || !studentId || !selfie || isPending}>
          {isPending ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Mencatat absensi...</> : "Kirim absensi"}
        </Button>
      </div>
    </div>
  );
}
