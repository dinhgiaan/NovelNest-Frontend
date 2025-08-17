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

const TermsOfServicePage = () => {
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
                                    <h1 className="text-2xl md:text-3xl font-bold mb-1">Điều khoản Dịch vụ</h1>
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
                                          Chào mừng bạn đến với <strong>NovelNest</strong>. Khi sử dụng dịch vụ của chúng tôi,
                                          bạn đồng ý tuân thủ và bị ràng buộc bởi các điều khoản dưới đây.
                                    </p>
                              </Section>

                              <Section
                                    title="2. Định nghĩa"
                                    isOpen={openSections['section-2']}
                                    onToggle={() => toggleSection('section-2')}
                              >
                                    <ul className="list-disc list-inside space-y-1 text-[13px]">
                                          <li><strong>&quot;Dịch vụ&quot;</strong> là nền tảng đọc và chia sẻ sách của NovelNest.</li>
                                          <li><strong>&quot;Người dùng&quot;</strong> là cá nhân hoặc tổ chức sử dụng dịch vụ.</li>
                                          <li><strong>&quot;Nội dung&quot;</strong> là mọi văn bản, hình ảnh, âm thanh, video được đăng tải.</li>
                                    </ul>
                              </Section>

                              <Section
                                    title="3. Quyền và nghĩa vụ của Người dùng"
                                    isOpen={openSections['section-3']}
                                    onToggle={() => toggleSection('section-3')}
                              >
                                    <ul className="list-disc list-inside space-y-1 text-[13px]">
                                          <li>Cung cấp thông tin chính xác khi đăng ký tài khoản.</li>
                                          <li>Không đăng tải nội dung vi phạm pháp luật, bản quyền hoặc thuần phong mỹ tục.</li>
                                          <li>Không sử dụng dịch vụ để phát tán phần mềm độc hại.</li>
                                          <li>Chịu trách nhiệm về mọi hoạt động diễn ra dưới tài khoản của mình.</li>
                                    </ul>
                              </Section>

                              <Section
                                    title="4. Quyền và nghĩa vụ của NovelNest"
                                    isOpen={openSections['section-4']}
                                    onToggle={() => toggleSection('section-4')}
                              >
                                    <ul className="list-disc list-inside space-y-1 text-[13px]">
                                          <li>Cung cấp dịch vụ ổn định và bảo mật.</li>
                                          <li>Có quyền tạm ngừng hoặc chấm dứt tài khoản vi phạm điều khoản.</li>
                                          <li>Bảo vệ thông tin cá nhân theo Chính sách Bảo mật.</li>
                                    </ul>
                              </Section>

                              <Section
                                    title="5. Sở hữu trí tuệ"
                                    isOpen={openSections['section-5']}
                                    onToggle={() => toggleSection('section-5')}
                              >
                                    <p className="text-[13px]">
                                          Mọi nội dung và tài nguyên trên NovelNest (trừ nội dung do người dùng tạo)
                                          thuộc quyền sở hữu của NovelNest hoặc bên cấp phép, được bảo vệ bởi luật bản quyền.
                                    </p>
                              </Section>

                              <Section
                                    title="6. Giới hạn trách nhiệm"
                                    isOpen={openSections['section-6']}
                                    onToggle={() => toggleSection('section-6')}
                              >
                                    <p className="text-[13px]">
                                          NovelNest không chịu trách nhiệm với thiệt hại gián tiếp, ngẫu nhiên hoặc hậu quả
                                          phát sinh từ việc sử dụng hoặc không thể sử dụng dịch vụ.
                                    </p>
                              </Section>

                              <Section
                                    title="7. Chấm dứt dịch vụ"
                                    isOpen={openSections['section-7']}
                                    onToggle={() => toggleSection('section-7')}
                              >
                                    <p className="text-[13px]">
                                          Chúng tôi có quyền chấm dứt hoặc tạm ngừng dịch vụ bất kỳ lúc nào với người dùng vi phạm.
                                          Người dùng cũng có thể ngừng sử dụng dịch vụ bất cứ khi nào.
                                    </p>
                              </Section>

                              <Section
                                    title="8. Sửa đổi điều khoản"
                                    isOpen={openSections['section-8']}
                                    onToggle={() => toggleSection('section-8')}
                              >
                                    <p className="text-[13px]">
                                          NovelNest có thể thay đổi điều khoản này. Các thay đổi sẽ được thông báo trước ít nhất 30 ngày.
                                          Việc tiếp tục sử dụng dịch vụ đồng nghĩa với việc chấp nhận điều khoản mới.
                                    </p>
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

export default TermsOfServicePage;
