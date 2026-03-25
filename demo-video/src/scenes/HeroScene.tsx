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

export const HeroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Badge entrance
  const badgeY = interpolate(
    spring({ frame, fps, config: { damping: 200 } }),
    [0, 1],
    [-30, 0]
  );
  const badgeOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Headline
  const headlineOpacity = interpolate(frame, [10, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const headlineY = interpolate(
    spring({ frame: Math.max(0, frame - 10), fps, config: { damping: 200 } }),
    [0, 1],
    [50, 0]
  );

  // Description
  const descOpacity = interpolate(frame, [25, 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const descY = interpolate(
    spring({ frame: Math.max(0, frame - 25), fps, config: { damping: 200 } }),
    [0, 1],
    [40, 0]
  );

  // CTA buttons
  const ctaOpacity = interpolate(frame, [40, 55], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const ctaScale = spring({
    frame: Math.max(0, frame - 40),
    fps,
    config: { damping: 12 },
  });

  // Background pan
  const bgX = interpolate(frame, [0, 150], [0, -40], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ fontFamily: fontSans }}>
      {/* Background with gradient overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: colors.oxford[900],
          transform: `translateX(${bgX}px)`,
        }}
      >
        {/* Simulated classroom image overlay effect */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `
              radial-gradient(ellipse at 30% 20%, ${colors.oxford[800]}90 0%, transparent 50%),
              radial-gradient(ellipse at 70% 80%, ${colors.gold[500]}08 0%, transparent 40%),
              linear-gradient(135deg, ${colors.oxford[950]}ee, ${colors.oxford[900]}cc, ${colors.oxford[800]}aa)
            `,
          }}
        />
      </div>

      {/* Decorative orbs */}
      <div
        style={{
          position: "absolute",
          top: -100,
          right: -100,
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${colors.gold[500]}10, transparent)`,
          filter: "blur(120px)",
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 120px",
          height: "100%",
          maxWidth: 1200,
        }}
      >
        {/* Badge */}
        <div
          style={{
            opacity: badgeOpacity,
            transform: `translateY(${badgeY}px)`,
            marginBottom: 32,
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              background: `${colors.white}15`,
              backdropFilter: "blur(10px)",
              border: `1px solid ${colors.white}20`,
              borderRadius: 30,
              padding: "10px 24px",
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: colors.gold[400],
              }}
            />
            <span
              style={{
                color: colors.gold[300],
                fontSize: 18,
                fontWeight: 700,
              }}
            >
              Terakreditasi & Resmi
            </span>
          </div>
        </div>

        {/* Headline */}
        <div
          style={{
            opacity: headlineOpacity,
            transform: `translateY(${headlineY}px)`,
          }}
        >
          <h1
            style={{
              fontFamily: fontHeading,
              fontSize: 88,
              fontWeight: 900,
              color: colors.white,
              margin: 0,
              lineHeight: 1.1,
              letterSpacing: -2,
            }}
          >
            Sekolah Pendidikan{" "}
            <span
              style={{
                background: `linear-gradient(90deg, ${colors.gold[300]}, ${colors.gold[500]})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Kesetaraan
            </span>
          </h1>
        </div>

        {/* Description */}
        <div
          style={{
            opacity: descOpacity,
            transform: `translateY(${descY}px)`,
            marginTop: 28,
          }}
        >
          <p
            style={{
              fontSize: 28,
              color: colors.oxford[200],
              margin: 0,
              maxWidth: 800,
              lineHeight: 1.6,
              fontWeight: 500,
            }}
          >
            PKBM Al-Fitria menyelenggarakan Program Kesetaraan Paket A, B, dan C
            untuk seluruh masyarakat Indonesia. Raih ijazah resmi negara.
          </p>
        </div>

        {/* CTA Buttons */}
        <div
          style={{
            opacity: ctaOpacity,
            transform: `scale(${ctaScale})`,
            display: "flex",
            gap: 20,
            marginTop: 48,
          }}
        >
          <div
            style={{
              backgroundColor: colors.gold[500],
              color: colors.oxford[950],
              fontSize: 22,
              fontWeight: 800,
              padding: "18px 48px",
              borderRadius: 40,
              boxShadow: `0 4px 20px ${colors.gold[500]}50`,
            }}
          >
            Daftar Sekarang
          </div>
          <div
            style={{
              border: `2px solid ${colors.white}30`,
              color: colors.white,
              fontSize: 22,
              fontWeight: 700,
              padding: "18px 48px",
              borderRadius: 40,
            }}
          >
            Hubungi Kami
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
