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

      const fetcher = (url: string) => fetch(url).then((res) => res.json())
      const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_PURCHASED_BOOK_BY_ID}/${_id}`, fetcher, {
            revalidateIfStale: true,
            revalidateOnFocus: false,
            revalidateOnReconnect: true,
      })

      const books = data?.data || []

      if (error) return <ErrorAPI />
      if (isLoading) return <Loading />

      return (
            <div className="w-full">
                  <div className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 w-full">
                        <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
                              {/* Header */}
                              <div className="mb-4 sm:mb-6">
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                                          <div className="flex items-center gap-2">
                                                <GiBookmarklet className="text-rose-500 flex-shrink-0" size={20} />
                                                <Typography
                                                      variant="h6"
                                                      className="text-sm sm:text-base lg:text-lg font-semibold dark:text-white text-gray-800"
                                                >
                                                      Sách đã mua
                                                </Typography>
                                          </div>
                                          <div className="inline-flex items-center px-3 py-1.5 bg-rose-100 dark:bg-rose-900/30 text-rose-800 dark:text-rose-200 rounded-full text-xs sm:text-sm font-medium shadow-sm">
                                                <span>Hiện đang sở hữu {data?.total || 0} cuốn sách</span>
                                          </div>
                                    </div>
                              </div>

                              {/* Books Grid */}
                              <div className="border-l-2 sm:border-l-4 border-t-2 border-rose-300 dark:border-rose-600 p-2 sm:p-4 lg:p-6 rounded-tl-md bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm shadow-sm">
                                    <Grid container spacing={{ xs: 2, sm: 3, lg: 4 }}>
                                          {books.length > 0 ? (
                                                books.map((book) => (
                                                      <Grid item xs={6} sm={4} md={3} lg={2.4} xl={2} key={book._id}>
                                                            <Card className="h-full flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:scale-105 group">
                                                                  <div className="relative h-32 sm:h-40 lg:h-48 flex items-center justify-center overflow-hidden bg-slate-50 dark:bg-slate-700 p-1 sm:p-2">
                                                                        <div className="transition-transform duration-300 group-hover:scale-110">
                                                                              <Image
                                                                                    src={book.thumbnail?.url || "/placeholder.svg"}
                                                                                    alt={`Cover of ${book.title}`}
                                                                                    width={140}
                                                                                    height={170}
                                                                                    className="object-contain max-h-full w-auto"
                                                                              />
                                                                        </div>
                                                                  </div>
                                                                  <CardContent className="p-2 sm:p-3 lg:p-4 flex-1 flex flex-col justify-between">
                                                                        <div className="space-y-1 sm:space-y-2">
                                                                              <Typography
                                                                                    variant="subtitle1"
                                                                                    className="font-semibold text-xs sm:text-sm lg:text-base line-clamp-2 dark:text-white text-gray-800 leading-tight"
                                                                                    title={book.title}
                                                                              >
                                                                                    {book.title}
                                                                              </Typography>
                                                                              <Typography
                                                                                    variant="body2"
                                                                                    color="text.secondary"
                                                                                    className="text-xs sm:text-sm line-clamp-1 dark:text-gray-300"
                                                                                    title={book.author}
                                                                              >
                                                                                    {book.author}
                                                                              </Typography>
                                                                        </div>
                                                                        <div className="mt-2">
                                                                              <Rating
                                                                                    value={book.rating || 0}
                                                                                    readOnly
                                                                                    size="small"
                                                                                    sx={{
                                                                                          fontSize: { xs: '0.75rem', sm: '1rem' }
                                                                                    }}
                                                                              />
                                                                        </div>
                                                                  </CardContent>
                                                            </Card>
                                                      </Grid>
                                                ))
                                          ) : (
                                                <Grid item xs={12}>
                                                      <div className="text-center py-8 sm:py-12 lg:py-16">
                                                            <div className="flex flex-col items-center gap-3 sm:gap-4">
                                                                  <GiBookmarklet className="text-gray-400 dark:text-gray-600" size={48} />
                                                                  <div>
                                                                        <Typography
                                                                              variant="h6"
                                                                              className="text-sm sm:text-base font-medium text-gray-600 dark:text-gray-400 mb-1"
                                                                        >
                                                                              Chưa có sách nào
                                                                        </Typography>
                                                                        <Typography
                                                                              variant="body2"
                                                                              color="text.secondary"
                                                                              className="text-xs sm:text-sm dark:text-gray-500"
                                                                        >
                                                                              Bạn chưa mua cuốn sách nào. Hãy khám phá thư viện của chúng tôi!
                                                                        </Typography>
                                                                  </div>
                                                            </div>
                                                      </div>
                                                </Grid>
                                          )}
                                    </Grid>
                              </div>
                        </div>
                  </div>
            </div>
      )
}

export default PurchasedBook