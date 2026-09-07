import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { OrganizationStructuredData } from "@/components/shared/structured-data";


const playfair = Playfair_Display({ 
  subsets: ["latin"], 
  variable: "--font-heading",
});

const jakarta = Plus_Jakarta_Sans({ 
  subsets: ["latin"], 
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    default: "PKBM Al-Fitria — Sekolah Kesetaraan Purwakarta",
    template: "%s | PKBM Al-Fitria",
  },
  description:
    "PKBM Al-Fitria adalah sekolah kesetaraan terakreditasi di Desa Taringgul Tonggoh, Kec. Wanayasa, Purwakarta, Jawa Barat. Program Paket A, B, C dengan ijazah resmi negara, biaya terjangkau, dan pembelajaran fleksibel.",
  keywords: [
    "PKBM Al-Fitria",
    "sekolah kesetaraan",
    "Paket A",
    "Paket B",
    "Paket C",
    "pendidikan kesetaraan",
    "Purwakarta",
    "ijazah negara",
    "pendidikan nonformal",
    "PKBM Purwakarta",
    "kejar paket",
    "sekolah paket",
    "Wanayasa",
    "Taringgul Tonggoh",
    "kejar paket Purwakarta",
    "sekolah kesetaraan online",
    "PKBM terakreditasi",
    "ijazah resmi",
    "pendidikan fleksibel",
  ],
  authors: [{ name: "PKBM Al-Fitria" }],
  creator: "PKBM Al-Fitria",
  publisher: "PKBM Al-Fitria",
  metadataBase: new URL(process.env.NEXTAUTH_URL ?? "https://pkbmalfitria.me"),
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "PKBM Al-Fitria",
    title: "PKBM Al-Fitria — Sekolah Kesetaraan Purwakarta",
    description:
      "Sekolah kesetaraan terakreditasi di Desa Taringgul Tonggoh, Kec. Wanayasa, Purwakarta. Program Paket A, B, C dengan ijazah resmi negara, biaya terjangkau, dan pembelajaran fleksibel.",
    images: [{ url: "/logo.png", alt: "Logo PKBM Al-Fitria" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "PKBM Al-Fitria — Sekolah Kesetaraan Purwakarta",
    description:
      "Sekolah kesetaraan terakreditasi di Purwakarta. Program Paket A, B, C dengan ijazah resmi negara.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  verification: {
    google: "google-site-verification-code", // Replace with actual verification code from Google Search Console
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" data-scroll-behavior="smooth">
      <head>
        <OrganizationStructuredData />
      </head>
      <body className={`${jakarta.variable} ${playfair.variable} font-sans antialiased text-slate-800 selection:bg-indigo-100 selection:text-indigo-900 bg-slate-50`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
