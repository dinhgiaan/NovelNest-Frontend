import type { AuthContextType } from "@/app/context/auth.context"
import Image from "next/image"
import { Grid, Typography, Card, CardContent, Rating } from "@mui/material"
import { GiBookmarklet } from "react-icons/gi"
import useSWR from "swr"
import ErrorAPI from "../error.api"
import Loading from "@/app/utils/loading"

interface IProps {
      userInfo: AuthContextType
}

const PurchasedBook = ({ userInfo }: IProps) => {
      const _id = userInfo.user?._id

      const fetcher = (url: string) => fetch(url).then((res) => res.json());
      const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_PURCHASED_BOOK_BY_ID}/${_id}`, fetcher, {
            revalidateIfStale: true,
            revalidateOnFocus: false,
            revalidateOnReconnect: true,
      });

      const books = data?.data || [];

      if (error) return <ErrorAPI />;
      if (isLoading) return <Loading />;

      return (
            <div className="w-full">
                  <Typography variant="h6" gutterBottom className="flex items-center">
                        <GiBookmarklet className="mr-2" />
                        <span className="p-1 bg-[#f2b9b9] rounded-sm">Hiện đang sở hữu {data?.total} cuốn sách</span>
                  </Typography>
                  <div className="border-l-2 border-t-2 border-red-300 p-4 mr-4">
                        <Grid container spacing={3}>
                              {books.length > 0 ? (
                                    books.map((book) => (
                                          <Grid item xs={12} sm={6} md={4} lg={3} key={book._id}>
                                                <Card className="h-full flex flex-col justify-between transition-transform duration-300 hover:scale-105">
                                                      <div className="relative h-48 flex items-center justify-center overflow-hidden">
                                                            <Image
                                                                  src={book.thumbnail?.url || "/placeholder.svg"}
                                                                  alt={`Cover of ${book.title}`}
                                                                  width={140}
                                                                  height={170}
                                                                  className="object-cover"
                                                            />
                                                      </div>
                                                      <CardContent>
                                                            <Typography variant="subtitle1" className="font-semibold truncate">
                                                                  {book.title}
                                                            </Typography>
                                                            <Typography variant="body2" color="text.secondary" className="truncate">
                                                                  {book.author}
                                                            </Typography>
                                                            <Rating value={book.rating} readOnly size="small" className="mt-2" />
                                                      </CardContent>
                                                </Card>
                                          </Grid>
                                    ))
                              ) : (
                                    <Typography variant="body2" color="text.secondary">
                                          Không có sách nào được mua.
                                    </Typography>
                              )}
                        </Grid>
                  </div>
            </div>
      )
}

export default PurchasedBook

