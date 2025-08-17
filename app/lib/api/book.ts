import axios from '../custom.api';

const BASE_URL = '/api/v1';

type CustomAxiosResponse<T> = T;

interface FilterParams {
      page?: number;
      limit?: number;
      categories?: string[];
      minPrice?: number;
      maxPrice?: number;
      publisher?: string[];
      rating?: number;
      sortBy?: 'newest' | 'oldest' | 'price_asc' | 'price_desc' | 'rating';
      search?: string;
}

interface PurchasedBooksResponse {
      success?: boolean;
      data: IBook[];
      message?: string;
}

export interface Category {
      _id: string;
      name: string;
      count: number;
}

interface CategoryResponse {
      success: boolean;
      data: Category[];
}

export interface PriceRangeResponse {
      success: boolean;
      data: {
            minPrice: number;
            maxPrice: number;
      };
}

export interface PublisherResponse {
      success: boolean;
      data: Array<{
            name: string;
            count: number;
      }>;
}

export const bookService = {
      async getAllBooks(params?: IPaginationParams): Promise<IBookResponse> {
            try {
                  const queryParams = new URLSearchParams();

                  if (params?.page !== undefined) {
                        queryParams.append('page', params.page.toString());
                  }

                  if (params?.limit !== undefined) {
                        queryParams.append('limit', params.limit.toString());
                  }

                  const queryString = queryParams.toString();
                  const url = `${BASE_URL}/books${queryString ? `?${queryString}` : ''}`;

                  const response: CustomAxiosResponse<IBookResponse> = await axios.get(url);

                  return response;
            } catch (error) {
                  console.error('API Service Error:', error);
                  throw new Error('Failed to get books');
            }
      },

      async getAllBooksWithPagination(page: number, limit: number): Promise<IBookResponse> {
            return this.getAllBooks({ page, limit });
      },

      async getBookDetail(slug: string) {
            try {
                  const response = await axios.get(`${BASE_URL}/books/detail/${slug}`);
                  return response;
            } catch (error) {
                  console.error('Get book detail error:', error);
                  throw new Error('Failed to get book detail');
            }
      },

      async getPurchasedBooks(): Promise<CustomAxiosResponse<PurchasedBooksResponse>> {
            try {
                  const response = await axios.get(`${BASE_URL}/purchased-books`);
                  return response;
            } catch (error) {
                  throw error
            }
      },

      async filterBooks(params: FilterParams): Promise<IBookResponse> {
            try {
                  const queryParams = new URLSearchParams();

                  Object.entries(params).forEach(([key, value]) => {
                        if (value !== undefined && value !== null) {
                              if (Array.isArray(value)) {
                                    value.forEach(v => queryParams.append(key, v.toString()));
                              } else {
                                    queryParams.append(key, value.toString());
                              }
                        }
                  });

                  const url = `${BASE_URL}/books?${queryParams.toString()}`;
                  const response = await axios.get(url);

                  return response;
            } catch (error) {
                  console.error('Filter API Error:', error);
                  throw new Error('Failed to filter books');
            }
      },

      async getCategories(): Promise<Category[]> {
            try {
                  const response: CategoryResponse = await axios.get(`${BASE_URL}/get-all-categories`);
                  return response.data;
            } catch (error) {
                  console.error('Categories API Error:', error);
                  throw new Error('Failed to get categories');
            }
      },

      async getPriceRange(): Promise<PriceRangeResponse> {
            try {
                  const response = await axios.get(`${BASE_URL}/price-range`);
                  return response.data;
            } catch (error) {
                  console.error('Price Range API Error:', error);
                  throw new Error('Failed to get price range');
            }
      },

      async getPublishers(): Promise<PublisherResponse> {
            try {
                  const response = await axios.get(`${BASE_URL}/get-all-publishers`);
                  return response.data;
            } catch (error) {
                  console.error('Publishers API Error:', error);
                  throw new Error('Failed to get publishers');
            }
      },

      async searchBooks(title: string) {
            try {
                  const response = await axios.get(`${BASE_URL}/search?title=${encodeURIComponent(title)}`);
                  return response.data;
            } catch (error) {
                  console.error('Search API Error:', error);
                  throw new Error('Failed to search books');
            }
      }
};

export type { FilterParams };
