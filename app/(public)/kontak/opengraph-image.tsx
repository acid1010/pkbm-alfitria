import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Kontak PKBM Al-Fitria";
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
            Hubungi Kami
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
              gap: "25px",
              width: "100%",
              maxWidth: "850px",
            }}
          >
            <div
              style={{
                fontSize: 26,
                color: "#cbd5e1",
                display: "flex",
                alignItems: "center",
                lineHeight: 1.5,
              }}
            >
              📍 Kp. Peuntas RT 011/004, Desa Taringgul Tonggoh
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;Kec. Wanayasa, Kab. Purwakarta
            </div>
            <div
              style={{
                fontSize: 30,
                color: "#e2a82f",
                fontWeight: 700,
              }}
            >
              📞 0878-0531-2348 (WhatsApp)
            </div>
            <div
              style={{
                fontSize: 28,
                color: "#94a3b8",
              }}
            >
              ✉️ info@pkbmalfitria.sch.id
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
