import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Star } from "lucide-react";
import convertPriceToVND from "../utils/convert.price";
import Button from "./button";

interface Thumbnail {
      url: string;
      alt?: string;
}

interface Category {
      _id: string;
      name: string;
}

interface Book {
      _id: string;
      title: string;
      author: string;
      slug: string;
      price?: number;
      discountPercent?: number;
      rating?: number;
      thumbnail?: Thumbnail;
      categories?: Category[] | string[];
      purchaseDate?: string;
      isbn?: string;
      publicDate?: string;
      description?: string;
}

interface BookCardProps {
      book: Book;
      variant?: 'default' | 'purchased' | 'detail';
      isPurchased?: boolean;
      onAddToCart?: (book: Book) => void;
      onBuyNow?: (book: Book) => void;
      onPreview?: (book: Book) => void;
      showActions?: boolean;
      showRating?: boolean;
      showPrice?: boolean;
      showPurchaseDate?: boolean;
      className?: string;
}

const BookCard = ({
      book,
      variant = 'default',
      isPurchased = false,
      onAddToCart,
      onBuyNow,
      onPreview,
      showActions = true,
      showRating = true,
      showPrice = true,
      showPurchaseDate = false,
      className = ''
}: BookCardProps) => {

      const calculateDiscountedPrice = (originalPrice: number, discountPercent: number) => {
            return originalPrice * (1 - discountPercent / 100);
      };

      const formatDate = (date: string) => {
            return new Date(date).toLocaleDateString('vi-VN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
            });
      };

      const optimizeCloudinaryUrl = (url: string) => {
            if (!url.includes('res.cloudinary.com')) return url;
            return url.replace('/upload/', '/upload/f_auto,q_auto/');
      };

      const discountedPrice = book.price && book.discountPercent && book.discountPercent > 0
            ? calculateDiscountedPrice(book.price, book.discountPercent)
            : book.price;

      const renderDiscountBadge = () => {
            if (!book.discountPercent || book.discountPercent <= 0) return null;

            return (
                  <div className="absolute top-2 left-2 z-10">
                        <div className="relative">
                              <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs px-3 py-1 rounded-full font-bold shadow-lg animate-pulse">
                                    GIẢM {book.discountPercent}%
                              </div>
                              <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-ping"></div>
                              <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-300 rounded-full"></div>
                        </div>
                  </div>
            );
      };

      const renderPrice = () => {
            if (!showPrice || !book.price) return null;

            return (
                  <div className="mt-2">
                        {book.discountPercent && book.discountPercent > 0 ? (
                              <div className="flex flex-col gap-1">
                                    <span className="text-gray-400 dark:text-gray-500 text-[10px] sm:text-xs line-through">
                                          {convertPriceToVND(book.price)}
                                    </span>
                                    <span className="text-red-600 dark:text-red-400 text-xs sm:text-sm font-semibold">
                                          {convertPriceToVND(discountedPrice!)}
                                    </span>
                              </div>
                        ) : (
                              <span className="text-emerald-600 dark:text-emerald-400 text-xs sm:text-sm font-semibold">
                                    {convertPriceToVND(book.price)}
                              </span>
                        )}
                  </div>
            );
      };

      const renderRating = () => {
            if (!showRating || !book.rating) return null;

            if (variant === 'detail') {
                  return (
                        <div className="flex items-center justify-center space-x-2 mb-4">
                              <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                          <Star
                                                key={i}
                                                className={`h-4 w-4 ${i < Math.floor(book.rating!)
                                                      ? "fill-yellow-400 text-yellow-400"
                                                      : "fill-gray-200 text-gray-200 dark:fill-gray-600 dark:text-gray-600"
                                                      }`}
                                          />
                                    ))}
                              </div>
                              <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                                    {book.rating.toFixed(1)}
                              </span>
                        </div>
                  );
            }

            return (
                  <div className="flex items-center mt-1">
                        <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-yellow-400 text-yellow-400" />
                        <span className="ml-1 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                              {book.rating.toFixed(1)}
                        </span>
                  </div>
            );
      };

      const renderPurchaseDate = () => {
            if (!showPurchaseDate || !book.purchaseDate) return null;

            return (
                  <p className="text-xs text-gray-300 dark:text-gray-400 mb-1">
                        Mua vào: {formatDate(book.purchaseDate)}
                  </p>
            );
      };

      const renderActions = () => {
            if (!showActions) return null;

            switch (variant) {
                  case 'purchased':
                        return (
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center md:opacity-0 md:group-hover:opacity-100">
                                    <Link href={`/books/detail/${book.slug}`}>
                                          <Button variant="blue" size="sm">
                                                Đọc sách
                                          </Button>
                                    </Link>
                              </div>
                        );

                  case 'detail':
                        return (
                              <div className="flex gap-3 justify-center mt-4">
                                    <Button
                                          variant="purple"
                                          size="sm"
                                          onClick={() => onPreview?.(book)}
                                    >
                                          Xem trước
                                    </Button>
                                    <Button
                                          variant="green"
                                          size="sm"
                                          onClick={() => onBuyNow?.(book)}
                                    >
                                          Mua ngay
                                    </Button>
                              </div>
                        );

                  default:
                        if (isPurchased) {
                              return (
                                    <div className="mt-auto">
                                          <Link href={`/books/detail/${book.slug}`}>
                                                <Button variant="green" size="sm" className="w-full">
                                                      Đọc sách
                                                </Button>
                                          </Link>
                                    </div>
                              );
                        }

                        return (
                              <div className="flex gap-2 mt-auto w-full">
                                    <Button
                                          variant="blue"
                                          size="sm"
                                          onClick={() => onAddToCart?.(book)}
                                          className="flex-1 flex items-center justify-center whitespace-nowrap"
                                    >
                                          <ShoppingCart className="w-3 h-3 mr-1" />
                                          <span className="hidden sm:inline">Thêm</span>
                                          <span className="sm:hidden">Giỏ</span>
                                    </Button>
                                    <Button
                                          variant="purple"
                                          size="sm"
                                          onClick={() => onBuyNow?.(book)}
                                          className="flex-1 whitespace-nowrap"
                                    >
                                          Mua ngay
                                    </Button>
                              </div>
                        );
            }
      };

      const getImageContainerStyles = () => {
            switch (variant) {
                  case 'purchased':
                        return 'relative h-40 sm:h-48 w-full';
                  case 'detail':
                        return 'relative aspect-[3/4] w-full max-w-[280px] mx-auto';
                  default:
                        return 'relative aspect-[2/3] w-full';
            }
      };

      const getCardContainerStyles = () => {
            const shimmerBase = "relative before:absolute before:inset-0 before:z-10 before:pointer-events-none before:opacity-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:translate-x-[-100%] hover:before:opacity-100 hover:before:animate-[shimmer_1s_ease-in-out] hover:before:translate-x-[100%] dark:hover:before:via-white/10";

            switch (variant) {
                  case 'purchased':
                        return `group relative bg-white dark:bg-gray-800 rounded-sm shadow-md hover:shadow-lg transition-all overflow-hidden border border-gray-200 dark:border-gray-700 ${shimmerBase}`;
                  case 'detail':
                        return 'bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden max-w-xs mx-auto';
                  default:
                        return `group relative bg-white dark:bg-gray-800 rounded-md overflow-hidden shadow-md transition-shadow duration-200 hover:shadow-lg flex flex-col ${shimmerBase}`;
            }
      };

      return (
            <div className={`${getCardContainerStyles()} ${className}`}>
                  {variant === 'detail' ? (
                        <div className={`${getImageContainerStyles()} overflow-hidden bg-gray-100 dark:bg-gray-700`}>
                              <span className="absolute top-3 right-3 text-xs font-medium px-2 py-1 rounded-full bg-emerald-500 text-white z-10">
                                    Có sẵn
                              </span>

                              <Image
                                    src={optimizeCloudinaryUrl(book?.thumbnail?.url || '/placeholder-book.jpg')}
                                    alt={book.title}
                                    fill
                                    className="object-cover rounded-t-lg"
                                    priority
                                    quality={85}
                                    sizes="(max-width: 640px) 90vw, (max-width: 768px) 60vw, 280px"
                              />
                        </div>
                  ) : (
                        <Link href={`/books/detail/${book.slug}`} className="block">
                              <div className={`${getImageContainerStyles()} overflow-hidden bg-gray-100 dark:bg-gray-700`}>
                                    {renderDiscountBadge()}

                                    <Image
                                          src={optimizeCloudinaryUrl(book?.thumbnail?.url || '/placeholder-book.jpg')}
                                          alt={book.title}
                                          fill
                                          className="object-cover"
                                          loading="lazy"
                                          sizes="(max-width: 640px) 45vw, (max-width: 768px) 30vw, (max-width: 1024px) 23vw, (max-width: 1280px) 18vw, 15vw"
                                    />

                                    {variant === 'purchased' && renderActions()}
                              </div>
                        </Link>
                  )}

                  <div className={`${variant === 'detail' ? 'p-4' : 'p-3'} flex flex-col flex-1`}>
                        {renderPurchaseDate()}

                        <h3 className={`font-medium text-gray-900 dark:text-white leading-tight ${variant === 'detail'
                              ? 'text-lg mb-2'
                              : 'text-xs sm:text-sm mb-1'
                              }`} title={book.title}>
                              <span className="line-clamp-2">{book.title}</span>
                        </h3>

                        <p className={`text-gray-600 dark:text-gray-300 italic mb-1 ${variant === 'detail' ? 'text-sm' : 'text-[10px] sm:text-xs'
                              }`}>
                              <span className="line-clamp-1">{book.author}</span>
                        </p>

                        {renderPrice()}

                        {renderRating()}

                        {variant !== 'purchased' && (
                              <div className="mt-auto pt-2">
                                    {renderActions()}
                              </div>
                        )}
                  </div>
            </div>
      );
};

export default BookCard;
