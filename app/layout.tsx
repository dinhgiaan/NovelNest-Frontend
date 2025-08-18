import localFont from "next/font/local";
import "./globals.css";
import Providers from "./provider";
import SessionWrapper from "./components/providers/session.wrapper";
import { Toaster } from "react-hot-toast";
import { AuthWrapper } from "./context/auth.context";
import { ConditionalLayout } from "./components/layout/conditional.layout";
import Cart from "./components/cart/cart";
import ScrollToTop from "./utils/scroll.to.top";
import { Analytics } from '@vercel/analytics/next';

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

    <html lang="en" suppressHydrationWarning>
      <body
        className={`${myFontCustom.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <SessionWrapper>
          <AuthWrapper>
            <Providers>
              <Cart />
              <ConditionalLayout>
                {children}
              </ConditionalLayout>
              <Toaster position="top-center" reverseOrder={false} toastOptions={{ className: 'text-xs mt-3' }} />
              <ScrollToTop />
            </Providers>
          </AuthWrapper>
        </SessionWrapper>
        <Analytics />
      </body>
    </html>

  );
}
