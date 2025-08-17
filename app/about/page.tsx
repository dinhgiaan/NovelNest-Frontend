import { Metadata } from "next";
import AboutPage from "./About"

export const metadata: Metadata = {
      // Basic SEO
      title: 'Giới thiệu - NovelNest',
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
            title: 'Giới thiệu | NovelNest',
            description: 'NovelNest - nơi lựa chọn tốt nhất cho việc đọc sách của bạn.',
            images: [
                  {
                        url: '/assets/novelnest-about-us.webp',
                        width: 1200,
                        height: 630,
                        alt: 'NovelNest - Về chúng tôi'
                  }
            ],
            type: 'website',
            siteName: 'NovelNest',
      },

      // SEO Settings
      robots: {
            index: true,
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
            canonical: '/about',
      },
};

const Page = () => {
      return (
            <AboutPage />
      )
}

export default Page;
