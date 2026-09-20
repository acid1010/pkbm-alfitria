"use client";

import { useState, useTransition } from "react";

import { Camera, CheckCircle2, Loader2 } from "lucide-react";

import { absenGuruAction, type AbsenResult, type TeacherOption } from "@/app/absensi/actions";
import { SelfieCapture } from "@/app/absensi/selfie-capture";
import { Button } from "@/components/ui/button";

export function GuruAbsenForm({ teachers }: { teachers: TeacherOption[] }) {
  const [teacherId, setTeacherId] = useState("");
  const [selfie, setSelfie] = useState<File | null>(null);
  const [result, setResult] = useState<AbsenResult | null>(null);
  const [isPending, startTransition] = useTransition();

  const reset = () => {
    setTeacherId("");
    setSelfie(null);
    setResult(null);
  };

  const submit = () => {
    if (!teacherId || !selfie) return;
    const formData = new FormData();
    formData.set("teacherId", teacherId);
    formData.set("selfie", selfie);
    startTransition(async () => setResult(await absenGuruAction(formData)));
  };

  if (result?.success) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center shadow-sm">
        <CheckCircle2 className="mx-auto h-14 w-14 text-emerald-600" />
        <h2 className="mt-4 font-heading text-3xl font-bold text-oxford-950">Absensi berhasil</h2>
        <p className="mt-2 text-oxford-700">{result.personName} tercatat hadir pukul {result.checkInAt} WIB.</p>
        <Button className="mt-6 bg-oxford-900 hover:bg-oxford-800" onClick={reset}>Absen guru lain</Button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-oxford-100 bg-white p-6 shadow-sm md:p-8">
      <div className="mb-7 flex items-center gap-3">
        <div className="rounded-xl bg-gold-100 p-3 text-gold-700"><Camera className="h-6 w-6" /></div>
        <div><h2 className="font-heading text-2xl font-bold text-oxford-950">Isi absensi guru</h2><p className="text-sm text-oxford-600">Pilih nama guru lalu ambil selfie untuk mencatat kehadiran hari ini.</p></div>
      </div>
      <div className="space-y-5">
        <label className="block text-sm font-semibold text-oxford-800">Nama guru
          <select value={teacherId} onChange={(event) => setTeacherId(event.target.value)} className="mt-2 flex h-12 w-full rounded-xl border border-oxford-200 bg-white px-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-gold-400" disabled={isPending}>
            <option value="">Pilih nama guru</option>
            {teachers.map((teacher) => <option key={teacher.id} value={teacher.id}>{teacher.name} · {teacher.nip}</option>)}
          </select>
        </label>
        <SelfieCapture value={selfie} onChange={(file) => { setSelfie(file); setResult(null); }} disabled={!teacherId || isPending} />
        {result && !result.success ? <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{result.message}</p> : null}
        <Button className="h-12 w-full bg-gold-500 font-bold text-oxford-950 hover:bg-gold-400" onClick={submit} disabled={!teacherId || !selfie || isPending}>
          {isPending ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Mencatat absensi...</> : "Kirim absensi"}
        </Button>
      </div>
    </div>
  );
}
