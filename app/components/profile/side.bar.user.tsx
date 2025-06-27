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
            <div className="w-full">
                  {/* Mobile */}
                  <div className="lg:hidden mb-4">
                        <Card className="p-2 bg-white dark:bg-gray-800 shadow-lg">
                              <div className="flex overflow-x-auto scrollbar-hide gap-2">
                                    {menuItems.map(item => (
                                          <button
                                                key={item.id}
                                                onClick={() => setActive(item.id)}
                                                className={`flex-shrink-0 px-3 py-2 rounded-md text-xs font-medium transition-all whitespace-nowrap ${active === item.id
                                                            ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                                                            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                                                      }`}
                                          >
                                                {item.label}
                                          </button>
                                    ))}
                              </div>
                        </Card>
                  </div>

                  {/* Desktop */}
                  <div className="hidden lg:block">
                        <Card className="p-4 bg-white dark:bg-gray-800 shadow-xl sticky top-4">
                              <nav className="space-y-2">
                                    {menuItems.map(item => (
                                          <button
                                                key={item.id}
                                                onClick={() => setActive(item.id)}
                                                className={`w-full px-4 py-3 rounded-lg text-left transition-all ${active === item.id
                                                            ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-medium'
                                                            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 text-sm font-medium'
                                                      }`}
                                          >
                                                {item.label}
                                          </button>
                                    ))}
                              </nav>
                        </Card>
                  </div>
            </div>
      );
};

export default SideBarUser