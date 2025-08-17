"use client"

import { User, Book, History, TicketIcon, Heart, LucideIcon } from "lucide-react"
import { useCallback, useEffect, useRef } from "react"

interface IProps {
      active: number
      setActive: (value: number) => void
      scrollToSection?: (sectionId: number) => void
}

interface MenuItem {
      id: number
      label: string
      icon: LucideIcon
      description: string
      isAction?: boolean
}

const menuItems: MenuItem[] = [
      { id: 0, label: "Thông tin chung", icon: User, description: "Quản lý thông tin cá nhân" },
      { id: 1, label: "Sách đã mua", icon: Book, description: "Thư viện cá nhân" },
      { id: 2, label: "Danh sách yêu thích", icon: Heart, description: "Sách yêu thích" },
      { id: 3, label: "Phiếu hỗ trợ", icon: TicketIcon, description: "Giải đáp thắc mắc, lỗi" },
      { id: 4, label: "Lịch sử đơn hàng", icon: History, description: "Những sách đã mua" }
]

const SideBarUser = ({ active, setActive, scrollToSection }: IProps) => {
      const activeRef = useRef<HTMLButtonElement>(null)

      const scrollToActive = useCallback(() => {
            if (activeRef.current) {
                  activeRef.current.scrollIntoView({
                        behavior: 'smooth',
                        block: 'nearest',
                        inline: 'nearest'
                  })
            }
      }, [])

      const handleItemClick = useCallback((itemId: number) => {
            setActive(itemId)

            if (scrollToSection) {
                  scrollToSection(itemId)
            }

            setTimeout(scrollToActive, 100)
      }, [setActive, scrollToSection, scrollToActive])

      useEffect(() => {
            scrollToActive()
      }, [active, scrollToActive])

      const MenuItem = useCallback(({ item, isMobile }: { item: MenuItem; isMobile: boolean }) => {
            const IconComponent = item.icon
            const isActive = active === item.id

            const baseClasses = "transition-all duration-300 ease-out hover:scale-[1.02] active:scale-95"
            const activeClasses = "bg-gradient-to-r from-blue-500/10 to-blue-600/10 dark:from-blue-400/20 dark:to-blue-500/20 text-blue-600 dark:text-blue-400 shadow-sm"
            const actionClasses = "text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 hover:shadow-sm"
            const defaultClasses = "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:shadow-sm"

            const getClasses = () => {
                  if (isActive) return `${baseClasses} ${activeClasses}`
                  if (item.isAction) return `${baseClasses} ${actionClasses}`
                  return `${baseClasses} ${defaultClasses}`
            }

            if (isMobile) {
                  return (
                        <button
                              ref={isActive ? activeRef : null}
                              onClick={() => handleItemClick(item.id)}
                              className={`flex flex-col items-center gap-1 p-2 rounded-lg text-xs font-medium ${getClasses()}`}
                        >
                              <IconComponent size={16} strokeWidth={1.5} />
                              <span className="text-[10px] leading-tight text-center line-clamp-2">{item.label}</span>
                        </button>
                  )
            }

            return (
                  <button
                        ref={isActive ? activeRef : null}
                        onClick={() => handleItemClick(item.id)}
                        className={`w-full flex items-center gap-3 p-3 rounded-lg text-left ${getClasses()}`}
                  >
                        <IconComponent size={20} strokeWidth={1.5} />
                        <div className="flex flex-col items-start gap-1 min-w-0">
                              <span className="text-sm font-medium truncate">{item.label}</span>
                              <span className="text-xs text-gray-500 dark:text-gray-400 truncate">{item.description}</span>
                        </div>
                  </button>
            )
      }, [active, handleItemClick])

      return (
            <div className="w-full">
                  {/* Mobile */}
                  <div className="lg:hidden mb-6">
                        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg p-2">
                              <div className="grid grid-cols-4 gap-1 max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
                                    {menuItems.map((item) => (
                                          <MenuItem key={item.id} item={item} isMobile={true} />
                                    ))}
                              </div>
                        </div>
                  </div>

                  {/* Desktop */}
                  <div className="hidden lg:block">
                        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-2 border-gray-100 dark:border-gray-700 rounded-xl shadow-lg sticky top-6">
                              <nav className="p-2 space-y-1 max-h-[calc(100vh-8rem)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
                                    {menuItems.map((item) => (
                                          <MenuItem key={item.id} item={item} isMobile={false} />
                                    ))}
                              </nav>
                        </div>
                  </div>
            </div>
      )
}

export default SideBarUser;
