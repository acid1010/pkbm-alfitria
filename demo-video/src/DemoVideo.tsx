import React from "react";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";

import { IntroScene } from "./scenes/IntroScene";
import { HeroScene } from "./scenes/HeroScene";
import { FeaturesScene } from "./scenes/FeaturesScene";
import { ProgramsScene } from "./scenes/ProgramsScene";
import { StatsScene } from "./scenes/StatsScene";
import { ModulesScene } from "./scenes/ModulesScene";
import { ClosingScene } from "./scenes/ClosingScene";

/**
 * Scene durations in frames (at 30fps):
 * Intro:    120 frames = 4s
 * Hero:     150 frames = 5s
 * Features: 150 frames = 5s
 * Programs: 120 frames = 4s
 * Stats:    150 frames = 5s
 * Modules:  150 frames = 5s
 * Closing:  120 frames = 4s
 *
 * Transitions: 6 x 20 frames = 120 frames overlap
 * Total: 960 - 120 = 840 frames = 28s
 */

const TRANSITION_DURATION = 20;

export const DemoVideo: React.FC = () => {
  return (
    <TransitionSeries>
      {/* Scene 1: Intro / Logo reveal */}
      <TransitionSeries.Sequence durationInFrames={120}>
        <IntroScene />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
      />

      {/* Scene 2: Hero section */}
      <TransitionSeries.Sequence durationInFrames={150}>
        <HeroScene />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={slide({ direction: "from-right" })}
        timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
      />

      {/* Scene 3: Features / Why choose us */}
      <TransitionSeries.Sequence durationInFrames={150}>
        <FeaturesScene />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
      />

      {/* Scene 4: Programs (Paket A/B/C) */}
      <TransitionSeries.Sequence durationInFrames={120}>
        <ProgramsScene />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={slide({ direction: "from-bottom" })}
        timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
      />

      {/* Scene 5: Stats with real Kemendikdasmen data */}
      <TransitionSeries.Sequence durationInFrames={150}>
        <StatsScene />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
      />

      {/* Scene 6: Modules overview */}
      <TransitionSeries.Sequence durationInFrames={150}>
        <ModulesScene />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
      />

      {/* Scene 7: Closing CTA */}
      <TransitionSeries.Sequence durationInFrames={120}>
        <ClosingScene />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
