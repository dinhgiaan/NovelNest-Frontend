import { Metadata } from "next";
import LoginPage from "./Login"

export const metadata: Metadata = {
      // Basic SEO
      title: 'Đăng nhập tài khoản - NovelNest',
      description: 'Đăng nhập vào NovelNest để truy cập thư viện sách cá nhân và khám phá hàng nghìn đầu sách hay.',
      keywords: [
            'đăng nhập NovelNest',
            'login',
            'tài khoản',
            'thư viện sách',
            'sách online'
      ],

      // Social media
      openGraph: {
            title: 'Đăng nhập vào NovelNest',
            description: 'Truy cập tài khoản để khám phá thư viện sách cá nhân của bạn.',
            images: [
                  {
                        url: '/assets/novelnest-login.webp',
                        width: 1200,
                        height: 630,
                        alt: 'NovelNest - Đăng nhập tài khoản'
                  }
            ],
            type: 'website',
            siteName: 'NovelNest',
      },

      // SEO Settings
      robots: {
            index: false,
            follow: true,
            googleBot: {
                  index: false,
                  follow: true,
                  'max-video-preview': -1,
                  'max-image-preview': 'large',
                  'max-snippet': -1,
            },
      },

      // Additional metadata
      alternates: {
            canonical: '/login',
      },
};

const Page = () => {
      return (
            <LoginPage />
      )
}

export default Page;
