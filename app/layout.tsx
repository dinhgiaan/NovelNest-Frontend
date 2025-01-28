import localFont from "next/font/local";
import "./globals.css";
import Providers from "./provider";
import SessionWrapper from "./components/session.wrapper";
import Headers from '../app/components/header';
import Footer from "./components/footer";
import ScrollToTop from "./utils/scroll-to-top";
import { Toaster } from "react-hot-toast";
import { AuthWrapper } from "./context/auth.context";
import ConditionalLayout from "./components/conditional.layout";

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
              <ConditionalLayout>{children}</ConditionalLayout>
              <Toaster position="top-center" reverseOrder={false} toastOptions={{ className: 'text-xs mt-3' }} />
              <ScrollToTop />
            </Providers>
          </AuthWrapper>
        </body>
      </html>
    </SessionWrapper>
  );
}

