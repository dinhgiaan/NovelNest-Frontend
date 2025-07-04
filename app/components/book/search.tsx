'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import { FcSearch } from "react-icons/fc";
import { CircularProgress } from '@mui/material';

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

const API_URL = 'http://localhost:8888/api/v1';

export default function SearchBar() {
      const [searchQuery, setSearchQuery] = useState('');
      const [searchResults, setSearchResults] = useState<Book[]>([]);
      const [isLoading, setIsLoading] = useState(false);
      const [isDropdownOpen, setIsDropdownOpen] = useState(false);
      const pathname = usePathname();
      const searchRef = useRef<HTMLDivElement>(null);
      const searchTimeout = useRef<NodeJS.Timeout | null>(null);

      // Close dropdown when clicking outside
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

      // Reset search when navigating
      useEffect(() => {
            setSearchQuery('');
            setSearchResults([]);
            setIsDropdownOpen(false);
      }, [pathname]);

      // Handle search with debounce
      useEffect(() => {
            if (searchTimeout.current) {
                  clearTimeout(searchTimeout.current);
            }

            if (searchQuery.trim().length < 1) {
                  setSearchResults([]);
                  setIsDropdownOpen(false);
                  return;
            }

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

      // Render stars based on rating
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

      return (
            <div className="relative w-full max-w-2xl mx-auto" ref={searchRef}>
                  <form className="flex">
                        <div className="relative flex w-full items-center group border-2 border-transparent focus-within:border-blue-500 focus-within:bg-white dark:focus-within:bg-gray-900 dark:focus-within:border-blue-400 bg-gray-200 dark:bg-gray-800 transition rounded-lg overflow-hidden">
                              <div className="px-3 sm:px-4 flex items-center justify-center bg-inherit flex-shrink-0 cursor-default">
                                    <FcSearch className="text-lg sm:text-xl" />
                              </div>

                              <input
                                    type="text"
                                    placeholder="Khám phá kho tàng sách cùng NovelNest..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full px-2 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-black dark:text-white focus:outline-none focus:ring-0 bg-inherit placeholder-gray-500 dark:placeholder-gray-400"
                                    autoComplete="off"
                              />
                        </div>
                  </form>

                  {/* Search Results Dropdown - Responsive */}
                  {isDropdownOpen && (
                        <div className="absolute z-20 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg max-h-80 sm:max-h-96 overflow-y-auto">
                              {isLoading ? (
                                    <div className="flex items-center justify-center p-4">
                                          <CircularProgress size={24} />
                                          <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">Đang tìm kiếm...</span>
                                    </div>
                              ) : searchResults.length > 0 ? (
                                    <div>
                                          {searchResults.map((book) => (
                                                <Link
                                                      key={book._id}
                                                      href={`/books/detail/${book.slug}`}
                                                      className="flex items-start p-3 sm:p-4 hover:bg-gray-100 dark:hover:bg-gray-700 border-b border-gray-200 dark:border-gray-600 last:border-b-0 transition-colors"
                                                      onClick={() => setIsDropdownOpen(false)}
                                                >
                                                      {/* Book thumbnail - responsive sizing */}
                                                      <div className="w-10 h-14 sm:w-12 sm:h-16 flex-shrink-0 mr-3 overflow-hidden rounded">
                                                            {book.thumbnail?.url ? (
                                                                  <Image
                                                                        src={book.thumbnail.url}
                                                                        alt={book.title}
                                                                        width={48}
                                                                        height={64}
                                                                        className="object-cover w-full h-full"
                                                                  />
                                                            ) : (
                                                                  <div className="w-full h-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center rounded">
                                                                        <span className="text-xs text-gray-300 dark:text-gray-400">No image</span>
                                                                  </div>
                                                            )}
                                                      </div>

                                                      {/* Book details - responsive text */}
                                                      <div className="flex-1 min-w-0">
                                                            <h3 className="font-medium text-sm sm:text-base text-black dark:text-white line-clamp-2">
                                                                  {book.title}
                                                            </h3>
                                                            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 truncate mt-1">
                                                                  {book.author}
                                                            </p>
                                                            <div className="flex items-center text-xs sm:text-sm mt-1">
                                                                  <div className="flex">
                                                                        {renderStars(book.rating)}
                                                                  </div>
                                                                  <span className="ml-1 text-gray-600 dark:text-gray-400">
                                                                        {book.rating.toFixed(1)}
                                                                  </span>
                                                            </div>
                                                      </div>
                                                </Link>
                                          ))}
                                    </div>
                              ) : (
                                    <div className="p-4 text-center text-gray-300 dark:text-gray-400">
                                          <div className="text-2xl mb-2">🧐</div>
                                          <div className="text-sm">Không tìm thấy sách phù hợp</div>
                                    </div>
                              )}
                        </div>
                  )}
            </div>
      );
}