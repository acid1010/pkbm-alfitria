import Image from "next/image";
import { signOut } from "@/lib/auth";
import { LogOut } from "lucide-react";

export async function logoutAction() {
  "use server";
  await signOut({ redirectTo: "/login" });
}

type PortalHeaderProps = {
  portal: string;
};

export function PortalHeader({ portal }: PortalHeaderProps) {
  return (
    <header className="flex h-16 items-center justify-between border-b border-oxford-800 bg-oxford-950 px-4 lg:px-8">
      <div className="flex items-center gap-3">
        <Image src="/logo.png" alt="Logo PKBM Al-Fitria" width={32} height={36} />
        <div>
          <span className="block font-heading text-base font-bold tracking-tight text-white leading-tight">PKBM Al-Fitria</span>
          <span className="block text-[10px] font-bold uppercase tracking-widest text-gold-400">{portal}</span>
        </div>
      </div>
      <form action={logoutAction}>
        <button
          type="submit"
          className="flex items-center gap-2 rounded-full border border-oxford-700 px-4 py-2 text-sm font-semibold text-oxford-200 transition-colors hover:border-gold-500 hover:text-gold-300 cursor-pointer"
        >
          <LogOut className="h-4 w-4" />
          Keluar
        </button>
      </form>
    </header>
  );
}
