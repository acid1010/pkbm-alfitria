import type { Metadata } from "next";
import { redirect } from "next/navigation";


export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Absensi Mandiri",
  robots: { index: false, follow: false },
};

export default function AbsensiPage() {
  redirect("/absensi/murid");
}
