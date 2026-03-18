"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu, X, BookOpen, User, Phone } from "lucide-react";

const navLinks = [
  { href: "/program", label: "Program Studi" },
  { href: "/modul", label: "Portal Modul", icon: BookOpen },
  { href: "/ppdb", label: "Informasi PPDB" },
  { href: "/berita", label: "Berita" },
  { href: "/kontak", label: "Kontak" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-oxford-100 bg-white/95 backdrop-blur-md shadow-sm transition-all duration-300">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-80 group" onClick={() => setMobileOpen(false)}>
          <Image
            src="/logo.png"
            alt="Logo PKBM Al-Fitria"
            width={44}
            height={49}
            className="group-hover:scale-105 transition-transform duration-300"
          />
          <div>
            <span className="block font-heading text-xl font-bold tracking-tight text-oxford-900 leading-tight">
              PKBM Al-Fitria
            </span>
            <span className="block text-[11px] font-bold uppercase tracking-widest text-oxford-400">
              Pendidikan Kesetaraan
            </span>
          </div>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden lg:flex flex-1 items-center justify-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-1.5 text-[13px] uppercase font-bold tracking-wider text-oxford-600 hover:text-gold-600 transition-colors relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-gold-500 hover:after:w-full after:transition-all after:duration-300"
            >
              {link.icon ? <link.icon className="h-4 w-4" /> : null}
              <span>{link.label}</span>
            </Link>
          ))}
        </div>

        {/* Desktop actions */}
        <div className="hidden lg:flex items-center gap-3">
          <Button asChild variant="ghost" className="font-semibold text-oxford-800 hover:text-oxford-900 hover:bg-oxford-50 rounded-full px-6 gap-2 cursor-pointer">
            <Link href="/login">
              <User className="h-4 w-4" />
              <span>Login</span>
            </Link>
          </Button>
          <Button asChild className="bg-gold-500 text-oxford-950 font-bold hover:bg-gold-400 shadow-md hover:shadow-lg transition-all duration-300 rounded-full px-7 cursor-pointer">
            <Link href="/ppdb">Daftar Sekarang</Link>
          </Button>
        </div>

        {/* Mobile hamburger */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden text-oxford-900 hover:bg-oxford-50 rounded-full cursor-pointer"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label={mobileOpen ? "Tutup menu" : "Buka menu"}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile menu */}
      {mobileOpen ? (
        <div className="lg:hidden border-t border-oxford-100 bg-white animate-fade-in">
          <div className="container mx-auto px-4 py-6 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-oxford-700 hover:bg-oxford-50 hover:text-oxford-900 font-semibold transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.icon ? <link.icon className="h-5 w-5 text-oxford-400" /> : null}
                {link.label}
              </Link>
            ))}
            <div className="border-t border-oxford-100 my-4" />
            <div className="flex flex-col gap-3 px-4">
              <Button asChild variant="outline" className="w-full rounded-full h-12 font-semibold cursor-pointer">
                <Link href="/login" onClick={() => setMobileOpen(false)}>
                  <User className="mr-2 h-4 w-4" />
                  Login Portal
                </Link>
              </Button>
              <Button asChild className="w-full bg-gold-500 text-oxford-950 font-bold hover:bg-gold-400 rounded-full h-12 cursor-pointer">
                <Link href="/ppdb" onClick={() => setMobileOpen(false)}>
                  Daftar Sekarang
                </Link>
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </nav>
  );
}
