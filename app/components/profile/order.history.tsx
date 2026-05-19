"use client";

import { useState } from "react";
import useSWR from "swr";
import { orderService } from "@/app/lib/api/order";
import type { AuthUser } from "@/app/context/auth.context";
import formatPrice from "@/app/utils/convert.price";
import { Loader2, Receipt, SearchX } from "lucide-react";
import Image from "next/image";

interface OrderDetail {
  _id: string;
  title: string;
  author: string;
  quantity: number;
  totalPrice: number;
  thumbnail?: { url: string };
}
interface Order {
  _id: string;
  orderCode: string;
  paymentStatus: "paid" | "failed" | "pending";
  totalAmount: number;
  createdAt: string;
  orderDetails: OrderDetail[];
}
interface OrderResponse {
  orders: Order[];
  summary?: {
    orderCounts?: { all: number; paid: number; failed: number };
    totalPaidAmount: number;
  };
}

interface IProps {
  userInfo: AuthUser | null;
}

const fetcher = async (filter: string): Promise<OrderResponse> => {
  const result = await orderService.getHistoryOrder(filter);
  if (!result || !Array.isArray(result.orders))
    throw new Error("Invalid API response");
  return result;
};

const OrderHistory = ({ userInfo }: IProps) => {
  const _id = userInfo?._id;
  const [activeTab, setActiveTab] = useState<
    "all" | "paid" | "failed" | "summary"
  >("all");

  const { data: allOrders, isLoading: allLoading } = useSWR(
    _id ? "orders-all" : null,
    () => fetcher("all"),
  );
  const { data: paidOrders, isLoading: paidLoading } = useSWR(
    _id ? "orders-paid" : null,
    () => fetcher("paid"),
  );
  const { data: failedOrders, isLoading: failedLoading } = useSWR(
    _id ? "orders-failed" : null,
    () => fetcher("failed"),
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400";
      case "failed":
        return "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400";
      default:
        return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400";
    }
  };

  const renderOrderList = (orders: Order[], loading: boolean) => {
    if (loading)
      return (
        <div className="py-20 flex justify-center">
          <Loader2 className="animate-spin text-zinc-400" size={24} />
        </div>
      );
    if (!orders || orders.length === 0)
      return (
        <div className="py-20 text-center border border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl mt-4">
          <SearchX size={32} className="mx-auto text-zinc-300 mb-3" />
          <p className="text-sm text-zinc-500">Không tìm thấy đơn hàng nào.</p>
        </div>
      );

    return (
      <div className="space-y-4 mt-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white dark:bg-[#111111] border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors shadow-sm">
            <div className="flex flex-wrap items-center justify-between mb-4 gap-2">
              <div>
                <span className="font-mono text-sm font-medium text-zinc-900 dark:text-zinc-100 mr-3">
                  #{order.orderCode}
                </span>
                <span
                  className={`text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-md ${getStatusStyle(order.paymentStatus)}`}>
                  {order.paymentStatus === "paid"
                    ? "Thành công"
                    : order.paymentStatus === "failed"
                      ? "Thất bại"
                      : "Đang xử lý"}
                </span>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-zinc-900 dark:text-white">
                  {formatPrice(order.totalAmount)}
                </p>
                <p className="text-xs text-zinc-500">
                  {formatDate(order.createdAt)}
                </p>
              </div>
            </div>

            <div className="space-y-3 bg-zinc-50 dark:bg-zinc-800/30 rounded-lg p-3">
              {order.orderDetails.map((detail, idx) => (
                <div
                  key={detail._id || idx}
                  className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded bg-zinc-200 relative overflow-hidden shrink-0 border border-zinc-200 dark:border-zinc-700">
                    {detail.thumbnail?.url && (
                      <Image
                        src={detail.thumbnail.url}
                        alt={detail.title}
                        fill
                        className="object-cover"
                        sizes="40px"
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100 truncate">
                      {detail.title}
                    </p>
                    <p className="text-xs text-zinc-500 truncate">
                      {detail.author}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                      {formatPrice(detail.totalPrice)}
                    </p>
                    <p className="text-xs text-zinc-500">x{detail.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full max-w-4xl">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-4 gap-4">
        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white tracking-tight">
          Lịch sử giao dịch
        </h2>
      </div>

      {/* Tabs (Custom Tailwind) */}
      <div className="flex overflow-x-auto scrollbar-hide border-b border-zinc-200 dark:border-zinc-800">
        {[
          {
            id: "all",
            label: "Tất cả",
            count: allOrders?.summary?.orderCounts?.all,
          },
          {
            id: "paid",
            label: "Đã thanh toán",
            count: allOrders?.summary?.orderCounts?.paid,
          },
          {
            id: "failed",
            label: "Thất bại",
            count: allOrders?.summary?.orderCounts?.failed,
          },
          { id: "summary", label: "Tổng quan", count: null },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as unknown as typeof activeTab)}
            className={`whitespace-nowrap py-3 px-4 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.id
                ? "border-zinc-900 text-zinc-900 dark:border-white dark:text-white"
                : "border-transparent text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
            }`}>
            {tab.label}{" "}
            {tab.count ? (
              <span className="ml-1.5 px-1.5 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-xs text-zinc-600 dark:text-zinc-400">
                {tab.count}
              </span>
            ) : null}
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      <div>
        {activeTab === "all" &&
          renderOrderList(allOrders?.orders || [], allLoading)}
        {activeTab === "paid" &&
          renderOrderList(paidOrders?.orders || [], paidLoading)}
        {activeTab === "failed" &&
          renderOrderList(failedOrders?.orders || [], failedLoading)}

        {activeTab === "summary" && (
          <div className="mt-6 bg-white dark:bg-[#111111] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 text-center max-w-sm mx-auto shadow-sm">
            <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <Receipt size={32} />
            </div>
            <p className="text-sm text-zinc-500 uppercase tracking-widest font-semibold mb-2">
              Tổng chi tiêu
            </p>
            <h3 className="text-3xl font-bold text-zinc-900 dark:text-white mb-4">
              {formatPrice(allOrders?.summary?.totalPaidAmount || 0)}
            </h3>
            <div className="h-px bg-zinc-200 dark:bg-zinc-800 w-full my-4" />
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Bạn đã thực hiện thành công{" "}
              <strong>{allOrders?.summary?.orderCounts?.paid || 0}</strong> giao
              dịch. Cảm ơn bạn đã đồng hành cùng NovelNest!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
