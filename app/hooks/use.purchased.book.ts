import useSWR from 'swr'
import { userService } from '../lib/api/user'

type PurchasedBookItem = {
      bookId: string
      [key: string]: unknown
}

export const usePurchasedBooks = () => {
      const { data } = useSWR('purchased-books',
            () => userService.getPurchasedBooks().then(res =>
                  res.data.data?.map((book: PurchasedBookItem) => book.bookId) || []
            ).catch(() => []),
            {
                  revalidateOnFocus: false,
                  revalidateOnReconnect: false
            }
      )

      return (bookId: string) => data?.includes(bookId) || false
}
