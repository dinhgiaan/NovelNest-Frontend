"use client"

import type React from "react"
import { useState } from "react"
import { Box, Tabs, Tab, Typography, Card, CardContent, Chip, Avatar, Alert, CircularProgress, Paper, Stack, Divider, Container, useTheme }
      from "@mui/material"
import { BookOpen, Star, CreditCard, PackageSearch, BadgeCheck } from "lucide-react"
import useSWR from "swr"
import { orderService } from "@/app/lib/api/order"
import type { AuthContextType } from "@/app/context/auth.context"
import formatPrice from "@/app/utils/convert.price"

interface OrderDetail {
      _id: string
      title: string
      author: string
      quantity: number
      totalPrice: number
      rating?: number
      thumbnail?: {
            url: string
      }
}

interface Order {
      _id: string
      orderCode: string
      paymentStatus: "paid" | "failed" | "pending"
      totalAmount: number
      createdAt: string
      orderDetails: OrderDetail[]
}

interface OrderResponse {
      orders: Order[]
      summary?: {
            orderCounts?: {
                  all: number
                  paid: number
                  failed: number
            }
            totalPaidAmount: number
      }
}

interface IProps {
      userInfo: AuthContextType
}

interface TabPanelProps {
      children?: React.ReactNode
      index: number
      value: number
}

function TabPanel(props: TabPanelProps) {
      const { children, value, index, ...other } = props
      return (
            <div
                  role="tabpanel"
                  hidden={value !== index}
                  id={`order-tabpanel-${index}`}
                  aria-labelledby={`order-tab-${index}`}
                  {...other}
            >
                  {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
            </div>
      )
}

const fetcher = async (filter: string): Promise<OrderResponse> => {
      try {
            const result = await orderService.getHistoryOrder(filter)
            if (!result || !Array.isArray(result.orders)) {
                  throw new Error("Invalid API response structure")
            }
            return result
      } catch (error) {
            throw error
      }
}

const OrderHistory = ({ userInfo }: IProps) => {
      const theme = useTheme()
      const _id = userInfo.user?._id
      const [value, setValue] = useState(0)

      const {
            data: allOrders,
            error: allError,
            isLoading: allLoading,
      } = useSWR(_id ? "orders-all" : null, () => fetcher("all"), {
            revalidateIfStale: true,
            revalidateOnFocus: false,
            revalidateOnReconnect: true,
            shouldRetryOnError: false,
      })

      const {
            data: paidOrders,
            error: paidError,
            isLoading: paidLoading,
      } = useSWR(_id ? "orders-paid" : null, () => fetcher("paid"), {
            revalidateIfStale: true,
            revalidateOnFocus: false,
            revalidateOnReconnect: true,
            shouldRetryOnError: false,
      })

      const {
            data: failedOrders,
            error: failedError,
            isLoading: failedLoading,
      } = useSWR(_id ? "orders-failed" : null, () => fetcher("failed"), {
            revalidateIfStale: true,
            revalidateOnFocus: false,
            revalidateOnReconnect: true,
            shouldRetryOnError: false,
      })

      const handleChange = (event: React.SyntheticEvent, newValue: number) => {
            setValue(newValue)
      }

      const formatDate = (dateString: string) => {
            const date = new Date(dateString);
            const datePart = date.toLocaleDateString("vi-VN", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
            });
            const timePart = date.toLocaleTimeString("vi-VN", {
                  hour: "2-digit",
                  minute: "2-digit",
            });
            return `${datePart} lúc ${timePart}`;
      };

      const renderOrderList = (
            orders: Order[],
            loading: boolean,
            error: Error | null,
            filterType: string,
      ) => {
            if (loading) {
                  return (
                        <Box display="flex" justifyContent="center" alignItems="center" py={4}>
                              <Stack alignItems="center" spacing={1}>
                                    <CircularProgress size={32} />
                                    <Typography variant="body2" color="text.secondary">
                                          Đang tải...
                                    </Typography>
                              </Stack>
                        </Box>
                  )
            }
            console.log('-->check orders: ', orders)
            if (error) {
                  return (
                        <Alert severity="error" sx={{ my: 2, borderRadius: 1 }}>
                              <Typography variant="body2" fontWeight={600}>
                                    Không thể tải dữ liệu
                              </Typography>
                              <Typography variant="caption">
                                    {error?.message || "Đã xảy ra lỗi khi tải danh sách đơn hàng"}
                              </Typography>
                        </Alert>
                  )
            }

            if (!orders || !Array.isArray(orders) || orders.length === 0) {
                  return (
                        <Paper
                              sx={{
                                    py: 4,
                                    px: 2,
                                    textAlign: "center",
                                    bgcolor: theme.palette.mode === 'dark' ? 'grey.900' : 'grey.50',
                                    borderRadius: 2,
                                    border: `1px dashed ${theme.palette.divider}`,
                              }}
                        >
                              <PackageSearch
                                    size={48}
                                    color={theme.palette.text.secondary}
                                    style={{ marginBottom: 16 }}
                              />
                              <Typography variant="subtitle1" color="text.primary" gutterBottom fontWeight={600}>
                                    Chưa có đơn hàng nào
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                    {filterType === "all"
                                          ? "Bạn chưa thực hiện đơn hàng nào"
                                          : `Không có đơn hàng "${filterType === 'paid' ? 'đã thanh toán' : 'thất bại'}"`}
                              </Typography>
                        </Paper>
                  )
            }

            return (
                  <Box
                        sx={{
                              maxHeight: '60vh',
                              overflowY: 'auto',
                              pr: 0.5,
                              '&::-webkit-scrollbar': {
                                    width: '4px',
                              },
                              '&::-webkit-scrollbar-track': {
                                    background: 'transparent',
                              },
                              '&::-webkit-scrollbar-thumb': {
                                    background: theme.palette.primary.main,
                                    borderRadius: '2px',
                                    opacity: 0.6,
                              },
                              '&::-webkit-scrollbar-thumb:hover': {
                                    opacity: 1,
                              },
                        }}
                  >
                        <Stack spacing={1.5}>
                              {orders.map((order: Order) => (
                                    <Card
                                          key={order._id}
                                          sx={{
                                                borderRadius: 1.5,
                                                border: `1px solid ${theme.palette.divider}`,
                                                boxShadow: 'none',
                                                '&:hover': {
                                                      boxShadow: theme.palette.mode === 'dark'
                                                            ? '0 2px 8px rgba(0,0,0,0.2)'
                                                            : '0 2px 8px rgba(0,0,0,0.06)',
                                                      borderColor: theme.palette.primary.main,
                                                },
                                                transition: 'all 0.15s ease',
                                                bgcolor: theme.palette.background.paper,
                                          }}
                                    >
                                          <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
                                                <Stack
                                                      direction="row"
                                                      justifyContent="space-between"
                                                      alignItems="center"
                                                      sx={{ mb: 1.5 }}
                                                >
                                                      <Stack spacing={0.25}>
                                                            <Stack direction="row" alignItems="center" spacing={0.75}>
                                                                  <Typography variant="body2" fontWeight={700} color="primary">
                                                                        #{order.orderCode}
                                                                  </Typography>
                                                                  <Chip
                                                                        label={
                                                                              order.paymentStatus === "paid"
                                                                                    ? "Thành công"
                                                                                    : order.paymentStatus === "failed"
                                                                                          ? "Thất bại"
                                                                                          : "Chờ"
                                                                        }
                                                                        color={
                                                                              order.paymentStatus === "paid"
                                                                                    ? "success"
                                                                                    : order.paymentStatus === "failed"
                                                                                          ? "error"
                                                                                          : "warning"
                                                                        }
                                                                        size="small"
                                                                        sx={{
                                                                              height: 18,
                                                                              fontSize: '0.65rem',
                                                                              fontWeight: 600,
                                                                              '& .MuiChip-label': { px: 0.75 }
                                                                        }}
                                                                  />
                                                            </Stack>
                                                            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
                                                                  {formatDate(order.createdAt)}
                                                            </Typography>
                                                      </Stack>

                                                      <Typography variant="subtitle1" color="primary" fontWeight={700}>
                                                            {formatPrice(order.totalAmount)}
                                                      </Typography>
                                                </Stack>
                                                <Stack spacing={6}>
                                                      {order.orderDetails && order.orderDetails.length > 0 ? (
                                                            order.orderDetails.map((detail: OrderDetail, index: number) => (
                                                                  <Box
                                                                        key={detail._id || index}
                                                                        sx={{
                                                                              p: 1,
                                                                              bgcolor: theme.palette.mode === 'dark'
                                                                                    ? 'rgba(255,255,255,0.02)'
                                                                                    : 'rgba(0,0,0,0.015)',
                                                                              borderRadius: 1,
                                                                              border: `1px solid ${theme.palette.divider}`,
                                                                        }}
                                                                  >
                                                                        <Stack direction="row" spacing={1} alignItems="center">
                                                                              <Avatar
                                                                                    src={detail.thumbnail?.url}
                                                                                    alt={detail.title}
                                                                                    sx={{
                                                                                          width: 36,
                                                                                          height: 36,
                                                                                          borderRadius: 1,
                                                                                    }}
                                                                                    variant="rounded"
                                                                              >
                                                                                    <BookOpen size={16} />
                                                                              </Avatar>

                                                                              <Box flex={1} minWidth={0}>
                                                                                    <Typography
                                                                                          variant="caption"
                                                                                          fontWeight={600}
                                                                                          sx={{
                                                                                                overflow: 'hidden',
                                                                                                textOverflow: 'ellipsis',
                                                                                                whiteSpace: 'nowrap',
                                                                                                display: 'block',
                                                                                                mb: 0.25,
                                                                                                fontSize: '0.75rem',
                                                                                                lineHeight: 1.2
                                                                                          }}
                                                                                    >
                                                                                          {detail.title}
                                                                                    </Typography>
                                                                                    <Stack direction="row" alignItems="center" spacing={1} sx={{ flexWrap: 'wrap', gap: 0.5 }}>
                                                                                          <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.65rem' }}>
                                                                                                {detail.author}
                                                                                          </Typography>
                                                                                          {detail.rating && (
                                                                                                <Stack direction="row" alignItems="center" spacing={0.25}>
                                                                                                      <Star size={10} fill="gold" color="gold" />
                                                                                                      <Typography variant="caption" sx={{ fontSize: '0.65rem' }}>
                                                                                                            {detail.rating}
                                                                                                      </Typography>
                                                                                                </Stack>
                                                                                          )}
                                                                                    </Stack>
                                                                              </Box>

                                                                              <Stack alignItems="flex-end" spacing={0.25}>
                                                                                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.65rem' }}>
                                                                                          x{detail.quantity}
                                                                                    </Typography>
                                                                                    <Typography variant="caption" fontWeight={700} color="primary" sx={{ fontSize: '0.75rem' }}>
                                                                                          {formatPrice(detail.totalPrice)}
                                                                                    </Typography>
                                                                              </Stack>
                                                                        </Stack>
                                                                  </Box>
                                                            ))
                                                      ) : (
                                                            <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic', textAlign: 'center', py: 1 }}>
                                                                  Không có thông tin chi tiết
                                                            </Typography>
                                                      )}
                                                </Stack>
                                          </CardContent>
                                    </Card>
                              ))}
                        </Stack>
                  </Box>
            )
      }

      return (
            <Container maxWidth="md">
                  <Paper
                        elevation={0}
                        sx={{
                              borderRadius: 2,
                              border: `1px solid ${theme.palette.divider}`,
                              overflow: 'hidden',
                              bgcolor: theme.palette.background.paper
                        }}
                  >
                        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                              <Tabs
                                    value={value}
                                    onChange={handleChange}
                                    variant="scrollable"
                                    scrollButtons="auto"
                                    sx={{
                                          px: 1,
                                          '& .MuiTab-root': {
                                                minHeight: 50,
                                                fontWeight: 600,
                                                fontSize: '0.875rem',
                                                px: 2
                                          }
                                    }}
                              >
                                    <Tab
                                          label={
                                                <Stack direction="row" alignItems="center" spacing={1}>
                                                      <Typography>Tất cả</Typography>
                                                      {(allOrders?.summary?.orderCounts?.all ?? 0) > 0 && (
                                                            <Chip
                                                                  label={allOrders?.summary?.orderCounts?.all}
                                                                  size="small"
                                                                  color="primary"
                                                                  sx={{ height: 18, fontSize: '0.7rem', minWidth: 'auto' }}
                                                            />
                                                      )}
                                                </Stack>
                                          }
                                    />
                                    <Tab
                                          label={
                                                <Stack direction="row" alignItems="center" spacing={1}>
                                                      <Typography>Đã thanh toán</Typography>
                                                      {(allOrders?.summary?.orderCounts?.paid ?? 0) > 0 && (
                                                            <Chip
                                                                  label={allOrders?.summary?.orderCounts?.paid}
                                                                  size="small"
                                                                  color="success"
                                                                  sx={{ height: 18, fontSize: '0.7rem', minWidth: 'auto' }}
                                                            />
                                                      )}
                                                </Stack>
                                          }
                                    />
                                    <Tab
                                          label={
                                                <Stack direction="row" alignItems="center" spacing={1}>
                                                      <Typography>Thất bại</Typography>
                                                      {(allOrders?.summary?.orderCounts?.failed ?? 0) > 0 && (
                                                            <Chip
                                                                  label={allOrders?.summary?.orderCounts?.failed}
                                                                  size="small"
                                                                  color="error"
                                                                  sx={{ height: 18, fontSize: '0.7rem', minWidth: 'auto' }}
                                                            />
                                                      )}
                                                </Stack>
                                          }
                                    />
                                    <Tab
                                          label={
                                                <Stack direction="row" alignItems="center" spacing={1}>
                                                      <CreditCard size={16} />
                                                      <Typography>Tổng tiền</Typography>
                                                </Stack>
                                          }
                                    />
                              </Tabs>
                        </Box>

                        <TabPanel value={value} index={0}>
                              {renderOrderList(allOrders?.orders || [], allLoading, allError, "all")}
                        </TabPanel>

                        <TabPanel value={value} index={1}>
                              {renderOrderList(paidOrders?.orders || [], paidLoading, paidError, "paid")}
                        </TabPanel>

                        <TabPanel value={value} index={2}>
                              {renderOrderList(failedOrders?.orders || [], failedLoading, failedError, "failed")}
                        </TabPanel>

                        <TabPanel value={value} index={3}>
                              <Box display="flex" justifyContent="center" py={3}>
                                    <Paper
                                          elevation={0}
                                          sx={{
                                                p: 3,
                                                maxWidth: 360,
                                                width: "100%",
                                                borderRadius: 2,
                                                border: `2px solid ${theme.palette.primary.main}`,
                                                bgcolor: theme.palette.mode === 'dark'
                                                      ? 'rgba(144, 202, 249, 0.05)'
                                                      : 'rgba(25, 118, 210, 0.02)',
                                          }}
                                    >
                                          <Stack spacing={2} alignItems="center" textAlign="center">
                                                <Box
                                                      sx={{
                                                            width: 60,
                                                            height: 60,
                                                            borderRadius: '50%',
                                                            bgcolor: 'primary.main',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            color: 'white'
                                                      }}
                                                >
                                                      <BadgeCheck size={32} />
                                                </Box>

                                                <Stack spacing={0.5} alignItems="center">
                                                      <Typography variant="h4" color="primary" fontWeight={700}>
                                                            {allOrders?.summary?.totalPaidAmount
                                                                  ? formatPrice(allOrders.summary.totalPaidAmount)
                                                                  : formatPrice(0)}
                                                      </Typography>
                                                      <Typography variant="subtitle1" color="text.secondary">
                                                            Tổng số tiền đã thanh toán
                                                      </Typography>
                                                </Stack>

                                                <Divider sx={{ width: "80%" }} />

                                                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.5 }}>
                                                      Từ <strong>{allOrders?.summary?.orderCounts?.paid || 0}</strong> đơn hàng thành công
                                                      <br />
                                                      Cảm ơn bạn đã tin tưởng NovelNest!
                                                </Typography>
                                          </Stack>
                                    </Paper>
                              </Box>
                        </TabPanel>
                  </Paper>
            </Container>
      )
}

export default OrderHistory;
