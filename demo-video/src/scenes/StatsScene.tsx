import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "../theme";
import { fontHeading, fontSans } from "../fonts";

const stats = [
  { value: 224, label: "Warga Belajar", suffix: "" },
  { value: 4, label: "Tenaga Pengajar", suffix: "" },
  { value: 8, label: "Rombongan Belajar", suffix: "" },
  { value: 73, label: "Modul Paket A", suffix: "" },
  { value: 6, label: "Ruang Kelas", suffix: "" },
  { value: 513, label: "m\u00B2 Luas Tanah", suffix: "" },
];

const schoolInfo = [
  { label: "NPSN", value: "P9999879" },
  { label: "Akreditasi", value: "C" },
  { label: "Kepala Sekolah", value: "Eva Fitria Latifah" },
  { label: "Yayasan", value: "Yayasan Daarul Fitria Tauhid" },
];

export const StatsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Section title
  const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const titleScale = spring({ frame, fps, config: { damping: 200 } });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.oxford[950]}, ${colors.oxford[900]})`,
        fontFamily: fontSans,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px 100px",
      }}
    >
      {/* Gold accent top */}
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

      {/* Decorative orb */}
      <div
        style={{
          position: "absolute",
          top: -150,
          right: -100,
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${colors.gold[500]}12, transparent)`,
          filter: "blur(100px)",
        }}
      />

      {/* Title */}
      <div
        style={{
          opacity: titleOpacity,
          transform: `scale(${titleScale})`,
          textAlign: "center",
          marginBottom: 48,
        }}
      >
        <span
          style={{
            color: colors.gold[400],
            fontSize: 18,
            fontWeight: 700,
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          Data Kemendikdasmen RI
        </span>
        <h2
          style={{
            fontFamily: fontHeading,
            fontSize: 56,
            fontWeight: 900,
            color: colors.white,
            margin: "12px 0 0",
          }}
        >
          PKBM Al-Fitria dalam Angka
        </h2>
      </div>

      {/* Stats grid */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 32,
          justifyContent: "center",
          marginBottom: 48,
        }}
      >
        {stats.map((stat, i) => {
          const delay = 15 + i * 8;
          const progress = spring({
            frame: Math.max(0, frame - delay),
            fps,
            config: { damping: 200 },
          });
          const cardOpacity = interpolate(frame, [delay, delay + 15], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          // Animated counter
          const count = Math.round(interpolate(progress, [0, 1], [0, stat.value]));

          return (
            <div
              key={stat.label}
              style={{
                opacity: cardOpacity,
                width: 260,
                textAlign: "center",
                padding: "32px 20px",
                borderRadius: 20,
                backgroundColor: `${colors.white}08`,
                border: `1px solid ${colors.white}12`,
              }}
            >
              <p
                style={{
                  fontFamily: fontHeading,
                  fontSize: 56,
                  fontWeight: 900,
                  color: colors.gold[400],
                  margin: "0 0 8px 0",
                }}
              >
                {count}
                {stat.suffix}
              </p>
              <p
                style={{
                  fontSize: 18,
                  color: colors.oxford[300],
                  margin: 0,
                  fontWeight: 600,
                }}
              >
                {stat.label}
              </p>
            </div>
          );
        })}
      </div>

      {/* School info row */}
      <div
        style={{
          display: "flex",
          gap: 24,
          justifyContent: "center",
        }}
      >
        {schoolInfo.map((info, i) => {
          const delay = 60 + i * 6;
          const opacity = interpolate(frame, [delay, delay + 12], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          return (
            <div
              key={info.label}
              style={{
                opacity,
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 22px",
                borderRadius: 12,
                backgroundColor: `${colors.gold[500]}15`,
                border: `1px solid ${colors.gold[400]}30`,
              }}
            >
              <span style={{ color: colors.oxford[400], fontSize: 15, fontWeight: 600 }}>
                {info.label}:
              </span>
              <span style={{ color: colors.gold[300], fontSize: 15, fontWeight: 800 }}>
                {info.value}
              </span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
