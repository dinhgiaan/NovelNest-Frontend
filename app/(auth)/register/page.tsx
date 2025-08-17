import { Metadata } from "next";
import RegisterPage from "./Register"

export const metadata: Metadata = {
      // Basic SEO
      title: 'Đăng ký tài khoản - NovelNest',
      description: 'NovelNest - nơi lựa chọn tốt nhất cho việc đọc sách của bạn. Khám phá hàng nghìn đầu sách hay từ các tác giả nổi tiếng.',
      keywords: [
            'NovelNest',
            'sách',
            'đọc sách',
            'book store',
            'tiểu thuyết',
            'sách online',
            'sách điện tử',
            'mua sách',
            'sách hay'
      ],

      // Social media
      openGraph: {
            title: 'Đăng ký tài khoản | NovelNest',
            description: 'NovelNest - nơi lựa chọn tốt nhất cho việc đọc sách của bạn.',
            images: [
                  {
                        url: '/assets/novelnest-register.webp',
                        width: 1200,
                        height: 630,
                        alt: 'NovelNest - Đăng ký tài khoản'
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
                  index: true,
                  follow: true,
                  'max-video-preview': -1,
                  'max-image-preview': 'large',
                  'max-snippet': -1,
            },
      },

      // Additional metadata
      alternates: {
            canonical: '/register',
      },
};

const Page = () => {

      return (
            <RegisterPage />
      )
}

export default Page;
