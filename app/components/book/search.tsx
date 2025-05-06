'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import { FcSearch } from "react-icons/fc";
import { CircularProgress } from '@mui/material';

// Định nghĩa kiểu dữ liệu cho một cuốn sách
interface Book {
      _id: string;
      slug: string;
      title: string;
      author: string;
      rating: number;
      thumbnail: {
            url: string;
      };
}

// API URL
const API_URL = 'http://localhost:8888/api/v1';

export default function SearchBar() {
      const [searchQuery, setSearchQuery] = useState('');
      const [searchResults, setSearchResults] = useState<Book[]>([]);
      const [isLoading, setIsLoading] = useState(false);
      const [isDropdownOpen, setIsDropdownOpen] = useState(false);
      const router = useRouter();
      const pathname = usePathname();
      const searchRef = useRef<HTMLDivElement>(null);
      const searchTimeout = useRef<NodeJS.Timeout | null>(null);

      // Đóng dropdown khi click ra ngoài
      useEffect(() => {
            const handleClickOutside = (event: MouseEvent) => {
                  if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                        setIsDropdownOpen(false);
                  }
            };

            document.addEventListener('mousedown', handleClickOutside);
            return () => {
                  document.removeEventListener('mousedown', handleClickOutside);
            };
      }, []);

      // Reset search khi chuyển trang
      useEffect(() => {
            setSearchQuery('');
            setSearchResults([]);
            setIsDropdownOpen(false);
      }, [pathname]);

      // Xử lý tìm kiếm với debounce
      useEffect(() => {
            // Xóa timeout cũ nếu có
            if (searchTimeout.current) {
                  clearTimeout(searchTimeout.current);
            }

            if (searchQuery.trim().length < 1) {
                  setSearchResults([]);
                  setIsDropdownOpen(false);
                  return;
            }

            // Tạo timeout mới (debounce 300ms)
            searchTimeout.current = setTimeout(async () => {
                  setIsLoading(true);
                  try {
                        const { data } = await axios.get(`${API_URL}/search?title=${encodeURIComponent(searchQuery)}`);
                        if (data.success) {
                              setSearchResults(data.data);
                              setIsDropdownOpen(true);
                        } else {
                              setSearchResults([]);
                        }
                  } catch (error) {
                        console.error('Search error:', error);
                        setSearchResults([]);
                  } finally {
                        setIsLoading(false);
                  }
            }, 300);

            return () => {
                  if (searchTimeout.current) {
                        clearTimeout(searchTimeout.current);
                  }
            };
      }, [searchQuery]);

      // Xử lý submit form
      const handleSubmit = (e: React.FormEvent) => {
            e.preventDefault();
            if (searchQuery.trim()) {
                  router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
                  setIsDropdownOpen(false);
            }
      };

      // Render stars dựa vào rating
      const renderStars = (rating: number) => {
            const stars = [];
            const fullStars = Math.floor(rating);
            const hasHalfStar = rating % 1 >= 0.5;

            for (let i = 0; i < 5; i++) {
                  if (i < fullStars) {
                        stars.push(<span key={i} className="text-yellow-500">★</span>);
                  } else if (i === fullStars && hasHalfStar) {
                        stars.push(<span key={i} className="text-yellow-500">★</span>);
                  } else {
                        stars.push(<span key={i} className="text-gray-300">★</span>);
                  }
            }

            return stars;
      };

      console.log('--> check searchResults: ', searchResults);

      return (
            <div className="relative w-2/3" ref={searchRef}>
                  <form onSubmit={handleSubmit} className="flex">
                        <div className="relative flex w-full items-center border border-[#ccc] bg-gray-800">
                              <button
                                    type="submit"
                                    className="px-3 focus:outline-none bg-gray-800"
                              >
                                    <FcSearch />
                              </button>
                              <input
                                    type="text"
                                    placeholder="Khám phá kho tàng sách cùng NovelNest - Vô vàn ưu đãi"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full px-4 py-2 text-white bg-gray-800 focus:outline-none focus:ring-2"
                                    autoComplete="off"
                              />
                        </div>

                  </form>

                  {isDropdownOpen && (
                        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg max-h-80 overflow-y-auto">
                              {isLoading ? (
                                    <CircularProgress />
                              ) : searchResults.length > 0 ? (
                                    <div>
                                          {searchResults.map((book) => (
                                                <Link
                                                      key={book._id}
                                                      href={`/books/detail/${book.slug}`}
                                                      className="flex items-start p-3 hover:bg-gray-200 border-b border-gray-200 last:border-b-0"
                                                      onClick={() => setIsDropdownOpen(false)}
                                                >
                                                      <div className="w-12 h-16 flex-shrink-0 mr-3 overflow-hidden">
                                                            {book.thumbnail?.url ? (
                                                                  <Image
                                                                        src={book.thumbnail.url}
                                                                        alt={book.title}
                                                                        width={48}
                                                                        height={64}
                                                                        className="object-cover w-full h-full"
                                                                  />
                                                            ) : (
                                                                  <div className="w-12 h-16 bg-gray-200 flex items-center justify-center">
                                                                        <span className="text-xs text-gray-500">No image</span>
                                                                  </div>
                                                            )}
                                                      </div>
                                                      <div className="flex-1">
                                                            <h3 className="font-medium text-sm text-black">{book.title}</h3>
                                                            <p className="text-xs text-gray-600">{book.author}</p>
                                                            <div className="flex text-xs mt-1">
                                                                  {renderStars(book.rating)}
                                                                  <span className="ml-1 text-gray-600">{book.rating.toFixed(1)}</span>
                                                            </div>
                                                      </div>
                                                </Link>
                                          ))}
                                    </div>
                              ) : (
                                    <div className="p-4 text-center text-gray-500">Không tìm thấy sách phù hợp 🧐</div>
                              )}
                        </div>
                  )}
            </div>
      );
}