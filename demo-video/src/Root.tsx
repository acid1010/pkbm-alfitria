import React from "react";
import { Composition } from "remotion";
import { DemoVideo } from "./DemoVideo";
import { COMP_WIDTH, COMP_HEIGHT, COMP_FPS } from "./theme";

/**
 * Total duration calculation:
 * 7 scenes: 120 + 150 + 150 + 120 + 150 + 150 + 120 = 960 frames
 * 6 transitions x 20 frames = 120 frames overlap
 * Total: 960 - 120 = 840 frames = 28 seconds at 30fps
 */
const TOTAL_DURATION = 840;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="PKBMAlFitriaDemo"
        component={DemoVideo}
        durationInFrames={TOTAL_DURATION}
        fps={COMP_FPS}
        width={COMP_WIDTH}
        height={COMP_HEIGHT}
      />
    </>
  );
};
