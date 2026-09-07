"use client";

import { useFormStatus } from "react-dom";
import { useActionState } from "react";
import { loginAction, type LoginState } from "@/app/(auth)/login/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GraduationCap, ArrowRight } from "lucide-react";
import Link from "next/link";

const initialState: LoginState = {};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="w-full bg-gold-500 hover:bg-gold-400 text-oxford-950 font-bold h-12 rounded-xl text-base shadow-md transition-all group" disabled={pending}>
      {pending ? "Memproses..." : "Masuk ke Portal"}
      {!pending && <ArrowRight className="ml-2 h-5 w-5 transform transition-transform group-hover:translate-x-1" />}
    </Button>
  );
}

export function LoginForm() {
  const [state, formAction] = useActionState(loginAction, initialState);

  return (
    <div className="flex min-h-screen bg-oxford-50 selection:bg-gold-500/30">
      <div className="hidden lg:flex w-1/2 bg-oxford-950 flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/galeri/siswa.jpeg"
            alt=""
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="absolute inset-0 pointer-events-none">
           <div className="absolute -top-20 -right-20 w-[600px] h-[600px] bg-gold-500/20 rounded-full blur-[100px]" />
           <div className="absolute -bottom-20 -left-20 w-[600px] h-[600px] bg-oxford-500/30 rounded-full blur-[100px]" />
        </div>

        <Link href="/" className="relative z-10 flex items-center gap-3 w-fit hover:opacity-80 transition-opacity">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-oxford-900 shadow-xl">
            <GraduationCap className="h-7 w-7" strokeWidth={1.5} />
          </div>
          <div>
            <span className="block font-heading text-2xl font-bold tracking-tight text-white leading-tight">
              PKBM Al-Fitria
            </span>
            <span className="block text-xs font-bold uppercase tracking-widest text-gold-400">
              Keunggulan Akademik
            </span>
          </div>
        </Link>

        <div className="relative z-10 max-w-lg">
          <h1 className="font-heading text-5xl font-bold text-white mb-6 leading-tight">
            Portal Layanan <br/>
            <span className="text-gold-400 italic">Akademik Terpadu</span>.
          </h1>
          <p className="text-oxford-300 text-lg leading-relaxed">
            Masuk untuk mengakses layanan E-Learning, rekap nilai, jadwal kelas, dan administrasi sekolah. Portal ini khusus untuk siswa, guru, dan staf manajemen PKBM Al-Fitria.
          </p>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 relative">
        <div className="absolute top-6 left-6 lg:hidden">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-oxford-900 text-gold-400 shadow-md">
              <GraduationCap className="h-6 w-6" strokeWidth={1.5} />
            </div>
            <span className="font-heading text-lg font-bold text-oxford-900">Al-Fitria</span>
          </Link>
        </div>

        <div className="w-full max-w-md bg-white p-10 lg:p-14 rounded-[2.5rem] shadow-[0_8px_40px_rgb(0,0,0,0.06)] border border-oxford-100">
          <div className="mb-10 text-center">
            <h2 className="font-heading text-3xl font-bold text-oxford-950 mb-3">Selamat Datang 👋</h2>
            <p className="text-oxford-500 font-medium">Buka sesi dengan kredensial portal Anda.</p>
          </div>

          <form action={formAction} className="space-y-6">
            <div className="space-y-3">
              <label htmlFor="email" className="text-sm font-bold uppercase tracking-wider text-oxford-800">
                Alamat Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="email@sekolah.id"
                required
                className="h-14 rounded-xl px-5 bg-oxford-50 border-oxford-200 focus-visible:ring-gold-500 focus-visible:ring-offset-2 text-lg"
              />
            </div>
            <div className="space-y-3">
              <label htmlFor="password" className="text-sm font-bold uppercase tracking-wider text-oxford-800 flex justify-between">
                <span>Kata Sandi</span>
                <Link href="#" className="text-gold-600 hover:text-gold-500 font-medium capitalize tracking-normal">Ganti Sandi?</Link>
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                required
                className="h-14 rounded-xl px-5 bg-oxford-50 border-oxford-200 focus-visible:ring-gold-500 focus-visible:ring-offset-2 text-lg"
              />
            </div>

            {state.error && (
              <div className="p-4 rounded-xl bg-red-50 text-red-700 border border-red-200/50 text-sm font-medium flex items-center justify-center">
                {state.error}
              </div>
            )}

            <div className="pt-2">
              <SubmitButton />
            </div>
          </form>

          <p className="mt-10 text-center text-sm font-medium text-oxford-500">
            Belum memiliki akses? <Link href="/ppdb" className="text-oxford-900 font-bold hover:text-gold-600 transition-colors">Daftar PPDB Baru</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
