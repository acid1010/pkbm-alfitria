import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "PKBM Al-Fitria - Sekolah Kesetaraan Purwakarta";
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
            padding: "80px",
            background: "linear-gradient(135deg, rgba(226, 168, 47, 0.1), rgba(30, 41, 59, 0.9))",
            borderRadius: "40px",
            border: "3px solid rgba(226, 168, 47, 0.3)",
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 900,
              background: "linear-gradient(90deg, #e2a82f 0%, #f5d47d 100%)",
              backgroundClip: "text",
              color: "transparent",
              marginBottom: "20px",
              textAlign: "center",
              letterSpacing: "-0.02em",
            }}
          >
            PKBM Al-Fitria
          </div>
          <div
            style={{
              fontSize: 36,
              color: "#cbd5e1",
              marginBottom: "30px",
              textAlign: "center",
            }}
          >
            Sekolah Kesetaraan Purwakarta
          </div>
          <div
            style={{
              display: "flex",
              gap: "20px",
              marginTop: "20px",
            }}
          >
            {["Paket A", "Paket B", "Paket C"].map((paket) => (
              <div
                key={paket}
                style={{
                  padding: "15px 35px",
                  background: "rgba(226, 168, 47, 0.15)",
                  border: "2px solid #e2a82f",
                  borderRadius: "12px",
                  fontSize: 28,
                  fontWeight: 700,
                  color: "#e2a82f",
                }}
              >
                {paket}
              </div>
            ))}
          </div>
          <div
            style={{
              marginTop: "40px",
              fontSize: 24,
              color: "#94a3b8",
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <span style={{ color: "#e2a82f", fontSize: 28 }}>✓</span>
            Terakreditasi & Resmi
            <span style={{ margin: "0 15px" }}>•</span>
            <span style={{ color: "#e2a82f", fontSize: 28 }}>✓</span>
            Ijazah Negara
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
