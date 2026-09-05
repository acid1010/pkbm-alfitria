import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXTAUTH_URL ?? "https://pkbmalfitria.me";

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/profil", "/program", "/ppdb", "/ppdb/cek", "/modul", "/berita", "/kontak"],
        disallow: ["/admin", "/guru", "/siswa", "/api", "/admin/*", "/guru/*", "/siswa/*", "/api/*"],
      },
      {
        userAgent: "Googlebot",
        allow: ["/", "/profil", "/program", "/ppdb", "/ppdb/cek", "/modul", "/berita", "/kontak"],
        disallow: ["/admin", "/guru", "/siswa", "/api"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
