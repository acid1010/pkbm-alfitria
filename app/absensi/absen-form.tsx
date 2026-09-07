"use client";
import { useEffect, useRef, useState, useTransition } from "react";
import { Camera, CheckCircle2, Loader2, RefreshCw, X } from "lucide-react";
import { absenAction, getSiswaByKelas, type AbsenResult } from "@/app/absensi/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
type ClassOption = { id: string; name: string; grade: number; year: string };
type StudentOption = { id: string; name: string; nis: string };
export function AbsenForm({ classes }: { classes: ClassOption[] }) {
  const [classId, setClassId] = useState("");
  const [students, setStudents] = useState<StudentOption[]>([]);
  const [studentId, setStudentId] = useState("");
  const [search, setSearch] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selfie, setSelfie] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [cameraFailed, setCameraFailed] = useState(false); // fallback: capture input
  const [result, setResult] = useState<AbsenResult | null>(null);
  const [isLoadingStudents, startStudentTransition] = useTransition();
  const [isPending, startTransition] = useTransition();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const stopCamera = () => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    setCameraOpen(false);
  };

  // Release the camera if the user navigates away mid-session
  useEffect(() => () => stopCamera(), []);

  const clearSelfie = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setSelfie(null);
  };

  const selectClass = (nextClassId: string) => {
    setClassId(nextClassId);
    setStudentId("");
    setStudents([]);
    setSearch("");
    setDropdownOpen(false);
    clearSelfie();
    setResult(null);
    if (!nextClassId) return;
    startStudentTransition(async () => setStudents(await getSiswaByKelas(nextClassId)));
  };

  const reset = () => {
    setClassId("");
    setStudents([]);
    setStudentId("");
    setSearch("");
    setDropdownOpen(false);
    clearSelfie();
    setResult(null);
  };

  // Filter loaded roster by name or NIS (client-side; roster is already in memory)
  const query = search.trim().toLowerCase();
  const filteredStudents = query
    ? students.filter(
        (student) =>
          student.name.toLowerCase().includes(query) || student.nis.includes(query),
      )
    : students;
  const selectedStudent = students.find((student) => student.id === studentId);

  const pickStudent = (student: StudentOption) => {
    setStudentId(student.id);
    setSearch(`${student.name} (${student.nis})`);
    setDropdownOpen(false);
    setResult(null);
    clearSelfie();
  };

  const onSearchChange = (value: string) => {
    setSearch(value);
    setDropdownOpen(true);
    // Editing the text invalidates the current selection
    if (studentId) setStudentId("");
  };

  const onSearchKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const first = filteredStudents[0];
      if (first) pickStudent(first);
    } else if (event.key === "Escape") {
      setDropdownOpen(false);
    }
  };

  const openCamera = async () => {
    setResult(null);
    clearSelfie();
    if (!navigator.mediaDevices?.getUserMedia) {
      setCameraFailed(true);
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });
      streamRef.current = stream;
      setCameraOpen(true);
      requestAnimationFrame(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play().catch(() => undefined);
        }
      });
    } catch {
      // Permission denied or no camera → fall back to the capture input
      setCameraFailed(true);
    }
  };

  const snap = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas || !video.videoWidth) return;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext("2d");
    if (!context) return;
    // Mirror horizontally so the saved photo matches the selfie preview
    context.translate(canvas.width, 0);
    context.scale(-1, 1);
    context.drawImage(video, 0, 0);
    canvas.toBlob(
      (blob) => {
        if (!blob) return;
        setSelfie(new File([blob], "selfie.jpg", { type: "image/jpeg" }));
        setPreviewUrl(URL.createObjectURL(blob));
        stopCamera();
      },
      "image/jpeg",
      0.9,
    );
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
        <div><h2 className="font-heading text-2xl font-bold text-oxford-950">Isi absensi</h2><p className="text-sm text-oxford-600">Foto selfie diambil langsung dari kamera untuk konfirmasi kehadiran.</p></div>
      </div>
      <div className="space-y-5">
        <label className="block text-sm font-semibold text-oxford-800">Kelas
          <select value={classId} onChange={(event) => selectClass(event.target.value)} className="mt-2 flex h-12 w-full rounded-xl border border-oxford-200 bg-white px-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-gold-400" disabled={isPending}>
            <option value="">Pilih kelas</option>
            {classes.map((classItem) => <option key={classItem.id} value={classItem.id}>{classItem.name} · {classItem.year}</option>)}
          </select>
        </label>
        <label className="block text-sm font-semibold text-oxford-800">Nama siswa
          <div className="relative">
            <input
              type="text"
              role="combobox"
              aria-expanded={dropdownOpen}
              aria-controls="siswa-listbox"
              aria-autocomplete="list"
              aria-label="Cari dan pilih nama siswa"
              autoComplete="off"
              placeholder={isLoadingStudents ? "Memuat siswa..." : classId ? "Ketik nama atau NIS..." : "Pilih kelas terlebih dahulu"}
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
              onKeyDown={onSearchKeyDown}
              onFocus={() => students.length > 0 && setDropdownOpen(true)}
              className="mt-2 flex h-12 w-full rounded-xl border border-oxford-200 bg-white px-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-gold-400 disabled:cursor-not-allowed disabled:bg-oxford-50"
              disabled={!classId || isLoadingStudents || isPending}
            />
            {selectedStudent && !dropdownOpen ? (
              <span className="pointer-events-none absolute right-3 top-1/2 mt-1 -translate-y-1/2 rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-800">Dipilih</span>
            ) : null}
            {dropdownOpen && (isLoadingStudents || classId) ? (
              <>
                {/* Click-away layer */}
                <div className="fixed inset-0 z-10" onClick={() => setDropdownOpen(false)} aria-hidden="true" />
                <div role="listbox" aria-label="Hasil pencarian siswa" id="siswa-listbox" className="absolute z-20 mt-1 max-h-60 w-full overflow-y-auto rounded-xl border border-oxford-200 bg-white shadow-lg">
                  {isLoadingStudents ? (
                    <p className="px-3 py-3 text-sm text-oxford-500">Memuat siswa...</p>
                  ) : filteredStudents.length ? (
                    filteredStudents.map((student) => (
                      <button
                        key={student.id}
                        type="button"
                        role="option"
                        aria-selected={student.id === studentId}
                        onClick={() => pickStudent(student)}
                        className={`flex w-full items-center justify-between px-3 py-2.5 text-left text-sm hover:bg-oxford-50 ${student.id === studentId ? "bg-gold-50 font-semibold text-oxford-950" : "text-oxford-800"}`}
                      >
                        <span>{student.name}</span>
                        <span className="text-xs text-oxford-500">{student.nis}</span>
                      </button>
                    ))
                  ) : (
                    <p className="px-3 py-3 text-sm text-oxford-500">Tidak ada siswa yang cocok dengan “{search}”.</p>
                  )}
                </div>
              </>
            ) : null}
          </div>
          <span className="mt-2 block text-xs font-normal text-oxford-500">Ketik untuk mencari nama atau NIS, lalu pilih dari daftar.</span>
        </label>
        <div className="block text-sm font-semibold text-oxford-800">Selfie kehadiran
          {cameraOpen ? (
            <div className="mt-2 space-y-3">
              <div className="overflow-hidden rounded-xl border border-oxford-200 bg-oxford-950">
                <video ref={videoRef} playsInline muted autoPlay className="w-full -scale-x-100" />
              </div>
              <div className="flex gap-2">
                <Button type="button" onClick={snap} className="h-12 flex-1 bg-gold-500 font-bold text-oxford-950 hover:bg-gold-400">
                  <Camera className="mr-2 h-4 w-4" /> Ambil Foto
                </Button>
                <Button type="button" variant="outline" onClick={stopCamera} className="h-12">
                  <X className="mr-1 h-4 w-4" /> Tutup
                </Button>
              </div>
            </div>
          ) : selfie && previewUrl ? (
            <div className="mt-2 space-y-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={previewUrl} alt="Pratinjau selfie" className="w-44 rounded-xl border border-oxford-200" />
              <Button type="button" variant="outline" onClick={openCamera} disabled={!studentId || isPending} className="h-12">
                <RefreshCw className="mr-2 h-4 w-4" /> Ambil Ulang
              </Button>
            </div>
          ) : cameraFailed ? (
            // getUserMedia unavailable/denied → native camera capture as fallback
            <>
              <Input type="file" accept="image/*" capture="user" className="mt-2 h-12 cursor-pointer rounded-xl border-oxford-200" onChange={(event) => setSelfie(event.target.files?.[0] ?? null)} disabled={!studentId || isPending} />
              <span className="mt-2 block text-xs font-normal text-oxford-500">Kamera tidak tersedia — gunakan tombol di atas untuk membuka kamera perangkat. JPG/PNG, maksimal 5 MB.</span>
            </>
          ) : (
            <>
              <Button type="button" onClick={openCamera} disabled={!studentId || isPending} className="mt-2 h-12 w-full bg-oxford-900 hover:bg-oxford-800">
                <Camera className="mr-2 h-5 w-5" /> Buka Kamera
              </Button>
              <span className="mt-2 block text-xs font-normal text-oxford-500">Foto hanya dapat diambil langsung dari kamera (JPG, maksimal 5 MB). Unggah berkas tidak diizinkan.</span>
            </>
          )}
          {selfie && !previewUrl ? <p className="mt-2 rounded-lg bg-oxford-50 px-3 py-2 text-sm text-oxford-700">Foto dipilih: {selfie.name}</p> : null}
          <canvas ref={canvasRef} className="hidden" />
        </div>
        {result && !result.success ? <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{result.message}</p> : null}
        <Button className="h-12 w-full bg-gold-500 font-bold text-oxford-950 hover:bg-gold-400" onClick={submit} disabled={!classId || !studentId || !selfie || isPending}>
          {isPending ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Mencatat absensi...</> : "Kirim absensi"}
        </Button>
      </div>
    </div>
  );
}
