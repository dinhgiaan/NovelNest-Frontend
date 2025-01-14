import localFont from "next/font/local";
import "./globals.css";
import Providers from "./provider";
import SessionWrapper from "./components/SessionWrapper";
import Headers from '../app/components/header';
import Footer from "./components/footer";
import ScrollToTop from "./utils/scroll-to-top";
import { Toaster } from "react-hot-toast";
import { AuthWrapper } from "./context/auth.context";

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
          className={`${myFontCustom.variable} antialiased`}
        >
          <AuthWrapper>
            <Providers>
              <Headers />
              <main> {children}</main>
              <Toaster position="top-center" reverseOrder={false} />
              <ScrollToTop />
              <Footer />
            </Providers>
          </AuthWrapper>
        </body>
      </html>
    </SessionWrapper>
  );
}

