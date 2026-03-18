import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const playfair = Playfair_Display({ 
  subsets: ["latin"], 
  variable: "--font-heading",
});

const jakarta = Plus_Jakarta_Sans({ 
  subsets: ["latin"], 
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Portal Pendidikan PKBM",
  description: "Portal akademik terpadu dan layanan pendidikan progresif.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${jakarta.variable} ${playfair.variable} font-sans antialiased text-slate-800 selection:bg-indigo-100 selection:text-indigo-900 bg-slate-50`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
