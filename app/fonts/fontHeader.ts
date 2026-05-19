import { Barlow_Condensed } from "next/font/google";

const fontHeader = Barlow_Condensed({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin", "vietnamese"],
  display: "swap",
  variable: "--headerCustom",
});

export default fontHeader;