import { ThemeConfig, ThemeMode, SearchResult } from "../types/epub.types"
import ThemeSelector from "./theme.selector"
import HelpDialog from "./help.dialog"
import SearchControls from "./search.controller"

interface ReaderHeaderProps {
      bookTitle: string
      author: string
      largeText: boolean
      setLargeText: (value: boolean) => void
      currentFont: string
      setCurrentFont: (value: string) => void
      searchQuery: string
      setSearchQuery: (query: string) => void
      searchResults: SearchResult[]
      currentResultIndex: number
      showSearchInput: boolean
      setShowSearchInput: (show: boolean) => void
      currentTheme: ThemeMode
      setCurrentTheme: (theme: ThemeMode) => void
      themeConfig: ThemeConfig
      onNextResult: () => void
      onClearSearch: () => void
}

const ReaderHeader = ({
      bookTitle,
      author,
      searchQuery,
      setSearchQuery,
      searchResults,
      currentResultIndex,
      showSearchInput,
      setShowSearchInput,
      currentTheme,
      setCurrentTheme,
      themeConfig,
      onNextResult,
      onClearSearch,
}: ReaderHeaderProps) => {
      return (
            <div
                  className={`relative flex items-center ${themeConfig.cardBg} px-1 py-3 mb-4 rounded-lg shadow-sm ${themeConfig.border} border transition-colors duration-300`}
            >
                  <ThemeSelector
                        currentTheme={currentTheme}
                        setCurrentTheme={setCurrentTheme}
                        themeConfig={themeConfig}
                  />

                  <div className="flex pl-1 lg:pl-2 space-x-2">
                        <SearchControls
                              searchQuery={searchQuery}
                              setSearchQuery={setSearchQuery}
                              searchResults={searchResults}
                              currentResultIndex={currentResultIndex}
                              showSearchInput={showSearchInput}
                              setShowSearchInput={setShowSearchInput}
                              themeConfig={themeConfig}
                              currentTheme={currentTheme}
                              onNextResult={onNextResult}
                              onClearSearch={onClearSearch}
                        />
                  </div>

                  <div className="flex-1 text-center">
                        <h1 className={`text-sm font-semibold ${themeConfig.text}`}>{bookTitle}</h1>
                        <p className={`text-xs ${themeConfig.textSecondary} italic`}>{author}</p>
                  </div>

                  <HelpDialog themeConfig={themeConfig} />
            </div>
      )
}

export default ReaderHeader;
