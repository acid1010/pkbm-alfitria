/**
 * JSON-LD Structured Data component for SEO
 * Provides rich snippets for search engines (Google, Bing, etc.)
 */

export function OrganizationStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "PKBM Al-Fitria",
    alternateName: "Pusat Kegiatan Belajar Masyarakat Al-Fitria",
    url: "https://pkbmalfitria.me",
    logo: "https://pkbmalfitria.me/logo.png",
    description:
      "PKBM Al-Fitria adalah Pusat Kegiatan Belajar Masyarakat terakreditasi yang menyelenggarakan pendidikan kesetaraan Paket A (SD), Paket B (SMP), dan Paket C (SMA) di Purwakarta, Jawa Barat.",
    image: "https://pkbmalfitria.me/galeri/kegiatan.jpeg",
    telephone: "+62-878-0531-2348",
    email: "info@pkbmalfitria.sch.id",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Kp. Peuntas RT 011/004",
      addressLocality: "Desa Taringgul Tonggoh, Kecamatan Wanayasa",
      addressRegion: "Jawa Barat",
      postalCode: "41167",
      addressCountry: "ID",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -6.5846,
      longitude: 107.4436,
    },
    founder: {
      "@type": "Person",
      name: "Eva Fitria Latifah",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+62-878-0531-2348",
      contactType: "Admissions",
      areaServed: "ID",
      availableLanguage: ["Indonesian"],
    },
    sameAs: [
      "https://www.facebook.com/pkbmalfitria",
      "https://www.instagram.com/pkbmalfitria",
      "https://www.youtube.com/@pkbmalfitria",
    ],
    areaServed: {
      "@type": "Country",
      name: "Indonesia",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Program Pendidikan Kesetaraan",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "EducationalOccupationalProgram",
            name: "Paket A",
            description: "Program Kesetaraan setara SD/MI",
            educationalCredentialAwarded: "Ijazah Paket A setara SD/MI",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "EducationalOccupationalProgram",
            name: "Paket B",
            description: "Program Kesetaraan setara SMP/MTs",
            educationalCredentialAwarded: "Ijazah Paket B setara SMP/MTs",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "EducationalOccupationalProgram",
            name: "Paket C",
            description: "Program Kesetaraan setara SMA/MA",
            educationalCredentialAwarded: "Ijazah Paket C setara SMA/MA",
          },
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export function BreadcrumbStructuredData({ items }: { items: Array<{ name: string; url: string }> }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export function FAQStructuredData({ faqs }: { faqs: Array<{ question: string; answer: string }> }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export function ArticleStructuredData({
  title,
  description,
  image,
  datePublished,
  dateModified,
  author,
}: {
  title: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  author: string;
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: description,
    image: image,
    datePublished: datePublished,
    dateModified: dateModified ?? datePublished,
    author: {
      "@type": "Organization",
      name: author,
    },
    publisher: {
      "@type": "Organization",
      name: "PKBM Al-Fitria",
      logo: {
        "@type": "ImageObject",
        url: "https://pkbmalfitria.me/logo.png",
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
