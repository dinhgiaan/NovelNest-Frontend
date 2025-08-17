import Layout from "./components/layout/Layout";
import { Metadata } from "next";

export const metadata: Metadata = {
  // Basic
  title: 'NovelNest',
  description: 'NovelNest - nơi lựa chọn tốt nhất cho việc đọc sách của bạn. Khám phá hàng nghìn đầu sách hay.',
  keywords: ['NovelNest', 'sách', 'đọc sách', 'book store', 'tiểu thuyết', 'sách online', 'sách điện tử'],

  // Social media
  openGraph: {
    title: 'NovelNest - Kho Tàng Sách Đa Dạng',
    description: 'NovelNest - nơi lựa chọn tốt nhất cho việc đọc sách của bạn.',
    images: [{
      url: '/assets/novelnest-homepage.webp',
      width: 1200,
      height: 630,
      alt: 'NovelNest'
    }],
    type: 'website',
    siteName: 'NovelNest',
  },

  // SEO
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
}

const HomePage = () => {
  return (
    <Layout />
  );
}

export default HomePage;
