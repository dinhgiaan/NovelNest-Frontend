import useSWR from 'swr';
import { bookService } from '@/app/lib/api/book';

export const useBookDetail = (slug: string | null) => {
      const { data, error, isLoading, mutate } = useSWR(
            slug ? `/book-detail/${slug}` : null,
            () => bookService.getBookDetail(slug!),
            {
                  revalidateOnFocus: false,
                  revalidateOnReconnect: false,
                  dedupingInterval: 60000,
                  errorRetryCount: 3,
                  errorRetryInterval: 1000
            }
      );

      return {
            book: data?.data,
            error,
            isLoading,
            refetch: mutate
      };
};
