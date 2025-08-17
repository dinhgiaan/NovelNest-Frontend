"use client"

import { useParams } from "next/navigation"
import EpubReader from "../epub.reader"
import Heading from "@/app/utils/heading"
import { useBookDetail } from "@/app/hooks/use.book.details"
import ErrorAPI from "@/app/components/error.api"
import Loading from "@/app/utils/loading"

const ReadBookPage = () => {
  const { slug } = useParams()
  const { book: bookData, error, isLoading } = useBookDetail(slug as string)

  if (error) return <ErrorAPI />
  if (isLoading) return <Loading />

  const epubFileUrl = bookData?.epubFile?.url
  const bookTitle = bookData?.title || "Không rõ"
  const author = bookData?.author || "Không rõ"

  if (!epubFileUrl) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center text-gray-400 p-4">
          <p>Không tìm thấy file EPUB cho sách này.</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <Heading
        title={`${bookTitle}`}
        description="NovelNest, nơi lựa chọn tốt nhất cho việc đọc sách của bạn."
        keyword="NovelNest, Book, Book Store, Dinhgiaan, Dinhgiaandev"
      />
      <EpubReader epubUrl={epubFileUrl} bookTitle={bookTitle} author={author} />
    </>

  )
}

export default ReadBookPage;
