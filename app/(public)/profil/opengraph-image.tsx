import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Profil PKBM Al-Fitria";
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
              fontSize: 56,
              fontWeight: 900,
              background: "linear-gradient(90deg, #e2a82f 0%, #f5d47d 100%)",
              backgroundClip: "text",
              color: "transparent",
              marginBottom: "30px",
              textAlign: "center",
            }}
          >
            Profil PKBM Al-Fitria
          </div>
          <div
            style={{
              fontSize: 28,
              color: "#cbd5e1",
              marginBottom: "40px",
              textAlign: "center",
              lineHeight: 1.4,
              maxWidth: "900px",
            }}
          >
            Pusat Kegiatan Belajar Masyarakat Terakreditasi
            <br />
            di Desa Taringgul Tonggoh, Kec. Wanayasa, Purwakarta
          </div>
          <div
            style={{
              display: "flex",
              gap: "30px",
              marginTop: "20px",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ fontSize: 48, fontWeight: 900, color: "#e2a82f" }}>224</div>
              <div style={{ fontSize: 20, color: "#94a3b8" }}>Warga Belajar</div>
            </div>
            <div style={{ width: "2px", background: "#334155" }} />
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ fontSize: 48, fontWeight: 900, color: "#e2a82f" }}>4</div>
              <div style={{ fontSize: 20, color: "#94a3b8" }}>Tenaga Pengajar</div>
            </div>
            <div style={{ width: "2px", background: "#334155" }} />
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ fontSize: 48, fontWeight: 900, color: "#e2a82f" }}>C</div>
              <div style={{ fontSize: 20, color: "#94a3b8" }}>Akreditasi</div>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
