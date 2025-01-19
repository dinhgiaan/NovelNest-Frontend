import { Card } from "@mui/material";

interface IProps {
      active: number
      setActive: (value: number) => void;
}

const SideBarUser = ({ active, setActive }: IProps) => {
      const menuItems = [
            { id: 0, label: "Thông tin chung" },
            { id: 1, label: "Đổi mật khẩu" },
            { id: 2, label: "Những cuốn sách đã mua" },
            { id: 3, label: "Đăng xuất" }
      ];

      return (
            <div className="w-full lg:w-64 ml-20">
                  <Card className="p-4 bg-white dark:bg-gray-800 shadow-xl">
                        <nav className="space-y-2">
                              {menuItems.map(item => (
                                    <button
                                          key={item.id}
                                          onClick={() => setActive(item.id)}
                                          className={`w-full px-4 py-3 rounded-lg text-left transition-all ${active === item.id
                                                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-mono'
                                                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 text-xs font-mono'
                                                }`}
                                    >
                                          {item.label}
                                    </button>
                              ))}
                        </nav>
                  </Card>
            </div>
      );
};

export default SideBarUser
