"use client"

import { ThemeProvider } from "@mui/material/styles"
import { CssBaseline } from "@mui/material"
import { useTheme } from "next-themes"
import { ReactNode, useEffect, useState } from "react"
import { darkTheme, lightTheme } from "../../utils/theme"

interface MUIThemeProviderProps {
      children: ReactNode
}

const MUIThemeProvider = ({ children }: MUIThemeProviderProps) => {
      const { resolvedTheme } = useTheme()
      const [mounted, setMounted] = useState(false)

      useEffect(() => {
            setMounted(true)
      }, [])

      const currentTheme = mounted && resolvedTheme === "dark" ? darkTheme : lightTheme

      return (
            <ThemeProvider theme={currentTheme}>
                  <CssBaseline />
                  {children}
            </ThemeProvider>
      )
}

export default MUIThemeProvider;
