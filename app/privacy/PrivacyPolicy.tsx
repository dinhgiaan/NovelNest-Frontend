"use client";

import { ArrowLeft } from "lucide-react";
import ButtonBack from "../components/ui/button.back";

const PRIVACY_SECTIONS = [
  {
    id: "01",
    title: "Giới thiệu",
    content: (
      <p>
        Tại <strong>NovelNest</strong>, chúng tôi tôn trọng và bảo vệ quyền
        riêng tư của bạn. Chính sách này giải thích cách chúng tôi thu thập, sử
        dụng và bảo vệ thông tin cá nhân.
      </p>
    ),
  },
  {
    id: "02",
    title: "Thông tin Chúng tôi thu thập",
    content: (
      <ul className="list-none space-y-3">
        <li>— Thông tin tài khoản: email, tên đăng nhập, mật khẩu.</li>
        <li>— Thông tin thanh toán (ẩn và mã hóa).</li>
        <li>— Dữ liệu hành vi đọc sách và tìm kiếm.</li>
        <li>— Địa chỉ IP, loại thiết bị và trình duyệt.</li>
      </ul>
    ),
  },
  {
    id: "03",
    title: "Cách Chúng tôi sử dụng Thông tin",
    content: (
      <ul className="list-none space-y-3">
        <li>— Cung cấp và cải thiện dịch vụ.</li>
        <li>— Gợi ý nội dung phù hợp.</li>
        <li>— Gửi thông báo, cập nhật và hỗ trợ khách hàng.</li>
        <li>— Bảo vệ an toàn và ngăn chặn gian lận.</li>
      </ul>
    ),
  },
  {
    id: "04",
    title: "Chia sẻ Thông tin với Bên thứ ba",
    content: (
      <div className="space-y-4">
        <p className="font-medium text-slate-800">
          Chúng tôi KHÔNG bán hoặc cho thuê thông tin cá nhân vì mục đích thương
          mại.
        </p>
        <ul className="list-none space-y-3">
          <li>— Nhà cung cấp dịch vụ: xử lý thanh toán, lưu trữ dữ liệu.</li>
          <li>— Đối tác xuất bản: dữ liệu thống kê ẩn danh.</li>
          <li>— Cơ quan pháp luật khi có yêu cầu hợp pháp.</li>
          <li>
            — Trường hợp sáp nhập hoặc mua lại: thông tin được chuyển giao.
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: "05",
    title: "Bảo mật và Lưu trữ Dữ liệu",
    content: (
      <div className="space-y-4">
        <ul className="list-none space-y-3">
          <li>— Mã hóa SSL cho mọi giao dịch.</li>
          <li>— Máy chủ đạt chuẩn ISO 27001.</li>
          <li>— Giới hạn quyền truy cập dữ liệu.</li>
          <li>— Sao lưu định kỳ và chống tấn công từ chối dịch vụ.</li>
        </ul>
        <p className="text-sm text-slate-500 italic">
          Thông tin cá nhân được lưu cho đến khi bạn yêu cầu xóa hoặc không còn
          cần thiết.
        </p>
      </div>
    ),
  },
  {
    id: "06",
    title: "Quyền của Người dùng",
    content: (
      <div className="space-y-4">
        <ul className="list-none space-y-3">
          <li>— Truy cập và nhận bản sao thông tin.</li>
          <li>— Chỉnh sửa hoặc cập nhật thông tin.</li>
          <li>— Yêu cầu xóa thông tin.</li>
          <li>— Từ chối nhận thông tin tiếp thị.</li>
          <li>— Khiếu nại về xử lý dữ liệu.</li>
        </ul>
        <p className="text-sm font-medium text-slate-800 mt-4">
          Liên hệ{" "}
          <a
            href="mailto:privacy@novelnest.vn"
            className="underline decoration-slate-300 hover:decoration-slate-800 transition-colors">
            privacy@novelnest.vn
          </a>{" "}
          để thực hiện quyền của bạn.
        </p>
      </div>
    ),
  },
  {
    id: "07",
    title: "Cookie và Công nghệ theo dõi",
    content: (
      <div className="space-y-4">
        <p>Chúng tôi sử dụng cookie để:</p>
        <ul className="list-none space-y-3">
          <li>— Ghi nhớ cài đặt và tùy chỉnh.</li>
          <li>— Phân tích hành vi sử dụng.</li>
          <li>— Hiển thị nội dung và quảng cáo phù hợp.</li>
        </ul>
        <p className="text-sm text-slate-500 italic mt-2">
          Bạn có thể tắt cookie trong cài đặt trình duyệt nhưng một số tính năng
          sẽ bị hạn chế.
        </p>
      </div>
    ),
  },
  {
    id: "08",
    title: "Thay đổi Chính sách",
    content: (
      <div className="space-y-4">
        <p>NovelNest có quyền thay đổi chính sách khi cần thiết:</p>
        <ul className="list-none space-y-3">
          <li>— Thông báo qua email và đăng trên website.</li>
          <li>— Hiệu lực ít nhất 30 ngày sau thông báo.</li>
          <li>
            — Việc tiếp tục sử dụng đồng nghĩa với việc bạn đồng ý với thay đổi.
          </li>
        </ul>
      </div>
    ),
  },
];

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen bg-[#FAFCFF] selection:bg-blue-100 selection:text-blue-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          <div className="lg:col-span-4 flex flex-col items-start relative">
            <div className="sticky top-32">
              <ButtonBack className="group inline-flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-colors text-xs font-semibold uppercase tracking-widest mb-12">
                <ArrowLeft
                  size={14}
                  className="group-hover:-translate-x-1 transition-transform"
                />
                <span>Trở về</span>
              </ButtonBack>

              <h1 className="text-4xl lg:text-5xl font-light text-slate-900 tracking-tight leading-tight mb-4">
                Chính sách <br className="hidden lg:block" />
                <span className="font-serif italic text-slate-500">
                  Bảo mật
                </span>
              </h1>

              <div className="w-12 h-[1px] bg-slate-300 my-8" />

              <div className="text-xs uppercase tracking-widest text-slate-400 mb-2">
                Cập nhật lần cuối
              </div>
              <p className="text-sm text-slate-600 font-medium">
                Tháng 08, 2025
              </p>
            </div>
          </div>

          <div className="lg:col-span-8 flex flex-col gap-24 pt-4 lg:pt-24">
            {PRIVACY_SECTIONS.map((section) => (
              <section
                key={section.id}
                id={`section-${section.id}`}
                className="group">
                <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-start">
                  <div className="text-4xl md:text-5xl font-light text-slate-200 font-serif leading-none group-hover:text-blue-200 transition-colors duration-500">
                    {section.id}
                  </div>

                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-slate-800 mb-6 tracking-tight">
                      {section.title}
                    </h2>
                    <div className="text-slate-600 leading-relaxed text-[15px] max-w-2xl">
                      {section.content}
                    </div>
                  </div>
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
