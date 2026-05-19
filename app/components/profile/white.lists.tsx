import { userService } from "@/app/lib/api/user";
import { useCallback, useEffect, useState } from "react";
import BookCard from "../ui/card/book.card";
import { usePurchasedBooks } from "@/app/hooks/use.purchased.book";
import { useCartStore } from "@/app/lib/store/cart.store";
import toast from "react-hot-toast";
import { Heart, Loader2 } from "lucide-react";

const WhiteLists = () => {
  const [dataBooks, setDataBooks] = useState<IBook[]>([]);
  const [loading, setLoading] = useState(true);
  const isPurchasedCheck = usePurchasedBooks();
  const { addToCart, toggleCart } = useCartStore();

  useEffect(() => {
    const favorites = async () => {
      try {
        setLoading(true);
        const res = await userService.getFavourites();
        if (res.data) setDataBooks(res.data.data);
      } catch {
        toast.error("Có lỗi xảy ra khi lấy danh sách yêu thích");
      } finally {
        setLoading(false);
      }
    };
    favorites();
  }, []);

  const handleAddToCart = useCallback(
    (book: IBook) => {
      const finalPrice =
        book.promotionPrice && book.promotionPrice > 0
          ? book.promotionPrice
          : book.price;
      addToCart({
        bookId: book._id,
        title: book.title,
        author: book.author,
        price: finalPrice,
        promotionPrice: book.promotionPrice ?? 0,
        thumbnail: { url: book.thumbnail!.url },
        slug: book.slug ?? "",
      });
      toast.success(`Đã thêm vào giỏ hàng`);
    },
    [addToCart],
  );

  const handleBuyNow = useCallback(
    (book: IBook) => {
      handleAddToCart(book);
      toggleCart();
    },
    [handleAddToCart, toggleCart],
  );

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="animate-spin text-zinc-400" size={24} />
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-8 flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-4">
        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white tracking-tight">
          Sách yêu thích
        </h2>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 dark:bg-red-900/10 text-xs font-medium text-rose-600 dark:text-rose-400">
          <Heart size={14} /> {dataBooks.length} cuốn
        </span>
      </div>

      {dataBooks.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {dataBooks.map((book) => (
            <BookCard
              key={book._id}
              book={book}
              variant="white_lists"
              showPrice
              showRating
              showActions
              isPurchased={isPurchasedCheck(book._id)}
              onAddToCart={handleAddToCart}
              onBuyNow={handleBuyNow}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 border border-dashed border-zinc-300 dark:border-zinc-800 rounded-2xl">
          <p className="text-zinc-500 text-sm">
            Danh sách yêu thích của bạn đang trống.
          </p>
        </div>
      )}
    </div>
  );
};

export default WhiteLists;
