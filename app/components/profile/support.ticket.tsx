"use client";

import { MessageSquarePlus } from "lucide-react";

const SupportTicket = () => {
  return (
    <div className="w-full">
      <div className="mb-8 border-b border-zinc-200 dark:border-zinc-800 pb-4">
        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white tracking-tight">
          Hỗ trợ khách hàng
        </h2>
      </div>

      <div className="bg-white dark:bg-[#111111] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-800 rounded-2xl flex items-center justify-center mb-6">
          <MessageSquarePlus size={28} className="text-zinc-400" />
        </div>
        <h3 className="text-lg font-medium text-zinc-900 dark:text-white mb-2">
          Trung tâm hỗ trợ sắp ra mắt
        </h3>
        <p className="text-sm text-zinc-500 max-w-md mx-auto">
          Chúng tôi đang nỗ lực hoàn thiện hệ thống gửi ticket hỗ trợ để giúp
          bạn giải quyết các vấn đề liên quan đến tài khoản và mua hàng nhanh
          chóng hơn.
        </p>
      </div>
    </div>
  );
};

export default SupportTicket;
