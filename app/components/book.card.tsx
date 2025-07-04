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
                  <div className="mt-1">
                        {book.discountPercent && book.discountPercent > 0 ? (
                              <div className="flex flex-row justify-between">
                                    <span className="text-gray-400 dark:text-gray-500 text-[10px] sm:text-xs line-through">
                                          {convertPriceToVND(book.price)}
                                    </span>
                                    <span className="text-red-600 dark:text-red-400 text-xs sm:text-xs font-semibold">
                                          {convertPriceToVND(discountedPrice!)}
                                    </span>
                              </div>
                        ) : (
                              <span className="text-emerald-600 dark:text-emerald-400 text-xs sm:text-sm font-semibold block">
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
                  <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="ml-1 text-sm text-gray-600 dark:text-gray-300">
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
                                          <ShoppingCart size={14} className="mr-1" />
                                          Mua sách
                                    </Button>
                              </div>
                        );

                  default:
                        if (isPurchased) {
                              return (
                                    <Link href={`/books/detail/${book.slug}`}>
                                          <Button variant="green" size="sm" className="w-full mt-2">
                                                Đọc sách
                                          </Button>
                                    </Link>
                              );
                        }

                        return (
                              <div className="flex gap-2 mt-2">
                                    <Button
                                          variant="blue"
                                          size="sm"
                                          onClick={() => onAddToCart?.(book)}
                                          className="flex-1"
                                    >
                                          <ShoppingCart className="w-3 h-3 mr-1" />
                                          <span className="hidden sm:inline">Thêm vào giỏ</span>
                                          <span className="sm:hidden">Giỏ</span>
                                    </Button>
                                    <Button
                                          variant="purple"
                                          size="sm"
                                          onClick={() => onBuyNow?.(book)}
                                          className="flex-1"
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
                        return 'relative h-[15rem] w-full';
                  case 'detail':
                        return 'relative h-[300px] w-[240px] mx-auto';
                  default:
                        return 'relative aspect-[2/3] w-full';
            }
      };

      const getCardContainerStyles = () => {
            switch (variant) {
                  case 'purchased':
                        return 'group relative bg-white dark:bg-gray-800 rounded-sm shadow-md hover:shadow-lg transition-all overflow-hidden border border-gray-200 dark:border-gray-700 hover:ring-2 hover:ring-indigo-400';
                  case 'detail':
                        return 'bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden max-w-sm mx-auto';
                  default:
                        return 'group relative bg-white dark:bg-gray-800 rounded-md overflow-hidden shadow-md transition-shadow duration-200 hover:shadow-lg hover:ring-2 hover:ring-indigo-400';
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
                                    className="object-cover"
                                    priority
                                    quality={80}
                              />
                        </div>
                  ) : (
                        <Link href={`/books/detail/${book.slug}`}>
                              <div className={`${getImageContainerStyles()} overflow-hidden bg-gray-100 dark:bg-gray-700`}>
                                    {renderDiscountBadge()}

                                    <Image
                                          src={optimizeCloudinaryUrl(book?.thumbnail?.url || '/placeholder-book.jpg')}
                                          alt={book.title}
                                          fill
                                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                                          loading="lazy"
                                          sizes="(max-width: 640px) 45vw, (max-width: 768px) 30vw, (max-width: 1024px) 23vw, (max-width: 1280px) 18vw, 15vw"
                                    />

                                    {variant === 'purchased' && renderActions()}
                              </div>
                        </Link>
                  )}

                  <div className={variant === 'detail' ? 'p-4' : 'p-2 sm:p-3'}>
                        {renderPurchaseDate()}

                        <h3 className={`font-medium text-gray-900 dark:text-white leading-tight ${variant === 'detail'
                              ? 'text-lg mb-2'
                              : 'text-xs sm:text-sm whitespace-nowrap overflow-hidden text-ellipsis'
                              }`} title={book.title}>
                              {book.title}
                        </h3>

                        <p className={`text-gray-600 dark:text-gray-300 line-clamp-1 italic mt-1 ${variant === 'detail' ? 'text-sm' : 'text-[10px] sm:text-xs'
                              }`}>
                              {book.author}
                        </p>

                        {renderPrice()}

                        {renderRating()}

                        {variant !== 'purchased' && renderActions()}
                  </div>
            </div>
      );
};

export default BookCard;
