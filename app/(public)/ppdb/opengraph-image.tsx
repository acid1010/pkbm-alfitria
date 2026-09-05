import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Pendaftaran PPDB PKBM Al-Fitria";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#1e293b",
          backgroundImage: "radial-gradient(circle at 25px 25px, #334155 2%, transparent 0%), radial-gradient(circle at 75px 75px, #334155 2%, transparent 0%)",
          backgroundSize: "100px 100px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "60px 80px",
            background: "linear-gradient(135deg, rgba(226, 168, 47, 0.1), rgba(30, 41, 59, 0.9))",
            borderRadius: "40px",
            border: "3px solid rgba(226, 168, 47, 0.3)",
          }}
        >
          <div
            style={{
              fontSize: 64,
              fontWeight: 900,
              background: "linear-gradient(90deg, #e2a82f 0%, #f5d47d 100%)",
              backgroundClip: "text",
              color: "transparent",
              marginBottom: "25px",
              textAlign: "center",
            }}
          >
            Pendaftaran PPDB
          </div>
          <div
            style={{
              fontSize: 32,
              color: "#cbd5e1",
              marginBottom: "50px",
              textAlign: "center",
            }}
          >
            PKBM Al-Fitria Purwakarta
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              width: "100%",
              maxWidth: "800px",
            }}
          >
            {[
              "✓ Bebas Usia & Domisili",
              "✓ Biaya Terjangkau, Bisa Dicicil",
              "✓ Pembelajaran Online & Offline",
              "✓ Ijazah Resmi Negara",
            ].map((feature) => (
              <div
                key={feature}
                style={{
                  fontSize: 28,
                  color: "#e2a82f",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {feature}
              </div>
            ))}
          </div>
          <div
            style={{
              marginTop: "50px",
              padding: "20px 50px",
              background: "#e2a82f",
              borderRadius: "15px",
              fontSize: 32,
              fontWeight: 900,
              color: "#1e293b",
            }}
          >
            Daftar Sekarang!
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
