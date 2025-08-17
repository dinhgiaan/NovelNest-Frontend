import React from "react"
import { Palette } from "lucide-react"
import { Popover, Tooltip } from "@mui/material"
import { ThemeMode, ThemeConfig, themes } from "../types/epub.types"

interface ThemeSelectorProps {
      currentTheme: ThemeMode
      setCurrentTheme: (theme: ThemeMode) => void
      themeConfig: ThemeConfig
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({
      currentTheme,
      setCurrentTheme,
      themeConfig
}) => {
      const [themeAnchorEl, setThemeAnchorEl] = React.useState<HTMLButtonElement | null>(null)

      const handleClickTheme = (event: React.MouseEvent<HTMLButtonElement>) =>
            setThemeAnchorEl(event.currentTarget)

      const handleCloseTheme = () => setThemeAnchorEl(null)

      const openTheme = Boolean(themeAnchorEl)
      const themeId = openTheme ? "theme-popover" : undefined

      return (
            <>
                  <Tooltip title="Chọn theme" arrow>
                        <button
                              onClick={handleClickTheme}
                              className={`p-2 ${themeConfig.textSecondary} ${themeConfig.text} ${themeConfig.buttonHover} rounded-md transition-colors`}
                        >
                              <Palette size={18} />
                        </button>
                  </Tooltip>

                  <Popover
                        id={themeId}
                        open={openTheme}
                        anchorEl={themeAnchorEl}
                        onClose={handleCloseTheme}
                        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                        PaperProps={{
                              sx: {
                                    mt: 1,
                                    borderRadius: 2,
                                    boxShadow: "0 10px 25px -5px rgb(0 0 0 / 0.1)",
                                    minWidth: 200,
                              },
                        }}
                  >
                        <div className="p-4 bg-">
                              <h3 className={`font-medium mb-3 ${themeConfig.title}`}>Chọn theme</h3>
                              <div className="space-y-2">
                                    {Object.entries(themes).map(([key, theme]) => (
                                          <button
                                                key={key}
                                                onClick={() => {
                                                      setCurrentTheme(key as ThemeMode)
                                                      handleCloseTheme()
                                                }}
                                                className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${currentTheme === key
                                                      ? "bg-blue-100 text-blue-900 font-medium"
                                                      : "hover:bg-gray-100 text-gray-400"
                                                      }`}
                                          >
                                                {theme.name}
                                          </button>
                                    ))}
                              </div>
                        </div>
                  </Popover>
            </>
      )
}

export default ThemeSelector;
