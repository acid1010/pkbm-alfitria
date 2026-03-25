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

export const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo scale with bounce
  const logoScale = spring({ frame, fps, config: { damping: 8, stiffness: 120 } });

  // Logo rotation on entrance
  const logoRotate = interpolate(
    spring({ frame, fps, config: { damping: 200 }, durationInFrames: 25 }),
    [0, 1],
    [-15, 0]
  );

  // Gold ring pulse
  const ringScale = interpolate(frame, [20, 50], [0.9, 1.05], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.sin),
  });

  // Title fade in
  const titleOpacity = interpolate(frame, [15, 35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const titleY = interpolate(
    spring({ frame: Math.max(0, frame - 15), fps, config: { damping: 200 } }),
    [0, 1],
    [40, 0]
  );

  // Subtitle
  const subtitleOpacity = interpolate(frame, [30, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const subtitleY = interpolate(
    spring({ frame: Math.max(0, frame - 30), fps, config: { damping: 200 } }),
    [0, 1],
    [30, 0]
  );

  // Badge
  const badgeOpacity = interpolate(frame, [50, 65], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const badgeScale = spring({
    frame: Math.max(0, frame - 50),
    fps,
    config: { damping: 12 },
  });

  // Background gradient orbs
  const orb1X = interpolate(frame, [0, 120], [-200, -100], {
    extrapolateRight: "clamp",
  });
  const orb2X = interpolate(frame, [0, 120], [200, 100], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.oxford[950],
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: fontSans,
      }}
    >
      {/* Decorative orbs */}
      <div
        style={{
          position: "absolute",
          top: -200,
          right: orb1X,
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${colors.gold[500]}15, transparent)`,
          filter: "blur(80px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -200,
          left: orb2X,
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${colors.oxford[400]}20, transparent)`,
          filter: "blur(80px)",
        }}
      />

      {/* Gold accent line top */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          background: `linear-gradient(90deg, ${colors.gold[300]}, ${colors.gold[500]}, ${colors.gold[300]})`,
          opacity: interpolate(frame, [0, 20], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 24,
        }}
      >
        {/* Logo */}
        <div
          style={{
            position: "relative",
            transform: `scale(${logoScale}) rotate(${logoRotate}deg)`,
          }}
        >
          {/* Gold ring */}
          <div
            style={{
              position: "absolute",
              inset: -12,
              borderRadius: "50%",
              border: `4px solid ${colors.gold[400]}`,
              transform: `scale(${ringScale})`,
              opacity: 0.6,
            }}
          />
          <div
            style={{
              width: 180,
              height: 180,
              borderRadius: "50%",
              overflow: "hidden",
              border: `5px solid ${colors.gold[400]}`,
              boxShadow: `0 20px 60px ${colors.oxford[950]}80`,
              background: colors.white,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Img
              src={staticFile("logo-hd.png")}
              style={{
                width: 160,
                height: 160,
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
          }}
        >
          <h1
            style={{
              fontFamily: fontHeading,
              fontSize: 72,
              fontWeight: 900,
              color: colors.white,
              margin: 0,
              letterSpacing: -1,
            }}
          >
            PKBM AL-FITRIA
          </h1>
        </div>

        {/* Subtitle */}
        <div
          style={{
            opacity: subtitleOpacity,
            transform: `translateY(${subtitleY}px)`,
          }}
        >
          <p
            style={{
              fontSize: 28,
              color: colors.oxford[300],
              margin: 0,
              fontWeight: 500,
              letterSpacing: 6,
              textTransform: "uppercase",
            }}
          >
            Pusat Kegiatan Belajar Masyarakat
          </p>
        </div>

        {/* Accreditation badge */}
        <div
          style={{
            opacity: badgeOpacity,
            transform: `scale(${badgeScale})`,
            marginTop: 16,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              background: `${colors.gold[500]}20`,
              border: `2px solid ${colors.gold[400]}50`,
              borderRadius: 40,
              padding: "12px 28px",
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                backgroundColor: colors.gold[400],
              }}
            />
            <span
              style={{
                color: colors.gold[300],
                fontSize: 20,
                fontWeight: 700,
                letterSpacing: 2,
              }}
            >
              TERAKREDITASI & RESMI
            </span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
