"use client";

import {
  User,
  Book,
  History,
  TicketIcon,
  Heart,
  LucideIcon,
} from "lucide-react";

interface IProps {
  active: number;
  setActive: (value: number) => void;
}

interface MenuItem {
  id: number;
  label: string;
  icon: LucideIcon;
}

const menuItems: MenuItem[] = [
  { id: 0, label: "Hồ sơ cá nhân", icon: User },
  { id: 1, label: "Sách đã mua", icon: Book },
  { id: 2, label: "Yêu thích", icon: Heart },
  { id: 3, label: "Hỗ trợ", icon: TicketIcon },
  { id: 4, label: "Lịch sử thanh toán", icon: History },
];

const SideBarUser = ({ active, setActive }: IProps) => {
  return (
    <div className="w-full">
      <div className="lg:hidden mb-6 overflow-x-auto scrollbar-hide">
        <nav className="flex gap-2 pb-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActive(item.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors border ${
                  isActive
                    ? "bg-zinc-900 text-white border-zinc-900 dark:bg-white dark:text-black dark:border-white"
                    : "bg-white text-zinc-600 border-zinc-200 hover:bg-zinc-50 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-800"
                }`}>
                <Icon size={16} />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="hidden lg:block sticky top-28">
        <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-4 px-3">
          Cài đặt
        </h3>
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActive(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-zinc-200/50 text-zinc-900 dark:bg-zinc-800/50 dark:text-white"
                    : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/30 dark:hover:text-white"
                }`}>
                <Icon
                  size={18}
                  strokeWidth={isActive ? 2 : 1.5}
                  className={
                    isActive ? "text-zinc-900 dark:text-white" : "text-zinc-500"
                  }
                />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default SideBarUser;
