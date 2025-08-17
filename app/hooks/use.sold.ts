import useSWR from "swr"
import { bookService } from "../lib/api/book"

export const useBooksSold = (params?: IPaginationParams) => {
      const key = params ? ['books', params] : 'books'

      return useSWR(
            key,
            () => bookService.getAllBooks(params),
            {
                  revalidateIfStale: false,
                  revalidateOnFocus: false,
                  revalidateOnReconnect: true,
                  dedupingInterval: 300000,
                  errorRetryCount: 3,
                  errorRetryInterval: 1000,
                  keepPreviousData: true,
            }
      )
}
