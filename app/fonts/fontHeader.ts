import localFont from "next/font/local";

const fontHeader = localFont({
      src: "../../public/fonts/FjallaOne-Regular.ttf",
      display: "swap",
      weight: "400",
      variable: "--headerCustom",
});

export default fontHeader;
