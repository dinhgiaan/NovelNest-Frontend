import { userService } from "@/app/lib/api/user";
import { useCallback, useEffect, useState } from "react";
import BookCard from "../ui/card/book.card";
import { usePurchasedBooks } from "@/app/hooks/use.purchased.book";
import { useCartStore } from "@/app/lib/store/cart.store";
import toast from "react-hot-toast";

const WhiteLists = () => {
      const [dataBooks, setDataBooks] = useState<IBook[]>([]);
      const [loading, setLoading] = useState(true);
      const isPurchasedCheck = usePurchasedBooks()
      const { addToCart, toggleCart } = useCartStore();

      useEffect(() => {
            const favorites = async () => {
                  try {
                        setLoading(true);
                        const res = await userService.getFavourites();
                        if (res.data) {
                              setDataBooks(res.data.data);
                        }
                  } catch (error) {
                        console.error('Error fetching favorites:', error);
                  } finally {
                        setLoading(false);
                  }
            };
            favorites();
      }, []);

      const handleAddToCart = useCallback((book: IBook) => {
            const finalPrice = book.promotionPrice && book.promotionPrice > 0
                  ? book.promotionPrice
                  : book.price;

            addToCart({
                  bookId: book._id,
                  title: book.title,
                  author: book.author,
                  price: finalPrice,
                  promotionPrice: book.promotionPrice ?? 0,
                  thumbnail: { url: book.thumbnail!.url },
                  slug: book.slug ?? ""
            });

            toast.success(`Đã thêm "${book.title}" vào giỏ hàng`);
      }, [addToCart]);

      const handleBuyNow = useCallback((book: IBook) => {
            handleAddToCart(book);
            toggleCart();
      }, [handleAddToCart, toggleCart]);

      if (loading) {
            return (
                  <div className="flex justify-center items-center p-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
                        <span className="ml-3 text-gray-600 dark:text-gray-400 text-sm">
                              Đang tải danh sách yêu thích...
                        </span>
                  </div>
            );
      }

      if (dataBooks.length === 0) {
            return (
                  <div className="text-center p-6 sm:p-8">
                        <div className="text-4xl sm:text-6xl mb-4">💔</div>
                        <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                              Danh sách yêu thích của bạn đang trống
                        </p>
                        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-500 mt-2">
                              Hãy thêm những cuốn sách yêu thích vào danh sách!
                        </p>
                  </div>
            );
      }

      return (
            <div className="w-full max-w-full px-3 sm:px-4 lg:px-4 pb-8 sm:pb-10">
                  <div className="flex mb-6 sm:mb-8">
                        <button className="relative overflow-hidden rounded-lg px-6 py-3 sm:px-8 sm:py-3 lg:px-16 lg:py-4">
                              <span className="absolute inset-px z-10 flex items-center justify-center rounded-lg dark:bg-black bg-[#ebe9e9] bg-gradient-to-t dark:from-neutral-800 from-neutral-100 dark:text-neutral-300 text-neutral-800 text-sm font-medium cursor-default">
                                    Đang có {dataBooks.length} sách
                              </span>
                              <span
                                    aria-hidden
                                    className="absolute inset-0 z-0 scale-x-[2] blur before:absolute before:inset-0 before:top-1/2 before:aspect-square before:animate-disco before:bg-gradient-conic before:from-purple-700 before:via-red-500 before:to-amber-400"
                              />
                        </button>
                  </div>

                  {dataBooks.length > 0 && (
                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 sm:gap-4 lg:gap-5 auto-rows-fr">
                              {dataBooks.map((book) => (
                                    <div key={book._id} className="flex">
                                          <BookCard
                                                book={book}
                                                variant="white_lists"
                                                showPrice={true}
                                                showRating={true}
                                                isPurchased={isPurchasedCheck(book._id)}
                                                showPurchaseDate={false}
                                                showActions={true}
                                                onAddToCart={handleAddToCart}
                                                onBuyNow={handleBuyNow}
                                                className="w-full"
                                          />
                                    </div>
                              ))}
                        </div>
                  )}
            </div>
      );
};

export default WhiteLists;
