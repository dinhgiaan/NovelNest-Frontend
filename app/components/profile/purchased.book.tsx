"use client";

import { useEffect, useState } from "react";
import BookCard from "../ui/card/book.card";
import { bookService } from "@/app/lib/api/book";
import toast from "react-hot-toast";
import { BookOpen } from "lucide-react";

const PurchasedBooksPage = () => {
  const [data, setDataBook] = useState<IBook[]>();

  useEffect(() => {
    const getBooksPurchased = async () => {
      const res = await bookService.getPurchasedBooks();
      if (res.success) setDataBook(res.data);
      else toast.error("Có lỗi khi lấy danh sách!");
    };
    getBooksPurchased();
  }, []);

  const books: IBook[] = data || [];

  return (
    <div className="w-full">
      <div className="mb-8 flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-4">
        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white tracking-tight">
          Tủ sách của bạn
        </h2>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-xs font-medium text-zinc-600 dark:text-zinc-400">
          <BookOpen size={14} /> {books.length} cuốn
        </span>
      </div>

      {books.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {books.map((book) => (
            <BookCard
              key={book._id}
              book={book}
              variant="purchased"
              showPrice={false}
              showPurchaseDate
              showRating
              showActions
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 border border-dashed border-zinc-300 dark:border-zinc-800 rounded-2xl">
          <p className="text-zinc-500 text-sm">
            Chưa có cuốn sách nào trong tủ sách của bạn.
          </p>
        </div>
      )}
    </div>
  );
};

export default PurchasedBooksPage;
