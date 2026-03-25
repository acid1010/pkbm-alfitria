import React from "react";
import {
  AbsoluteFill,
  Img,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from "remotion";
import { colors } from "../theme";
import { fontHeading, fontSans } from "../fonts";

export const ClosingScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo
  const logoScale = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 120 },
  });

  // Title
  const titleOpacity = interpolate(frame, [15, 35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const titleY = interpolate(
    spring({ frame: Math.max(0, frame - 15), fps, config: { damping: 200 } }),
    [0, 1],
    [40, 0]
  );

  // CTA
  const ctaOpacity = interpolate(frame, [35, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const ctaScale = spring({
    frame: Math.max(0, frame - 35),
    fps,
    config: { damping: 12 },
  });

  // Contact info
  const contactOpacity = interpolate(frame, [50, 65], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Pulsing glow
  const glowIntensity = interpolate(
    frame % 60,
    [0, 30, 60],
    [0.3, 0.6, 0.3],
    { extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.oxford[950]}, ${colors.oxford[900]}, ${colors.oxford[800]})`,
        fontFamily: fontSans,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Decorative elements */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          background: `linear-gradient(90deg, ${colors.gold[300]}, ${colors.gold[500]}, ${colors.gold[300]})`,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: -100,
          right: -100,
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${colors.gold[500]}${Math.round(glowIntensity * 20).toString(16).padStart(2, "0")}, transparent)`,
          filter: "blur(80px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -100,
          left: -100,
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${colors.oxford[400]}20, transparent)`,
          filter: "blur(80px)",
        }}
      />

      {/* Logo */}
      <div
        style={{
          transform: `scale(${logoScale})`,
          marginBottom: 32,
        }}
      >
        <div
          style={{
            width: 120,
            height: 120,
            borderRadius: "50%",
            overflow: "hidden",
            border: `4px solid ${colors.gold[400]}`,
            boxShadow: `0 12px 40px ${colors.oxford[950]}80`,
            background: colors.white,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Img
            src={staticFile("logo-hd.png")}
            style={{
              width: 100,
              height: 100,
              objectFit: "contain",
            }}
          />
        </div>
      </div>

      {/* Title */}
      <div
        style={{
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          textAlign: "center",
          marginBottom: 40,
        }}
      >
        <h2
          style={{
            fontFamily: fontHeading,
            fontSize: 56,
            fontWeight: 900,
            color: colors.white,
            margin: "0 0 16px 0",
          }}
        >
          Siap Memulai Perjalanan{" "}
          <span
            style={{
              background: `linear-gradient(90deg, ${colors.gold[300]}, ${colors.gold[500]})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontStyle: "italic",
            }}
          >
            Pendidikan
          </span>{" "}
          Anda?
        </h2>
        <p
          style={{
            fontSize: 24,
            color: colors.oxford[300],
            margin: 0,
            maxWidth: 700,
            lineHeight: 1.6,
          }}
        >
          Bergabunglah dengan 224 warga belajar lainnya di PKBM Al-Fitria.
          Pendaftaran terbuka sepanjang tahun.
        </p>
      </div>

      {/* CTA */}
      <div
        style={{
          opacity: ctaOpacity,
          transform: `scale(${ctaScale})`,
          marginBottom: 48,
        }}
      >
        <div
          style={{
            backgroundColor: colors.gold[500],
            color: colors.oxford[950],
            fontSize: 24,
            fontWeight: 800,
            padding: "20px 56px",
            borderRadius: 40,
            boxShadow: `0 4px 24px ${colors.gold[500]}40`,
          }}
        >
          DAFTAR SEKARANG
        </div>
      </div>

      {/* Contact info */}
      <div
        style={{
          opacity: contactOpacity,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
        }}
      >
        <p style={{ color: colors.oxford[400], fontSize: 18, margin: 0, fontWeight: 500 }}>
          Kp. Peuntas RT 011/004, Kec. Wanayasa, Kab. Purwakarta, Jawa Barat
        </p>
        <p style={{ color: colors.gold[400], fontSize: 20, margin: 0, fontWeight: 700 }}>
          pkbm-alfitria.vercel.app
        </p>
      </div>
    </AbsoluteFill>
  );
};
