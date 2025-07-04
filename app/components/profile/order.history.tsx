"use client"

import type React from "react"
import { useState } from "react"
import {
      Box,
      Tabs,
      Tab,
      Typography,
      Card,
      CardContent,
      Chip,
      Grid,
      Avatar,
      Alert,
      CircularProgress,
      Paper,
      Stack,
      Divider,
} from "@mui/material"
import { BookOpen, Star, Calendar, CreditCard, Package, CheckCircle, PackageSearch, BadgeCheck } from "lucide-react"
import useSWR from "swr"
import { orderService } from "@/app/lib/api/order"
import type { AuthContextType } from "@/app/context/auth.context"
import formatPrice from "@/app/utils/convert.price"

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
                  {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
            </div>
      )
}

const fetcher = async (filter: string) => {
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
      const _id = userInfo.user?._id
      const [value, setValue] = useState(0)

      const {
            data: allOrders,
            error: allError,
            isLoading: allLoading,
            mutate: mutateAll,
      } = useSWR(_id ? "orders-all" : null, () => fetcher("all"), {
            revalidateIfStale: true,
            revalidateOnFocus: false,
            revalidateOnReconnect: true,
            shouldRetryOnError: false,
            onSuccess: (data) => {
                  console.log("SWR Success - All Orders:", data)
            },
            onError: (error) => {
                  console.error("SWR Error - All Orders:", error)
            },
      })

      const {
            data: paidOrders,
            error: paidError,
            isLoading: paidLoading,
            mutate: mutatePaid,
      } = useSWR(_id ? "orders-paid" : null, () => fetcher("paid"), {
            revalidateIfStale: true,
            revalidateOnFocus: false,
            revalidateOnReconnect: true,
            shouldRetryOnError: false,
            onSuccess: (data) => {
                  console.log("SWR Success - Paid Orders:", data)
            },
            onError: (error) => {
                  console.error("SWR Error - Paid Orders:", error)
            },
      })

      const {
            data: failedOrders,
            error: failedError,
            isLoading: failedLoading,
            mutate: mutateFailed,
      } = useSWR(_id ? "orders-failed" : null, () => fetcher("failed"), {
            revalidateIfStale: true,
            revalidateOnFocus: false,
            revalidateOnReconnect: true,
            shouldRetryOnError: false,
            onSuccess: (data) => {
                  console.log("SWR Success - Failed Orders:", data)
            },
            onError: (error) => {
                  console.error("SWR Error - Failed Orders:", error)
            },
      })

      const handleChange = (event: React.SyntheticEvent, newValue: number) => {
            setValue(newValue)
      }

      const formatDate = (dateString: string) => {
            const date = new Date(dateString);
            const datePart = date.toLocaleDateString("vi-VN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
            });
            const timePart = date.toLocaleTimeString("vi-VN", {
                  hour: "2-digit",
                  minute: "2-digit",
            });
            return `${datePart} - ${timePart}`;
      };


      const renderOrderList = (
            orders: any[],
            loading: boolean,
            error: any,
            filterType: string,
            mutateFunc?: () => void,
      ) => {
            if (loading) {
                  return (
                        <Box display="flex" justifyContent="center" alignItems="center" py={4}>
                              <CircularProgress />
                              <Typography variant="body2" sx={{ ml: 2 }}>
                                    Đang tải đơn hàng...
                              </Typography>
                        </Box>
                  )
            }

            if (error) {
                  return (
                        <Alert
                              severity="error"
                              sx={{ my: 2 }}
                              action={
                                    mutateFunc && (
                                          <button
                                                onClick={mutateFunc}
                                                style={{
                                                      background: "none",
                                                      border: "1px solid #f44336",
                                                      color: "#f44336",
                                                      padding: "4px 8px",
                                                      borderRadius: "4px",
                                                      cursor: "pointer",
                                                }}
                                          >
                                                Thử lại
                                          </button>
                                    )
                              }
                        >
                              <Typography variant="body2">
                                    Có lỗi xảy ra khi tải đơn hàng: {error?.message || "Lỗi không xác định"}
                              </Typography>
                        </Alert>
                  )
            }

            if (!orders || !Array.isArray(orders)) {
                  return (
                        <Alert severity="warning" sx={{ my: 2 }}>
                              <Typography variant="body2">Dữ liệu đơn hàng không hợp lệ. Kiểm tra kết nối API.</Typography>
                        </Alert>
                  )
            }

            if (orders.length === 0) {
                  return (
                        <Box textAlign="center" py={6}>
                              <PackageSearch
                                    size={48}
                                    color="#9e9e9e"
                                    style={{ marginBottom: 16, display: "block", marginLeft: "auto", marginRight: "auto" }}
                              />

                              <Typography variant="h6" color="text.secondary" gutterBottom className="dark:text-orange-600 text-black">
                                    Chưa có đơn hàng nào ở đây!
                              </Typography>

                              <Typography variant="body2" color="text.secondary" className="dark:text-white text-black">
                                    {filterType === "all"
                                          ? "Bạn chưa thực hiện đơn hàng nào. Đừng ngần ngại khám phá – hàng ngàn sản phẩm đang chờ bạn!"
                                          : `Hiện chưa có đơn hàng nào với trạng thái "${filterType}". Hãy thử chọn trạng thái khác hoặc tiếp tục mua sắm nhé!`}
                              </Typography>
                        </Box>
                  )
            }

            return (
                  <Grid container spacing={2}>
                        {orders.map((order: any) => (
                              <Grid item xs={12} key={order._id}>
                                    <Card variant="outlined" sx={{ mb: 2 }}>
                                          <CardContent>
                                                <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                                                      <Box>
                                                            <Typography variant="h6" component="div" fontWeight={70}>
                                                                  <span className="text-sm">Mã đơn hàng: </span> {order.orderCode}
                                                            </Typography>
                                                            <Box display="flex" alignItems="center" gap={1} mt={1}>
                                                                  <Calendar size={16} />
                                                                  <Typography variant="body2" color="text.secondary">
                                                                        {formatDate(order.createdAt)}
                                                                  </Typography>
                                                            </Box>
                                                      </Box>
                                                      <Box textAlign="right">
                                                            <Chip
                                                                  label={
                                                                        order.paymentStatus === "paid"
                                                                              ? "Đã thanh toán"
                                                                              : order.paymentStatus === "failed"
                                                                                    ? "Thanh toán thất bại"
                                                                                    : "Chờ thanh toán"
                                                                  }
                                                                  color={
                                                                        order.paymentStatus === "paid"
                                                                              ? "success"
                                                                              : order.paymentStatus === "failed"
                                                                                    ? "error"
                                                                                    : "warning"
                                                                  }
                                                                  size="small"
                                                            />
                                                            <Typography variant="h6" color="primary" mt={1}>
                                                                  {formatPrice(order.totalAmount)}
                                                            </Typography>
                                                      </Box>
                                                </Box>

                                                {/* Hiển thị sách trong đơn hàng */}
                                                {order.orderDetails && order.orderDetails.length > 0 ? (
                                                      order.orderDetails.map((detail: any) => (
                                                            <Box
                                                                  key={detail._id}
                                                                  display="flex"
                                                                  alignItems="center"
                                                                  gap={2}
                                                                  p={2}
                                                                  bgcolor="grey.50"
                                                                  borderRadius={1}
                                                                  mb={1}
                                                            >
                                                                  <Avatar
                                                                        src={detail.thumbnail?.url}
                                                                        alt={detail.title}
                                                                        sx={{ width: 60, height: 60 }}
                                                                        variant="rounded"
                                                                  >
                                                                        <BookOpen />
                                                                  </Avatar>
                                                                  <Box flex={1}>
                                                                        <Typography variant="subtitle1" fontWeight="medium">
                                                                              {detail.title}
                                                                        </Typography>
                                                                        <Typography variant="body2" color="text.secondary">
                                                                              {detail.author}
                                                                        </Typography>
                                                                        {detail.rating && (
                                                                              <Box display="flex" alignItems="center" gap={1} mt={0.5}>
                                                                                    <Star size={14} fill="gold" color="gold" />
                                                                                    <Typography variant="body2">{detail.rating}/5</Typography>
                                                                              </Box>
                                                                        )}
                                                                  </Box>
                                                                  <Box textAlign="right">
                                                                        <Typography variant="body2" color="text.secondary">
                                                                              SL: {detail.quantity}
                                                                        </Typography>
                                                                        <Typography variant="subtitle2" fontWeight="medium">
                                                                              {formatPrice(detail.totalPrice)}
                                                                        </Typography>
                                                                  </Box>
                                                            </Box>
                                                      ))
                                                ) : (
                                                      <Alert severity="info" sx={{ mt: 1 }}>
                                                            <Typography variant="body2">Không có chi tiết sản phẩm cho đơn hàng này</Typography>
                                                      </Alert>
                                                )}
                                          </CardContent>
                                    </Card>
                              </Grid>
                        ))}
                  </Grid>
            )
      }

      if (!_id) {
            return (
                  <Alert severity="error" sx={{ my: 2 }}>
                        <Typography variant="body2">Không tìm thấy thông tin người dùng. Vui lòng đăng nhập lại.</Typography>
                  </Alert>
            )
      }

      return (
            <Box sx={{ width: "100%" }}>
                  {process.env.NODE_ENV === "development" && (
                        <Alert severity="info" sx={{ mb: 2 }}>
                              <Typography variant="body2">
                                    <strong>Debug Info:</strong>
                                    All Orders: {allOrders?.orders?.length || 0} | Loading: {allLoading ? "Yes" : "No"} | Error:{" "}
                                    {allError ? "Yes" : "No"}
                              </Typography>
                              <Typography variant="body2" sx={{ mt: 1 }}>
                                    <strong>Raw Data:</strong> {JSON.stringify(allOrders?.summary, null, 2)}
                              </Typography>
                        </Alert>
                  )}

                  <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                        <Tabs value={value} onChange={handleChange} aria-label="order history tabs">
                              <Tab
                                    label={
                                          <Box display="flex" alignItems="center" gap={1}>
                                                <Typography className="dark:text-white">Tất cả đơn hàng</Typography>
                                                {allOrders?.summary?.orderCounts?.all > 0 && (
                                                      <Chip label={allOrders.summary.orderCounts.all} size="small" color="primary" />
                                                )}
                                          </Box>
                                    }
                              />
                              <Tab
                                    label={
                                          <Box display="flex" alignItems="center" gap={1}>
                                                <Typography>Đã thanh toán</Typography>
                                                {allOrders?.summary?.orderCounts?.paid > 0 && (
                                                      <Chip label={allOrders.summary.orderCounts.paid} size="small" color="success" />
                                                )}
                                          </Box>
                                    }
                              />
                              <Tab
                                    label={
                                          <Box display="flex" alignItems="center" gap={1}>
                                                <Typography>Thanh toán thất bại</Typography>
                                                {allOrders?.summary?.orderCounts?.failed > 0 && (
                                                      <Chip label={allOrders.summary.orderCounts.failed} size="small" color="error" />
                                                )}
                                          </Box>
                                    }
                              />
                              <Tab
                                    label={
                                          <Box display="flex" alignItems="center" gap={1}>
                                                <CreditCard size={16} />
                                                <Typography>Tổng tiền</Typography>
                                          </Box>
                                    }
                              />
                        </Tabs>
                  </Box>

                  <TabPanel value={value} index={0}>
                        {renderOrderList(allOrders?.orders || [], allLoading, allError, "all", mutateAll)}
                  </TabPanel>

                  <TabPanel value={value} index={1}>
                        {renderOrderList(paidOrders?.orders || [], paidLoading, paidError, "paid", mutatePaid)}
                  </TabPanel>

                  <TabPanel value={value} index={2}>
                        {renderOrderList(failedOrders?.orders || [], failedLoading, failedError, "failed", mutateFailed)}
                  </TabPanel>

                  <TabPanel value={value} index={3}>
                        <Box display="flex" justifyContent="center" alignItems="center" py={4}>
                              <Paper elevation={3} sx={{ p: 4, maxWidth: 420, width: "100%", borderRadius: 3 }}>
                                    <Stack spacing={2} alignItems="center" textAlign="center">
                                          <BadgeCheck size={48} color="#4caf50" strokeWidth={1.5} />

                                          <Typography variant="h4" color="primary" fontWeight={700}>
                                                {allOrders?.summary?.totalPaidAmount
                                                      ? formatPrice(allOrders.summary.totalPaidAmount)
                                                      : formatPrice(0)}
                                          </Typography>

                                          <Typography variant="body1" color="text.secondary">
                                                Tổng số tiền bạn đã thanh toán thành công 🎉
                                          </Typography>

                                          <Divider sx={{ width: "100%", my: 2 }} />

                                          <Typography variant="body2" color="text.secondary">
                                                Từ <strong>{allOrders?.summary?.orderCounts?.paid || 0}</strong> đơn hàng – cảm ơn bạn đã luôn tin tưởng và đồng hành cùng NovelNest!
                                          </Typography>
                                    </Stack>
                              </Paper>
                        </Box>
                  </TabPanel>
            </Box>
      )
}

export default OrderHistory
