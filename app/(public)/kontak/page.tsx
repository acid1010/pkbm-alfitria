import { PageShell } from "@/components/shared/page-shell";
import { MapPin, Mail, Phone, Clock, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const contactItems = [
  {
    icon: MapPin,
    title: "Alamat Lengkap",
    content: "Kp. Peuntas RT 011/004, Desa Wanasari, Kec. Wanayasa, Kab. Purwakarta, Prov. Jawa Barat.",
    bg: "bg-oxford-50",
    iconColor: "text-oxford-600",
  },
  {
    icon: Mail,
    title: "Email",
    content: "info@pkbmalfitria.sch.id",
    bg: "bg-gold-50",
    iconColor: "text-gold-600",
  },
  {
    icon: Phone,
    title: "Telepon / WhatsApp",
    content: "0812-xxxx-xxxx",
    bg: "bg-green-50",
    iconColor: "text-green-600",
  },
];

const hours = [
  { day: "Senin - Kamis", time: "08:00 - 15:00 WIB", open: true },
  { day: "Jumat", time: "08:00 - 11:30 WIB", open: true },
  { day: "Sabtu - Minggu", time: "Tutup", open: false },
];

export default function KontakPage() {
  return (
    <PageShell
      title="Hubungi PKBM Al-Fitria"
      description="Informasi resmi untuk komunikasi, kolaborasi, dan pelayanan administrasi pendidikan."
    >
      <div className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-8">
          {/* Contact info */}
          <div className="rounded-2xl border border-oxford-100 bg-white p-6 md:p-8 shadow-sm">
            <h2 className="text-xl font-bold font-heading text-oxford-900 mb-6">Informasi Kontak</h2>
            <div className="space-y-5">
              {contactItems.map((item) => (
                <div key={item.title} className="flex gap-4 items-start">
                  <div className={`h-11 w-11 shrink-0 ${item.bg} rounded-xl flex items-center justify-center ${item.iconColor}`}>
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-oxford-900 text-sm">{item.title}</p>
                    <p className="text-oxford-600 text-sm leading-relaxed mt-0.5">{item.content}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-oxford-100">
              <Button asChild className="bg-green-600 hover:bg-green-500 text-white font-bold rounded-full px-6 h-11 shadow-md transition-all duration-300 cursor-pointer">
                <Link href="https://wa.me/62812xxxx" target="_blank" rel="noopener noreferrer">
                  <Phone className="mr-2 h-4 w-4" />
                  Chat via WhatsApp
                </Link>
              </Button>
            </div>
          </div>

          {/* Hours + Map placeholder */}
          <div className="space-y-6">
            {/* Operating hours */}
            <div className="rounded-2xl border border-oxford-100 bg-white p-6 md:p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="h-11 w-11 rounded-xl bg-oxford-50 flex items-center justify-center text-oxford-600">
                  <Clock className="h-5 w-5" />
                </div>
                <h3 className="font-heading font-bold text-oxford-900 text-lg">Jam Operasional</h3>
              </div>
              <ul className="space-y-0">
                {hours.map((h) => (
                  <li key={h.day} className="flex justify-between items-center border-b last:border-b-0 border-oxford-100 py-3">
                    <span className="text-oxford-700 text-sm">{h.day}</span>
                    <span className={`text-sm font-semibold ${h.open ? "text-oxford-900" : "text-oxford-400"}`}>
                      {h.time}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Map placeholder */}
            <div className="rounded-2xl border border-oxford-100 bg-oxford-50 overflow-hidden shadow-sm">
              <div className="aspect-video bg-oxford-100 flex flex-col items-center justify-center text-oxford-400 p-8">
                <MapPin className="h-10 w-10 mb-3 text-oxford-300" />
                <p className="text-sm font-semibold text-oxford-500 text-center">Lokasi PKBM Al-Fitria</p>
                <p className="text-xs text-oxford-400 text-center mt-1">Kec. Wanayasa, Kab. Purwakarta, Jawa Barat</p>
                <Button asChild variant="outline" size="sm" className="mt-4 rounded-full text-oxford-600 cursor-pointer">
                  <Link href="https://maps.google.com/?q=PKBM+Al-Fitria+Purwakarta" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-3 w-3" />
                    Buka di Google Maps
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
