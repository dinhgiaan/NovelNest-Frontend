import axios from '../custom.api';
import { IBook, IPaginationParams, IPaginationInfo, IBookResponse } from '../../types/book.types.d';

const BASE_URL = '/api/v1';

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

                  const response = await axios.get<IBookResponse>(url);

                  return response as IBookResponse;
            } catch (error) {
                  console.error('API Service Error:', error);
                  throw new Error('Failed to get books');
            }
      },

      async getAllBooksWithPagination(page: number, limit: number): Promise<IBookResponse> {
            return this.getAllBooks({ page, limit });
      },

      async getAllBooksNoPagination(): Promise<IBookResponse> {
            return this.getAllBooks();
      },
};

export type { IBook, IPaginationInfo, IPaginationParams, IBookResponse };