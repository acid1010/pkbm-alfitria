import { loadFont } from "@remotion/google-fonts/PlusJakartaSans";

const { fontFamily: sansFontFamily } = loadFont("normal", {
  weights: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

import { loadFont as loadHeadingFont } from "@remotion/google-fonts/PlayfairDisplay";

const { fontFamily: headingFontFamily } = loadHeadingFont("normal", {
  weights: ["400", "700", "800", "900"],
  subsets: ["latin"],
});

export const fontSans = sansFontFamily;
export const fontHeading = headingFontFamily;
