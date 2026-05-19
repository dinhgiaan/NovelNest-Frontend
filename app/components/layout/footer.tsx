import { Facebook, Github, Linkedin, Feather, ArrowRight } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      href: "https://www.facebook.com/dgiaan04",
      icon: Facebook,
      label: "Facebook",
    },
    { href: "https://github.com/dinhgiaan", icon: Github, label: "GitHub" },
    {
      href: "https://www.linkedin.com/in/dinhgiaan",
      icon: Linkedin,
      label: "LinkedIn",
    },
  ];

  const footerLinks = [
    { href: "/books", label: "Tủ sách NovelNest" },
    { href: "/privacy", label: "Chính sách bảo mật" },
    { href: "/terms", label: "Điều khoản dịch vụ" },
  ];

  return (
    <footer className="bg-[#030303] text-zinc-400 relative overflow-hidden flex flex-col justify-between min-h-[70vh] border-t border-zinc-900 selection:bg-zinc-800 selection:text-white">
      <div className="relative z-10 w-full max-w-[100rem] mx-auto px-6 lg:px-12 pt-8 lg:pt-10 flex-1 flex flex-col lg:flex-row justify-between gap-20">
        <div className="max-w-2xl flex flex-col items-start">
          <div className="flex items-center gap-3 mb-8">
            <Feather size={16} className="text-zinc-600" />
            <span className="text-[10px] tracking-[0.3em] uppercase text-zinc-500 font-semibold">
              Chương Cuối
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-zinc-100 tracking-tight leading-[1.1] mb-10">
            Mỗi cuốn sách là một <br className="hidden sm:block" />
            <span className="italic font-serif text-zinc-500">giấc mơ</span> bạn
            cầm trên tay.
          </h2>

          <Link
            href="/books"
            className="group flex items-center gap-4 text-sm text-zinc-300 hover:text-white transition-colors duration-500">
            <span className="uppercase tracking-widest text-xs font-semibold">
              Mở trang sách đầu tiên
            </span>
            <div className="w-10 h-[1px] bg-zinc-700 group-hover:w-16 group-hover:bg-white transition-all duration-500 ease-out" />
            <ArrowRight
              size={16}
              className="-ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-out"
            />
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row gap-16 lg:gap-24 lg:pt-12">
          <div className="flex flex-col gap-6">
            <h3 className="text-[10px] uppercase tracking-[0.2em] text-zinc-600 font-semibold mb-2">
              Chỉ mục
            </h3>
            {footerLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                className="group flex items-center gap-4 text-zinc-400 hover:text-zinc-100 transition-colors duration-300">
                <span className="text-[10px] text-zinc-700 font-mono">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-sm group-hover:italic transition-all duration-300">
                  {link.label}
                </span>
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-6">
            <h3 className="text-[10px] uppercase tracking-[0.2em] text-zinc-600 font-semibold mb-2">
              Kết nối
            </h3>
            {socialLinks.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 text-zinc-400 hover:text-zinc-100 transition-colors duration-300">
                <Icon
                  size={16}
                  strokeWidth={1.5}
                  className="text-zinc-600 group-hover:text-zinc-100 transition-colors"
                />
                <span className="text-sm group-hover:italic transition-all duration-300">
                  {label}
                </span>
              </a>
            ))}

            <div className="mt-4 flex flex-col gap-2">
              <span className="text-[10px] text-zinc-700 font-mono uppercase tracking-wider">
                Hỗ trợ trực tiếp
              </span>
              <a
                href="mailto:novelnest@contact.com"
                className="text-sm text-zinc-500 hover:text-zinc-200 transition-colors border-b border-zinc-800 hover:border-zinc-400 pb-1 w-fit">
                novelnest@contact.com
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="relative mt-20 lg:mt-0">
        <div className="absolute bottom-4 left-6 right-6 flex justify-between items-end text-[10px] text-zinc-600 uppercase tracking-widest font-semibold z-20 mix-blend-difference">
          <span>© {currentYear} ALL RIGHTS RESERVED</span>
          <span className="hidden sm:block">SÀI GÒN, VIỆT NAM</span>
        </div>

        <div className="w-full flex justify-center items-end overflow-hidden pointer-events-none select-none">
          <h1 className="text-[15vw] leading-[0.75] font-bold tracking-tighter text-zinc-900/50 m-0 p-0">
            NOVELNEST.
          </h1>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
