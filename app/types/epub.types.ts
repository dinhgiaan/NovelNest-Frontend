export type SearchResult = { cfi: string; excerpt: string }

export type ThemeMode = "light" | "dark" | "sepia" | "night"

export interface ThemeConfig {
      title: string
      name: string
      lable: string
      background: string
      readerBg: string
      text: string
      textSecondary: string
      border: string
      cardBg: string
      buttonHover: string
      accent: string
}

export interface IProps {
      epubUrl: string
      bookTitle: string
      author: string
}

export const themes: Record<ThemeMode, ThemeConfig> = {
      light: {
            title: "#ffffff",
            name: "Sáng",
            lable: "#fffc3c3c",
            background: "bg-gray-50",
            readerBg: "#ffffff",
            text: "text-gray-900",
            textSecondary: "text-gray-600",
            border: "border-gray-200",
            cardBg: "bg-white",
            buttonHover: "hover:bg-gray-100",
            accent: "text-blue-600",
      },
      dark: {
            title: "#f7f7f7",
            name: "Tối",
            lable: "#fffc3c3c",
            background: "bg-gray-900",
            readerBg: "#302f2f",
            text: "text-gray-100",
            textSecondary: "text-gray-400",
            border: "border-gray-700",
            cardBg: "bg-gray-800",
            buttonHover: "hover:bg-gray-700",
            accent: "text-blue-400",
      },
      sepia: {
            title: "#ffffff",
            name: "Sepia",
            lable: "#fffc3c3c",
            background: "bg-amber-50",
            readerBg: "#f7f3e9",
            text: "text-amber-900",
            textSecondary: "text-amber-700",
            border: "border-amber-200",
            cardBg: "bg-amber-25",
            buttonHover: "hover:bg-amber-100",
            accent: "text-amber-700",
      },
      night: {
            title: "#ffffff",
            name: "Huyền Ảo",
            lable: "#fffc3c3c",
            background: "bg-purple-800",
            readerBg: "#3cbaa9",
            text: "text-slate-100",
            textSecondary: "text-slate-400",
            border: "border-slate-700",
            cardBg: "bg-slate-800",
            buttonHover: "hover:bg-slate-700",
            accent: "text-emerald-400",
      },
}