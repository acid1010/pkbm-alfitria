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

const programs = [
  {
    title: "Paket A",
    equiv: "Setara SD / MI",
    desc: "Fondasi literasi dan numerasi dasar dengan kurikulum merdeka.",
    gradient: `linear-gradient(135deg, ${colors.gold[400]}, ${colors.gold[600]})`,
  },
  {
    title: "Paket B",
    equiv: "Setara SMP / MTs",
    desc: "Pengembangan karakter dan pengetahuan aplikatif.",
    gradient: `linear-gradient(135deg, ${colors.oxford[500]}, ${colors.oxford[700]})`,
  },
  {
    title: "Paket C",
    equiv: "Setara SMA / MA",
    desc: "Persiapan karir profesional maupun pendidikan tinggi.",
    gradient: `linear-gradient(135deg, ${colors.oxford[800]}, ${colors.oxford[950]})`,
  },
];

export const ProgramsScene: React.FC = () => {
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
        backgroundColor: colors.white,
        fontFamily: fontSans,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 100px",
      }}
    >
      {/* Title */}
      <div
        style={{
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          textAlign: "center",
          marginBottom: 64,
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
          Program Pendidikan
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
          Pilih Program yang Sesuai
        </h2>
      </div>

      {/* Program cards */}
      <div
        style={{
          display: "flex",
          gap: 40,
          justifyContent: "center",
          width: "100%",
        }}
      >
        {programs.map((prog, i) => {
          const delay = 15 + i * 12;
          const cardOpacity = interpolate(frame, [delay, delay + 20], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const cardScale = spring({
            frame: Math.max(0, frame - delay),
            fps,
            config: { damping: 12 },
          });
          const cardX = interpolate(
            spring({
              frame: Math.max(0, frame - delay),
              fps,
              config: { damping: 200 },
            }),
            [0, 1],
            [80 * (i - 1), 0]
          );

          return (
            <div
              key={prog.title}
              style={{
                opacity: cardOpacity,
                transform: `scale(${cardScale}) translateX(${cardX}px)`,
                width: 480,
                borderRadius: 24,
                border: `1px solid ${colors.oxford[200]}`,
                padding: 48,
                position: "relative",
                overflow: "hidden",
                backgroundColor: colors.white,
              }}
            >
              {/* Decorative corner */}
              <div
                style={{
                  position: "absolute",
                  top: -20,
                  right: -20,
                  width: 120,
                  height: 120,
                  borderRadius: "0 0 0 80px",
                  background: prog.gradient,
                  opacity: 0.08,
                }}
              />

              {/* Icon */}
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 20,
                  background: prog.gradient,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 28,
                  boxShadow: `0 8px 20px ${colors.oxford[950]}20`,
                }}
              >
                <span style={{ fontSize: 28, color: colors.white, fontWeight: 900 }}>
                  {prog.title.charAt(6)}
                </span>
              </div>

              <h3
                style={{
                  fontFamily: fontHeading,
                  fontSize: 36,
                  fontWeight: 900,
                  color: colors.oxford[950],
                  margin: "0 0 8px 0",
                }}
              >
                {prog.title}
              </h3>
              <div
                style={{
                  display: "inline-block",
                  padding: "6px 14px",
                  borderRadius: 8,
                  backgroundColor: colors.oxford[50],
                  color: colors.oxford[600],
                  fontSize: 14,
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: 2,
                  marginBottom: 20,
                }}
              >
                {prog.equiv}
              </div>
              <p
                style={{
                  fontSize: 20,
                  color: colors.oxford[500],
                  margin: 0,
                  lineHeight: 1.6,
                }}
              >
                {prog.desc}
              </p>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
