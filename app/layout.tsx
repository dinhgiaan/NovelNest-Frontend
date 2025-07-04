import localFont from "next/font/local";
import "./globals.css";
import Providers from "./provider";
import SessionWrapper from "./components/session.wrapper";
import { Toaster } from "react-hot-toast";
import { AuthWrapper } from "./context/auth.context";
import ConditionalLayout from "./components/conditional.layout";
import Cart from "./components/cart/cart";
import FloatingActionMenu from "./utils/arc.menu";

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
              <Cart />
              <ConditionalLayout>{children}</ConditionalLayout>
              <Toaster position="top-center" reverseOrder={false} toastOptions={{ className: 'text-xs mt-3' }} />
              <FloatingActionMenu />
            </Providers>
          </AuthWrapper>
        </body>
      </html>
    </SessionWrapper>
  );
}

