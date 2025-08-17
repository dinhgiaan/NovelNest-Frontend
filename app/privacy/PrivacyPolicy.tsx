'use client';

import { useState } from 'react';
import { ChevronDown, ArrowLeft } from 'lucide-react';
import ButtonBack from '../components/ui/button.back';

type SectionProps = {
      title: string;
      children: React.ReactNode;
      isOpen?: boolean;
      onToggle?: () => void;
};

const PrivacyPolicyPage = () => {
      const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({});

      const toggleSection = (sectionId: string) => {
            setOpenSections((prev) => ({
                  ...prev,
                  [sectionId]: !prev[sectionId],
            }));
      };

      return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
                  <header className="bg-gradient-to-r from-slate-800 to-slate-900 text-white py-5 relative overflow-hidden">
                        <div className="absolute inset-0 bg-black/10" />
                        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full -translate-x-32 -translate-y-32" />
                        <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full translate-x-32 translate-y-32" />

                        <div className="max-w-3xl mx-auto px-4 relative z-10">
                              <ButtonBack className="inline-flex items-center gap-1 text-[#ccc] hover:text-white transition-colors text-[11px]">
                                    <ArrowLeft size={12} className="flex-shrink-0" />
                                    <span className="font-medium">Quay lại</span>
                              </ButtonBack>

                              <div className="text-center mt-3">
                                    <h1 className="text-2xl md:text-3xl font-bold mb-1">Chính sách Bảo mật</h1>
                                    <p className="text-[11px] text-slate-300">Cập nhật lần cuối: Tháng 08, 2025</p>
                              </div>
                        </div>
                  </header>

                  <main className="max-w-3xl mx-auto px-4 py-6">
                        <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden divide-y divide-slate-200">
                              <Section
                                    title="1. Giới thiệu"
                                    isOpen={openSections['section-1']}
                                    onToggle={() => toggleSection('section-1')}
                              >
                                    <p className="text-[13px]">
                                          Tại <strong>NovelNest</strong>, chúng tôi tôn trọng và bảo vệ quyền riêng tư của bạn.
                                          Chính sách này giải thích cách chúng tôi thu thập, sử dụng và bảo vệ thông tin cá nhân.
                                    </p>
                              </Section>

                              <Section
                                    title="2. Thông tin Chúng tôi thu thập"
                                    isOpen={openSections['section-2']}
                                    onToggle={() => toggleSection('section-2')}
                              >
                                    <ul className="list-disc list-inside space-y-1 text-[13px]">
                                          <li>Thông tin tài khoản: email, tên đăng nhập, mật khẩu</li>
                                          <li>Thông tin thanh toán (ẩn và mã hóa)</li>
                                          <li>Dữ liệu hành vi đọc sách và tìm kiếm</li>
                                          <li>Địa chỉ IP, loại thiết bị và trình duyệt</li>
                                    </ul>
                              </Section>

                              <Section
                                    title="3. Cách Chúng tôi sử dụng Thông tin"
                                    isOpen={openSections['section-3']}
                                    onToggle={() => toggleSection('section-3')}
                              >
                                    <ul className="list-disc list-inside space-y-1 text-[13px]">
                                          <li>Cung cấp và cải thiện dịch vụ</li>
                                          <li>Gợi ý nội dung phù hợp</li>
                                          <li>Gửi thông báo, cập nhật và hỗ trợ khách hàng</li>
                                          <li>Bảo vệ an toàn và ngăn chặn gian lận</li>
                                    </ul>
                              </Section>

                              <Section
                                    title="4. Chia sẻ Thông tin với Bên thứ ba"
                                    isOpen={openSections['section-4']}
                                    onToggle={() => toggleSection('section-4')}
                              >
                                    <div className="bg-red-50 p-2.5 rounded-lg border-l-4 border-red-500 mb-2 text-[13px]">
                                          Chúng tôi KHÔNG bán hoặc cho thuê thông tin cá nhân vì mục đích thương mại.
                                    </div>
                                    <ul className="list-disc list-inside space-y-1 text-[13px]">
                                          <li>Nhà cung cấp dịch vụ: xử lý thanh toán, lưu trữ dữ liệu</li>
                                          <li>Đối tác xuất bản: dữ liệu thống kê ẩn danh</li>
                                          <li>Cơ quan pháp luật khi có yêu cầu hợp pháp</li>
                                          <li>Trường hợp sáp nhập/mua lại: thông tin được chuyển giao</li>
                                    </ul>
                              </Section>

                              <Section
                                    title="5. Bảo mật và Lưu trữ Dữ liệu"
                                    isOpen={openSections['section-5']}
                                    onToggle={() => toggleSection('section-5')}
                              >
                                    <ul className="list-disc list-inside space-y-1 text-[13px]">
                                          <li>Mã hóa SSL cho mọi giao dịch</li>
                                          <li>Máy chủ đạt chuẩn ISO 27001</li>
                                          <li>Giới hạn quyền truy cập dữ liệu</li>
                                          <li>Sao lưu định kỳ và chống DDoS</li>
                                    </ul>
                                    <p className="mt-1 text-[11px] text-slate-600">
                                          Thông tin cá nhân được lưu cho đến khi bạn yêu cầu xóa hoặc không còn cần thiết.
                                    </p>
                              </Section>

                              <Section
                                    title="6. Quyền của Người dùng"
                                    isOpen={openSections['section-6']}
                                    onToggle={() => toggleSection('section-6')}
                              >
                                    <ul className="list-disc list-inside space-y-1 text-[13px]">
                                          <li>Truy cập và nhận bản sao thông tin</li>
                                          <li>Chỉnh sửa hoặc cập nhật thông tin</li>
                                          <li>Yêu cầu xóa thông tin</li>
                                          <li>Từ chối nhận thông tin tiếp thị</li>
                                          <li>Khiếu nại về xử lý dữ liệu</li>
                                    </ul>
                                    <div className="bg-blue-50 p-2.5 rounded-lg border-l-4 border-blue-500 mt-2 text-[13px]">
                                          Liên hệ <strong>privacy@novelnest.vn</strong> để thực hiện quyền của bạn.
                                    </div>
                              </Section>

                              <Section
                                    title="7. Cookie và Công nghệ theo dõi"
                                    isOpen={openSections['section-7']}
                                    onToggle={() => toggleSection('section-7')}
                              >
                                    <p className="text-[13px]">Chúng tôi sử dụng cookie để:</p>
                                    <ul className="list-disc list-inside space-y-1 text-[13px]">
                                          <li>Ghi nhớ cài đặt và tùy chỉnh</li>
                                          <li>Phân tích hành vi sử dụng</li>
                                          <li>Hiển thị nội dung và quảng cáo phù hợp</li>
                                    </ul>
                                    <p className="mt-1 text-[11px] text-slate-600">
                                          Bạn có thể tắt cookie trong cài đặt trình duyệt nhưng một số tính năng sẽ bị hạn chế.
                                    </p>
                              </Section>

                              <Section
                                    title="8. Thay đổi Chính sách"
                                    isOpen={openSections['section-8']}
                                    onToggle={() => toggleSection('section-8')}
                              >
                                    <p className="text-[13px]">NovelNest có quyền thay đổi chính sách khi cần thiết:</p>
                                    <ul className="list-disc list-inside space-y-1 text-[13px]">
                                          <li>Thông báo qua email và đăng trên website</li>
                                          <li>Hiệu lực ít nhất 30 ngày sau thông báo</li>
                                          <li>Tiếp tục sử dụng = bạn đồng ý với thay đổi</li>
                                    </ul>
                              </Section>
                        </div>
                  </main>
            </div>
      );
};

const Section = ({ title, children, isOpen = false, onToggle }: SectionProps) => (
      <div>
            <button
                  onClick={onToggle}
                  className="w-full flex items-center justify-between px-3 py-3 text-left hover:bg-slate-50 transition-colors"
            >
                  <h3 className="text-[15px] font-semibold text-slate-800">{title}</h3>
                  <ChevronDown
                        className={`w-3.5 h-3.5 text-slate-400 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
                  />
            </button>
            {isOpen && (
                  <div className="px-3 pb-3">
                        <div className="text-slate-600 space-y-2">{children}</div>
                  </div>
            )}
      </div>
);

export default PrivacyPolicyPage;
