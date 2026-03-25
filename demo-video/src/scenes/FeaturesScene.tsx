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

const features = [
  { title: "Ijazah Resmi Negara", desc: "Ijazah Kesetaraan langsung dari Kementerian Pendidikan" },
  { title: "Terakreditasi", desc: "Standar mutu pendidikan nasional" },
  { title: "Bebas Usia", desc: "Terbuka untuk semua jenjang usia" },
  { title: "Bebas Domisili", desc: "Dari seluruh Indonesia dan luar negeri" },
  { title: "Biaya Ringan", desc: "Terjangkau dan bisa dicicil" },
  { title: "E-Learning System", desc: "Belajar kapan saja, di mana saja" },
  { title: "Tutor Profesional", desc: "Pengajar berpengalaman" },
  { title: "Waktu Fleksibel", desc: "Cocok bagi yang sudah bekerja" },
];

export const FeaturesScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Section title
  const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const titleY = interpolate(
    spring({ frame, fps, config: { damping: 200 } }),
    [0, 1],
    [40, 0]
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.oxford[50],
        fontFamily: fontSans,
        padding: "80px 100px",
      }}
    >
      {/* Decorative background */}
      <div
        style={{
          position: "absolute",
          top: -200,
          left: -100,
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${colors.gold[100]}80, transparent)`,
          filter: "blur(100px)",
        }}
      />

      {/* Title */}
      <div
        style={{
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          textAlign: "center",
          marginBottom: 60,
        }}
      >
        <span
          style={{
            color: colors.gold[600],
            fontSize: 18,
            fontWeight: 700,
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          Keunggulan Kami
        </span>
        <h2
          style={{
            fontFamily: fontHeading,
            fontSize: 60,
            fontWeight: 900,
            color: colors.oxford[900],
            margin: "12px 0 0",
          }}
        >
          Kenapa PKBM Al-Fitria?
        </h2>
      </div>

      {/* Feature grid */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 24,
          justifyContent: "center",
        }}
      >
        {features.map((feature, i) => {
          const delay = 15 + i * 6;
          const cardOpacity = interpolate(frame, [delay, delay + 15], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const cardY = interpolate(
            spring({
              frame: Math.max(0, frame - delay),
              fps,
              config: { damping: 200 },
            }),
            [0, 1],
            [50, 0]
          );
          const cardScale = spring({
            frame: Math.max(0, frame - delay),
            fps,
            config: { damping: 15 },
          });

          return (
            <div
              key={feature.title}
              style={{
                opacity: cardOpacity,
                transform: `translateY(${cardY}px) scale(${cardScale})`,
                width: 380,
                backgroundColor: colors.white,
                borderRadius: 20,
                padding: "32px 28px",
                border: `1px solid ${colors.oxford[100]}`,
                boxShadow: `0 2px 12px ${colors.oxford[950]}08`,
              }}
            >
              {/* Icon box */}
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 14,
                  background: `linear-gradient(135deg, ${colors.oxford[800]}, ${colors.oxford[900]})`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 16,
                  color: colors.gold[400],
                  fontSize: 24,
                  fontWeight: 900,
                }}
              >
                {i + 1}
              </div>
              <h3
                style={{
                  fontSize: 22,
                  fontWeight: 800,
                  color: colors.oxford[900],
                  margin: "0 0 8px 0",
                }}
              >
                {feature.title}
              </h3>
              <p
                style={{
                  fontSize: 16,
                  color: colors.oxford[500],
                  margin: 0,
                  lineHeight: 1.5,
                }}
              >
                {feature.desc}
              </p>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
