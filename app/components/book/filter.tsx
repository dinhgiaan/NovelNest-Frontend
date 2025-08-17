import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowDown, ArrowRight, Funnel, MoveRight } from "lucide-react";
import { Slider, FormControl, Select, MenuItem, Chip, Collapse } from "@mui/material";
import useSWR from 'swr';
import { bookService, Category, FilterParams } from "../../lib/api/book";

interface FilterProps {
      onFilterChange?: (filters: FilterParams) => void;
      className?: string;
}

const Filter = ({ onFilterChange, className = "" }: FilterProps) => {
      const router = useRouter();
      const searchParams = useSearchParams();

      const [isExpanded, setIsExpanded] = useState(false);
      const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
      const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000]);
      const [selectedPublishers, setSelectedPublishers] = useState<string[]>([]);
      const [selectedRating, setSelectedRating] = useState<number | null>(null);
      const [sortBy, setSortBy] = useState<string>('newest');

      const { data: categoriesData } = useSWR<Category[]>('categories', () => bookService.getCategories());
      const { data: priceRangeData } = useSWR('price-range', () => bookService.getPriceRange());
      // const { data: publishersData } = useSWR('publishers', () => bookService.getPublishers());

      useEffect(() => {
            const categories = searchParams.getAll('categories');
            const publishers = searchParams.getAll('publishers');
            const minPrice = searchParams.get('minPrice');
            const maxPrice = searchParams.get('maxPrice');
            const rating = searchParams.get('rating');
            const sort = searchParams.get('sortBy');

            if (categories.length) setSelectedCategories(categories);
            if (publishers.length) setSelectedPublishers(publishers);
            if (minPrice || maxPrice) {
                  const minPriceLimit = priceRangeData?.data?.minPrice || 0;
                  const maxPriceLimit = priceRangeData?.data?.maxPrice || 1000000;
                  setPriceRange([
                        minPrice ? parseInt(minPrice) : minPriceLimit,
                        maxPrice ? parseInt(maxPrice) : maxPriceLimit
                  ]);
            }
            if (rating) setSelectedRating(parseInt(rating));
            if (sort) setSortBy(sort);
      }, [searchParams, priceRangeData]);

      useEffect(() => {
            if (priceRangeData?.data?.minPrice !== undefined && priceRangeData?.data?.maxPrice !== undefined) {
                  const { minPrice, maxPrice } = priceRangeData.data;
                  setPriceRange([minPrice, maxPrice]);
            }
      }, [priceRangeData]);

      const applyFilters = useCallback(() => {
            const params = new URLSearchParams(searchParams.toString());

            params.delete('categories');
            params.delete('publishers');
            params.delete('minPrice');
            params.delete('maxPrice');
            params.delete('rating');
            params.delete('sortBy');
            params.set('page', '1');

            selectedCategories.forEach(cat => params.append('categories', cat));
            selectedPublishers.forEach(pub => params.append('publishers', pub));

            const minPriceLimit = priceRangeData?.data?.minPrice || 0;
            const maxPriceLimit = priceRangeData?.data?.maxPrice || 1000000;

            if (priceRange[0] > minPriceLimit) {
                  params.set('minPrice', priceRange[0].toString());
            }
            if (priceRange[1] < maxPriceLimit) {
                  params.set('maxPrice', priceRange[1].toString());
            }

            if (selectedRating) params.set('rating', selectedRating.toString());
            if (sortBy !== 'newest') params.set('sortBy', sortBy);

            router.push(`/books?${params.toString()}`, { scroll: false });

            if (onFilterChange) {
                  const filterParams: FilterParams = {
                        categories: selectedCategories.length ? selectedCategories : undefined,
                        publisher: selectedPublishers.length ? selectedPublishers : undefined,
                        minPrice: priceRange[0] > minPriceLimit ? priceRange[0] : undefined,
                        maxPrice: priceRange[1] < maxPriceLimit ? priceRange[1] : undefined,
                        rating: selectedRating || undefined,
                        sortBy: sortBy as FilterParams['sortBy']
                  };
                  onFilterChange(filterParams);
            }
      }, [selectedCategories, selectedPublishers, priceRange, selectedRating, sortBy, searchParams, router, onFilterChange, priceRangeData]);

      const clearFilters = () => {
            setSelectedCategories([]);
            setSelectedPublishers([]);
            setSelectedRating(null);
            setSortBy('newest');
            if (priceRangeData?.data) {
                  setPriceRange([priceRangeData.data.minPrice, priceRangeData.data.maxPrice]);
            }

            const params = new URLSearchParams(searchParams.toString());
            params.delete('categories');
            params.delete('publishers');
            params.delete('minPrice');
            params.delete('maxPrice');
            params.delete('rating');
            params.delete('sortBy');
            params.set('page', '1');

            router.push(`/books?${params.toString()}`, { scroll: false });
      };

      const hasActiveFilters = selectedCategories.length > 0 ||
            selectedPublishers.length > 0 ||
            selectedRating !== null ||
            sortBy !== 'newest' ||
            (priceRangeData?.data &&
                  (priceRange[0] > (priceRangeData.data.minPrice || 0) ||
                        priceRange[1] < (priceRangeData.data.maxPrice || 1000000)));

      const formatPrice = (value: number) => {
            return new Intl.NumberFormat('vi-VN').format(value) + ' đ';
      };

      const toggleCategory = (categoryId: string) => {
            setSelectedCategories(prev =>
                  prev.includes(categoryId)
                        ? prev.filter(id => id !== categoryId)
                        : [...prev, categoryId]
            );
      };

      // const togglePublisher = (publisherName: string) => {
      //       setSelectedPublishers(prev =>
      //             prev.includes(publisherName)
      //                   ? prev.filter(name => name !== publisherName)
      //                   : [...prev, publisherName]
      //       );
      // };

      return (
            <div className={`bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded ${className}`}>
                  <div
                        className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                        onClick={() => setIsExpanded(!isExpanded)}
                  >
                        <div className="flex items-center space-x-3">
                              <Funnel size={16} className="text-gray-600 dark:text-gray-400" />
                              <span className="font-medium text-gray-900 dark:text-white text-sm">Bộ lọc</span>
                        </div>

                        <div className="flex items-center space-x-2">
                              {hasActiveFilters && (
                                    <button
                                          onClick={(e) => {
                                                e.stopPropagation();
                                                clearFilters();
                                          }}
                                          className="text-xs text-red-800 px-2 hover:text-red-600"
                                    >
                                          Xóa
                                    </button>
                              )}
                              <span className="">{isExpanded ? <ArrowDown size={15} /> : <ArrowRight size={15} />}</span>
                        </div>
                  </div>

                  {/* Filter Content */}
                  <Collapse in={isExpanded}>
                        <div className="px-2 pb-4 pt-4 space-y-4 border-t border-gray-100 dark:border-gray-700">

                              {/* Sort */}
                              <div className="grid grid-cols-12 items-center gap-4">
                                    <label className="col-span-2 lg:col-span-1 text-xs dark:text-[#e0dcdc] font-semibold text-right">Sắp xếp:</label>
                                    <div className="col-span-10 xl:col-span-11">
                                          <FormControl size="small" sx={{ minWidth: 200 }}>
                                                <Select
                                                      value={sortBy}
                                                      onChange={(e) => setSortBy(e.target.value)}
                                                      sx={{
                                                            '& .MuiSelect-select': {
                                                                  fontSize: '13px',
                                                                  padding: '4px 8px',
                                                                  minHeight: 'unset',
                                                            },
                                                            '& .MuiOutlinedInput-root': {
                                                                  borderRadius: '4px',
                                                                  '& fieldset': { borderColor: '#e5e7eb' },
                                                            }
                                                      }}
                                                >
                                                      <MenuItem value="newest">Mới nhất</MenuItem>
                                                      <MenuItem value="oldest">Cũ nhất</MenuItem>
                                                      <MenuItem value="price_asc">Giá thấp → cao</MenuItem>
                                                      <MenuItem value="price_desc">Giá cao → thấp</MenuItem>
                                                      <MenuItem value="rating">Đánh giá cao</MenuItem>
                                                </Select>
                                          </FormControl>
                                    </div>
                              </div>

                              {/* Categories */}
                              {categoriesData && categoriesData?.length > 0 && (
                                    <div className="grid grid-cols-12 items-center gap-4">
                                          <label className="col-span-2 lg:col-span-1 text-xs dark:text-[#e0dcdc] font-semibold text-right">Thể loại:</label>
                                          <div className="col-span-10 xl:col-span-11">
                                                <div className="flex flex-wrap gap-1.5">
                                                      {categoriesData.map((category) => (
                                                            <Chip
                                                                  key={category._id}
                                                                  label={category.name}
                                                                  clickable
                                                                  onClick={() => toggleCategory(category._id)}
                                                                  variant="outlined"
                                                                  size="small"
                                                                  sx={{
                                                                        borderRadius: '6px',
                                                                        height: '24px',
                                                                        fontSize: '11px',
                                                                        fontWeight: 500,
                                                                        borderWidth: '0.5px',
                                                                        borderStyle: 'solid',
                                                                        borderColor: selectedCategories.includes(category._id)
                                                                              ? '#6dced1'
                                                                              : '#63666b',
                                                                        backgroundColor: 'transparent',
                                                                        color: selectedCategories.includes(category._id)
                                                                              ? '#6dced1'
                                                                              : '#91949c',
                                                                        '& .MuiChip-label': { px: 1 },
                                                                        '&:hover': {
                                                                              backgroundColor: 'transparent',
                                                                              borderColor: selectedCategories.includes(category._id)
                                                                                    ? '#2563eb'
                                                                                    : 'rgba(0,0,0,0.2)',
                                                                              color: selectedCategories.includes(category._id)
                                                                                    ? '#2563eb'
                                                                                    : '#374151',
                                                                        },
                                                                  }}
                                                            />
                                                      ))}
                                                </div>
                                          </div>
                                    </div>
                              )}

                              {/* Publishers */}
                              {/* {publishersData && publishersData.length > 0 && (
                                    < div className="grid grid-cols-12 items-center gap-4">
                                          <label className="col-span-2 lg:col-span-1 text-xs dark:text-[#e0dcdc] font-semibold text-right">Nhà xuất bản:</label>
                                          <div className="col-span-10 xl:col-span-11">
                                                <div className="flex flex-wrap gap-1.5">
                                                      {publishersData.map((publisher) => (
                                                            <Chip
                                                                  key={publisher.name}
                                                                  label={publisher.name}
                                                                  clickable
                                                                  onClick={() => togglePublisher(publisher.name)}
                                                                  variant="outlined"
                                                                  size="small"
                                                                  sx={{
                                                                        borderRadius: '6px',
                                                                        height: '24px',
                                                                        fontSize: '11px',
                                                                        fontWeight: 500,
                                                                        borderColor: selectedPublishers.includes(publisher.name)
                                                                              ? '#6dced1'
                                                                              : '#63666b',
                                                                        backgroundColor: 'transparent',
                                                                        color: selectedPublishers.includes(publisher.name)
                                                                              ? '#6dced1'
                                                                              : '#91949c',
                                                                        '& .MuiChip-label': { px: 1 },
                                                                        '&:hover': {
                                                                              backgroundColor: selectedPublishers.includes(publisher.name) ? '#047857' : '#f9fafb',
                                                                              borderColor: selectedPublishers.includes(publisher.name) ? '#047857' : '#9ca3af',
                                                                        }
                                                                  }}
                                                            />
                                                      ))}
                                                </div>
                                          </div>
                                    </>
                              )} */}

                              {/* Price Range */}
                              {priceRangeData?.data && (
                                    <div className="grid grid-cols-12 items-center gap-4">
                                          <label className="col-span-2 lg:col-span-1 text-xs dark:text-[#e0dcdc] font-semibold text-right">Giá:</label>
                                          <div className="col-span-10 xl:col-span-11">
                                                <div className="bg-gray-50 dark:bg-gray-800 rounded p-3">
                                                      <Slider
                                                            value={priceRange}
                                                            onChange={(_, newValue) => setPriceRange(newValue as [number, number])}
                                                            valueLabelDisplay="auto"
                                                            valueLabelFormat={formatPrice}
                                                            min={priceRangeData.data.minPrice || 0}
                                                            max={priceRangeData.data.maxPrice || 1000000}
                                                            step={10000}
                                                            size="small"
                                                            sx={{
                                                                  color: '#3b82f6',
                                                                  height: 4,
                                                                  '& .MuiSlider-thumb': { width: 16, height: 16 },
                                                                  '& .MuiSlider-track': { height: 4 },
                                                                  '& .MuiSlider-rail': { height: 4, backgroundColor: '#e5e7eb' },
                                                                  '& .MuiSlider-valueLabel': { fontSize: '11px' }
                                                            }}
                                                      />
                                                      <div className="flex justify-between text-xs text-gray-600 mt-2">
                                                            <span>{formatPrice(priceRange[0])}</span>
                                                            <span>{formatPrice(priceRange[1])}</span>
                                                      </div>
                                                </div>
                                          </div>
                                    </div>
                              )}

                              {/* Rating */}
                              <div className="grid grid-cols-12 items-center gap-4">
                                    <label className="col-span-2 lg:col-span-1 text-xs dark:text-[#e0dcdc] font-semibold text-right">Đánh giá:</label>
                                    <div className="col-span-10 xl:col-span-11">
                                          <div className="flex space-x-2">
                                                {[5, 4, 3, 2, 1].map((rating) => (
                                                      <button
                                                            key={rating}
                                                            className={`px-2 py-1 rounded-md text-xs font-medium transition-colors ${selectedRating === rating
                                                                  ? 'bg-yellow-400 text-black'
                                                                  : 'border border-[#797f8a] text-[#91949c] hover:bg-gray-700'
                                                                  }`}
                                                            onClick={() => setSelectedRating(selectedRating === rating ? null : rating)}
                                                      >
                                                            {rating} sao
                                                      </button>
                                                ))}
                                          </div>
                                    </div>
                              </div>

                              {/* Actions */}
                              <div className="flex space-x-2 pt-2 pl-2 sm:pl-5">
                                    <button
                                          onClick={(e) => {
                                                e.stopPropagation();
                                                applyFilters();
                                          }}
                                          className="flex space-x-2 items-center bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium py-1 px-3 rounded-full transition-colors"
                                    >
                                          <span>Lọc kết quả</span>
                                          <MoveRight size={15} />
                                    </button>
                                    <button
                                          onClick={() => setIsExpanded(false)}
                                          className="px-3 py-2 border border-gray-300 dark:text-white text-xs font-medium rounded-full hover:bg-gray-50 dark:hover:text-black transition-colors"
                                    >
                                          Đóng
                                    </button>
                              </div>
                        </div>
                  </Collapse >
            </div >
      );
};

export default Filter;
