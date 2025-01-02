import localFont from "next/font/local";
import "./globals.css";
import Providers from "./provider";
import SessionWrapper from "./components/SessionWrapper";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const myFontCustom = localFont({
  src: "./fonts/Merienda-VariableFont_wght.ttf",
  variable: "--myFontCustom",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionWrapper>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} ${myFontCustom.variable} antialiased`}
        >
          <Providers>
            <main> {children}</main>
          </Providers>
        </body>
      </html>
    </SessionWrapper>
  );
}

