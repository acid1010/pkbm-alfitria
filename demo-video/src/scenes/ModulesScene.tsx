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

const subjects = [
  { name: "Bahasa Indonesia", count: 15 },
  { name: "IPA", count: 16 },
  { name: "IPS", count: 14 },
  { name: "Matematika", count: 16 },
  { name: "PPKn", count: 12 },
];

export const ModulesScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title
  const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const titleY = interpolate(
    spring({ frame, fps, config: { damping: 200 } }),
    [0, 1],
    [40, 0]
  );

  // Total counter
  const totalProgress = spring({
    frame: Math.max(0, frame - 20),
    fps,
    config: { damping: 200 },
    durationInFrames: 40,
  });
  const totalCount = Math.round(interpolate(totalProgress, [0, 1], [0, 73]));
  const totalOpacity = interpolate(frame, [20, 35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.oxford[50],
        fontFamily: fontSans,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px 120px",
      }}
    >
      {/* Title */}
      <div
        style={{
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          textAlign: "center",
          marginBottom: 48,
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
          Perpustakaan Digital
        </span>
        <h2
          style={{
            fontFamily: fontHeading,
            fontSize: 56,
            fontWeight: 900,
            color: colors.oxford[900],
            margin: "12px 0 0",
          }}
        >
          Modul Pembelajaran Paket A
        </h2>
      </div>

      {/* Total badge */}
      <div
        style={{
          opacity: totalOpacity,
          marginBottom: 56,
          padding: "20px 48px",
          borderRadius: 24,
          background: `linear-gradient(135deg, ${colors.oxford[900]}, ${colors.oxford[800]})`,
          boxShadow: `0 8px 30px ${colors.oxford[950]}30`,
          textAlign: "center",
        }}
      >
        <span
          style={{
            fontFamily: fontHeading,
            fontSize: 72,
            fontWeight: 900,
            color: colors.gold[400],
          }}
        >
          {totalCount}
        </span>
        <span
          style={{
            fontSize: 28,
            color: colors.oxford[300],
            marginLeft: 16,
            fontWeight: 600,
          }}
        >
          Modul Tersedia
        </span>
      </div>

      {/* Subject bars */}
      <div
        style={{
          width: "100%",
          maxWidth: 1000,
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        {subjects.map((subject, i) => {
          const delay = 30 + i * 8;
          const barProgress = spring({
            frame: Math.max(0, frame - delay),
            fps,
            config: { damping: 200 },
          });
          const barOpacity = interpolate(frame, [delay, delay + 10], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const barWidth = interpolate(barProgress, [0, 1], [0, (subject.count / 16) * 100]);
          const count = Math.round(interpolate(barProgress, [0, 1], [0, subject.count]));

          return (
            <div
              key={subject.name}
              style={{
                opacity: barOpacity,
                display: "flex",
                alignItems: "center",
                gap: 20,
              }}
            >
              <span
                style={{
                  width: 200,
                  fontSize: 22,
                  fontWeight: 700,
                  color: colors.oxford[800],
                  textAlign: "right",
                }}
              >
                {subject.name}
              </span>
              <div
                style={{
                  flex: 1,
                  height: 48,
                  borderRadius: 12,
                  backgroundColor: colors.oxford[100],
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    width: `${barWidth}%`,
                    height: "100%",
                    borderRadius: 12,
                    background: `linear-gradient(90deg, ${colors.oxford[900]}, ${colors.oxford[700]})`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    paddingRight: 16,
                  }}
                >
                  <span
                    style={{
                      color: colors.gold[400],
                      fontSize: 20,
                      fontWeight: 800,
                    }}
                  >
                    {count} modul
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Source credit */}
      <div
        style={{
          marginTop: 40,
          opacity: interpolate(frame, [80, 95], [0, 0.6], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <span style={{ fontSize: 16, color: colors.oxford[400], fontWeight: 500 }}>
          Sumber: modul.pkbm.id - Gratis dari Kemdikbud
        </span>
      </div>
    </AbsoluteFill>
  );
};
