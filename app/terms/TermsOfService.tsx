"use client";

import { ArrowLeft } from "lucide-react";
import ButtonBack from "../components/ui/button.back";

const TERMS_SECTIONS = [
  {
    id: "01",
    title: "Giới thiệu",
    content: (
      <p>
        Chào mừng bạn đến với <strong>NovelNest</strong>. Bằng việc truy cập và
        sử dụng dịch vụ của chúng tôi, bạn xác nhận rằng bạn đã đọc, hiểu và
        đồng ý tuân thủ, bị ràng buộc bởi các điều khoản và điều kiện được quy
        định dưới đây.
      </p>
    ),
  },
  {
    id: "02",
    title: "Định nghĩa",
    content: (
      <ul className="list-none space-y-3">
        <li>
          — <strong>&quot;Dịch vụ&quot;</strong>: Nền tảng đọc sách, chia sẻ và
          các tiện ích liên quan do NovelNest cung cấp.
        </li>
        <li>
          — <strong>&quot;Người dùng&quot;</strong>: Mọi cá nhân hoặc tổ chức
          truy cập, đăng ký và sử dụng dịch vụ.
        </li>
        <li>
          — <strong>&quot;Nội dung&quot;</strong>: Bao gồm mọi văn bản, hình
          ảnh, đồ họa, âm thanh, video hoặc các tài liệu khác được hiển thị hoặc
          đăng tải trên nền tảng.
        </li>
      </ul>
    ),
  },
  {
    id: "03",
    title: "Quyền và Nghĩa vụ của Người dùng",
    content: (
      <ul className="list-none space-y-3">
        <li>
          — Cung cấp thông tin đầy đủ, chính xác khi đăng ký và cập nhật tài
          khoản.
        </li>
        <li>
          — Cam kết không đăng tải nội dung vi phạm pháp luật, xâm phạm bản
          quyền, hoặc đi ngược lại thuần phong mỹ tục.
        </li>
        <li>
          — Tuyệt đối không sử dụng dịch vụ để phát tán phần mềm độc hại, thư
          rác hoặc can thiệp trái phép vào hệ thống.
        </li>
        <li>
          — Chịu hoàn toàn trách nhiệm bảo mật thông tin đăng nhập và mọi hoạt
          động diễn ra dưới tài khoản của mình.
        </li>
      </ul>
    ),
  },
  {
    id: "04",
    title: "Quyền và Nghĩa vụ của NovelNest",
    content: (
      <ul className="list-none space-y-3">
        <li>
          — Nỗ lực cung cấp dịch vụ ổn định, an toàn và bảo mật cho người dùng.
        </li>
        <li>
          — Có quyền kiểm duyệt, xóa bỏ nội dung hoặc tạm ngừng, chấm dứt tài
          khoản vi phạm các điều khoản mà không cần báo trước.
        </li>
        <li>
          — Cam kết bảo vệ thông tin cá nhân của người dùng tuân thủ theo Chính
          sách Bảo mật hiện hành.
        </li>
      </ul>
    ),
  },
  {
    id: "05",
    title: "Sở hữu Trí tuệ",
    content: (
      <p>
        Mọi nội dung, mã nguồn, thiết kế và tài nguyên nền tảng trên NovelNest
        (ngoại trừ các nội dung do chính người dùng hoặc tác giả độc lập tạo ra
        và cấp phép) đều thuộc quyền sở hữu của NovelNest hoặc các đối tác cấp
        phép, và được bảo vệ nghiêm ngặt bởi luật bản quyền sở hữu trí tuệ quốc
        tế.
      </p>
    ),
  },
  {
    id: "06",
    title: "Giới hạn Trách nhiệm",
    content: (
      <div className="space-y-4">
        <p>
          Trong phạm vi tối đa được pháp luật cho phép, NovelNest không chịu
          trách nhiệm đối với bất kỳ thiệt hại trực tiếp, gián tiếp, ngẫu nhiên
          hoặc mang tính hậu quả nào phát sinh từ việc:
        </p>
        <ul className="list-none space-y-3 text-slate-500 italic">
          <li>— Sử dụng hoặc không thể sử dụng dịch vụ.</li>
          <li>
            — Quyền truy cập trái phép hoặc thay đổi nội dung dữ liệu của bạn.
          </li>
          <li>— Hành vi của bất kỳ bên thứ ba nào trên nền tảng.</li>
        </ul>
      </div>
    ),
  },
  {
    id: "07",
    title: "Chấm dứt Dịch vụ",
    content: (
      <div className="space-y-4">
        <p>
          Chúng tôi có quyền đơn phương chấm dứt hoặc đình chỉ quyền truy cập
          vào dịch vụ của bạn bất kỳ lúc nào, không cần thông báo trước, với các
          lý do bao gồm nhưng không giới hạn ở việc vi phạm các Điều khoản này.
        </p>
        <p className="text-sm font-medium text-slate-800">
          Người dùng cũng có thể tự do ngừng sử dụng dịch vụ và yêu cầu xóa tài
          khoản thông qua phần cài đặt bất cứ khi nào.
        </p>
      </div>
    ),
  },
  {
    id: "08",
    title: "Sửa đổi Điều khoản",
    content: (
      <div className="space-y-4">
        <p>
          NovelNest bảo lưu quyền cập nhật, sửa đổi hoặc thay thế các điều khoản
          này tại bất kỳ thời điểm nào. Mọi thay đổi lớn sẽ được thông báo rõ
          ràng trên website hoặc qua email trước ít nhất 30 ngày.
        </p>
        <p className="font-medium text-slate-800 border-l-2 border-slate-300 pl-4">
          Việc bạn tiếp tục truy cập và sử dụng dịch vụ sau khi các thay đổi có
          hiệu lực đồng nghĩa với việc bạn hoàn toàn chấp nhận các Điều khoản
          mới.
        </p>
      </div>
    ),
  },
];

const TermsOfServicePage = () => {
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
                Điều khoản <br className="hidden lg:block" />
                <span className="font-serif italic text-slate-500">
                  Dịch vụ
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
            {TERMS_SECTIONS.map((section) => (
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

export default TermsOfServicePage;
