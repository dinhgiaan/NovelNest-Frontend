import { Metadata } from "next";
import BooksClient from './BooksClient';

export const metadata: Metadata = {
      // Basic SEO
      title: 'Khám phá các cuốn sách - NovelNest',
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
            title: 'Khám phá các cuốn sách | NovelNest',
            description: 'NovelNest - nơi lựa chọn tốt nhất cho việc đọc sách của bạn.',
            images: [
                  {
                        url: '/assets/novelnest-books.webp',
                        width: 1200,
                        height: 630,
                        alt: 'NovelNest - Khám phá sách hay'
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
            canonical: '/books',
      },
};

const Page = () => {
      return <BooksClient />;
};

export default Page;
