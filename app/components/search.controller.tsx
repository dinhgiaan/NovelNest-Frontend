import { Search, X } from "lucide-react"
import { Tooltip } from "@mui/material"
import { SearchResult, ThemeConfig, ThemeMode } from "../types/epub.types"

interface SearchControlsProps {
      searchQuery: string
      setSearchQuery: (query: string) => void
      searchResults: SearchResult[]
      currentResultIndex: number
      showSearchInput: boolean
      setShowSearchInput: (show: boolean) => void
      themeConfig: ThemeConfig
      currentTheme: ThemeMode
      onNextResult: () => void
      onClearSearch: () => void
}

const SearchControls = ({ searchQuery, setSearchQuery, searchResults, currentResultIndex, showSearchInput, setShowSearchInput, themeConfig, currentTheme, onNextResult,
      onClearSearch }: SearchControlsProps) => {
      return (
            <div className="flex items-center space-x-2">
                  {!showSearchInput ? (
                        <Tooltip title="Tìm kiếm" arrow>
                              <button
                                    onClick={() => setShowSearchInput(true)}
                                    className={`p-2 ${themeConfig.textSecondary} ${themeConfig.text} ${themeConfig.buttonHover} rounded-md transition-colors`}
                              >
                                    <Search size={18} />
                              </button>
                        </Tooltip>
                  ) : (
                        <div
                              className={`flex items-center space-x-2 ${currentTheme === "light"
                                    ? "bg-gray-100"
                                    : currentTheme === "dark"
                                          ? "bg-gray-700"
                                          : currentTheme === "sepia"
                                                ? "bg-amber-100"
                                                : "bg-slate-700"
                                    } rounded-sm px-3 py-2`}
                        >
                              <input
                                    className={`bg-transparent border-none outline-none ${themeConfig.text} text-xs placeholder-gray-500 w-40`}
                                    placeholder="Nhập từ khoá..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    autoFocus
                              />
                              {searchResults.length > 0 && (
                                    <div className="flex items-center space-x-1">
                                          <span className={`text-xs ${themeConfig.textSecondary}`}>
                                                {currentResultIndex + 1}/{searchResults.length}
                                          </span>
                                          <button
                                                onClick={onNextResult}
                                                className="text-xs px-1 py-1 bg-orange-400 text-black rounded hover:bg-orange-500"
                                          >
                                                Next
                                          </button>
                                    </div>
                              )}
                              <button onClick={onClearSearch} className={`${themeConfig.textSecondary} hover:${themeConfig.text}`}>
                                    <X size={14} />
                              </button>
                        </div>
                  )}
            </div>
      )
}

export default SearchControls;
