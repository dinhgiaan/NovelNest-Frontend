"use client"

import React, { useState, useEffect, useRef, useCallback } from "react"
import dynamic from "next/dynamic"
import { MoveLeft, AlertCircle } from "lucide-react"
import { Alert } from "@mui/material"
import ButtonBack from "@/app/components/ui/button.back"
import type { Contents, Rendition, Location } from "epubjs"
import useLocalStorageState from "use-local-storage-state"
import { updateTheme, processEpubUrl } from "../../utils/epub"
import ReaderHeader from "@/app/components/reader.header"
import { IProps, SearchResult, ThemeMode, themes } from "@/app/types/epub.types"

const ReactReader = dynamic(() => import("react-reader").then((mod) => mod.ReactReader), {
      ssr: false,
      loading: () => (
            <div className="flex items-center justify-center h-screen bg-white">
                  <div className="text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mb-4 mx-auto"></div>
                        <p className="text-gray-700">Đang tải giao diện đọc sách...</p>
                  </div>
            </div>
      ),
})

const CleanEpubReader = ({ epubUrl, bookTitle, author }: IProps) => {
      const [location, setLocation] = useState<string | number>(0)
      const [error, setError] = useState<string | null>(null)
      const [isLoading, setIsLoading] = useState(true)

      // Page
      const [currentPage, setCurrentPage] = useState<number>(1)
      const [totalPages, setTotalPages] = useState<number>(0)
      const [isGeneratingPages, setIsGeneratingPages] = useState(false)

      // Theme
      const [currentTheme, setCurrentTheme] = useLocalStorageState<ThemeMode>("reader-theme", {
            defaultValue: "light",
      })

      // Font
      const [largeText, setLargeText] = useState(false)
      const [currentFont, setCurrentFont] = useState("")

      // Search
      const [searchQuery, setSearchQuery] = useState("")
      const [searchResults, setSearchResults] = useState<SearchResult[]>([])
      const [currentResultIndex, setCurrentResultIndex] = useState(0)
      const [prevResults, setPrevResults] = useState<SearchResult[]>([])
      const [showSearchInput, setShowSearchInput] = useState(false)

      const renditionRef = useRef<Rendition | null>(null)

      const themeConfig = themes[currentTheme]
      const fixedEpubUrl = processEpubUrl(epubUrl)

      const highlightSearchResults = useCallback((results: { cfi: string; excerpt: string }[]) => {
            if (!renditionRef.current) return
            results.forEach((result) => {
                  try {
                        renditionRef.current?.annotations.add("highlight", result.cfi, {}, () => { }, "hl", {
                              fill: "yellow",
                              "fill-opacity": "0.3",
                        })
                  } catch (error) {
                        console.error("Error highlighting:", error)
                  }
            })
      }, [])

      const clearHighlights = useCallback(() => {
            if (!renditionRef.current) return
            prevResults.forEach((result) => {
                  try {
                        renditionRef.current?.annotations.remove(result.cfi, "highlight")
                  } catch (error) {
                        console.error("Error removing highlight:", error)
                  }
            })
      }, [prevResults])

      // Theme
      useEffect(() => {
            if (renditionRef.current) {
                  updateTheme(renditionRef.current, currentTheme)
            }
      }, [currentTheme])

      // Font size
      useEffect(() => {
            if (renditionRef.current) {
                  renditionRef.current.themes.fontSize(largeText ? "140%" : "100%")
            }
      }, [largeText])

      // Search results
      useEffect(() => {
            if (searchResults.length) {
                  setLocation(searchResults[0].cfi)
                  setCurrentResultIndex(0)
            }
            clearHighlights()
            highlightSearchResults(searchResults)
            setPrevResults(searchResults)
      }, [searchResults, clearHighlights, highlightSearchResults, setLocation])

      useEffect(() => {
            if (!fixedEpubUrl) {
                  setError("URL không hợp lệ")
                  setIsLoading(false)
            } else {
                  setError(null)
                  setIsLoading(false)
            }
      }, [fixedEpubUrl])

      const goToNextResult = () => {
            if (!searchResults.length) return
            const nextIndex = (currentResultIndex + 1) % searchResults.length
            setCurrentResultIndex(nextIndex)
            setLocation(searchResults[nextIndex].cfi)
      }

      const clearSearch = () => {
            setSearchQuery("")
            setSearchResults([])
            setCurrentResultIndex(0)
            clearHighlights()
            setShowSearchInput(false)
      }

      if (isLoading) {
            return (
                  <div className={`relative h-full w-full min-h-screen ${themeConfig.background} p-4`}>
                        <div className="flex items-center justify-center h-screen">
                              <div className="text-center">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mb-4 mx-auto"></div>
                                    <p className="text-gray-700">Đang tải sách...</p>
                              </div>
                        </div>
                  </div>
            )
      }

      if (error) {
            return (
                  <div className={`relative h-full w-full min-h-screen ${themeConfig.background} p-4`}>
                        <ButtonBack
                              className={`flex items-center space-x-2 ${themeConfig.textSecondary} hover:${themeConfig.text} mb-4`}
                        >
                              <MoveLeft size={18} />
                              <span>Quay lại</span>
                        </ButtonBack>

                        <div className="max-w-2xl mx-auto mt-20">
                              <Alert severity="error" icon={<AlertCircle size={20} />} sx={{ borderRadius: 2 }}>
                                    <div>
                                          <p className="font-medium mb-2">Không thể tải sách</p>
                                          <p className="text-sm">{error}</p>
                                          <p className="text-xs mt-2 text-gray-600">Vui lòng kiểm tra lại URL hoặc thử lại sau.</p>
                                    </div>
                              </Alert>
                        </div>
                  </div>
            )
      }

      if (!fixedEpubUrl) {
            return (
                  <div className={`relative h-full w-full min-h-screen ${themeConfig.background} p-4`}>
                        <ButtonBack
                              className={`flex items-center space-x-2 ${themeConfig.textSecondary} hover:${themeConfig.text} mb-4`}
                        >
                              <MoveLeft size={18} />
                              <span>Quay lại</span>
                        </ButtonBack>

                        <div className="max-w-2xl mx-auto mt-20">
                              <Alert severity="warning" sx={{ borderRadius: 2 }}>
                                    <div>
                                          <p className="font-medium mb-2">URL không hợp lệ</p>
                                          <p className="text-sm">Không thể xử lý đường dẫn đến file sách.</p>
                                    </div>
                              </Alert>
                        </div>
                  </div>
            )
      }

      console.log(`${currentPage} / ${totalPages}`)

      return (
            <div className={`relative h-full w-full min-h-screen ${themeConfig.background} p-4 transition-colors duration-300`}>
                  <ButtonBack
                        className={`flex items-center space-x-2 ${themeConfig.textSecondary} hover:text-[#79a83c] transition-colors`}
                  >
                        <MoveLeft size={18} />
                        <span>Quay lại</span>
                  </ButtonBack>

                  <div className="max-w-6xl mx-auto">
                        <div className="absolute top-12 left-4 right-4 bottom-24 md:top-8 md:left-36 md:right-36 md:bottom-24">
                              <ReaderHeader
                                    bookTitle={bookTitle}
                                    author={author}
                                    largeText={largeText}
                                    setLargeText={setLargeText}
                                    currentFont={currentFont}
                                    setCurrentFont={setCurrentFont}
                                    searchQuery={searchQuery}
                                    setSearchQuery={setSearchQuery}
                                    searchResults={searchResults}
                                    currentResultIndex={currentResultIndex}
                                    showSearchInput={showSearchInput}
                                    setShowSearchInput={setShowSearchInput}
                                    currentTheme={currentTheme}
                                    setCurrentTheme={setCurrentTheme}
                                    themeConfig={themeConfig}
                                    onNextResult={goToNextResult}
                                    onClearSearch={clearSearch}
                              />

                              <div
                                    className={`relative h-full ${themeConfig.cardBg} rounded-lg shadow-sm ${themeConfig.border} border overflow-hidden transition-colors duration-300`}
                              >
                                    <ReactReader
                                          location={location}
                                          locationChanged={(loc: string) => setLocation(loc)}
                                          url={fixedEpubUrl}
                                          getRendition={(_rendition: Rendition) => {
                                                updateTheme(_rendition, currentTheme)
                                                renditionRef.current = _rendition

                                                // disable right click
                                                _rendition.hooks.content.register((contents: Contents) => {
                                                      const body = contents.window.document.querySelector('body')
                                                      if (body) {
                                                            body.oncontextmenu = () => {
                                                                  return false
                                                            }
                                                      }
                                                })

                                                // Handle page navigation events
                                                _rendition.on("relocated", (location: Location) => {
                                                      try {
                                                            if (_rendition.book.locations && _rendition.book.locations.length()) {
                                                                  setTotalPages(_rendition.book.locations.length())
                                                                  const pageNumber = _rendition.book.locations.locationFromCfi(location.start.cfi)
                                                                  if (typeof pageNumber === 'number') {
                                                                        setCurrentPage(pageNumber)
                                                                  }
                                                            }
                                                      } catch (error) {
                                                            console.error("Error updating page location:", error)
                                                      }
                                                })

                                                // Generate location list (page list)
                                                _rendition.book.ready.then(() => {
                                                      setIsGeneratingPages(true)
                                                      return _rendition.book.locations.generate(1000)
                                                }).then(() => {
                                                      setTotalPages(_rendition.book.locations.length())
                                                      setIsGeneratingPages(false)
                                                }).catch((error) => {
                                                      console.error("Error generating pages:", error)
                                                      setIsGeneratingPages(false)
                                                      setError("Không thể tính toán số trang")
                                                })
                                          }}
                                          searchQuery={searchQuery}
                                          onSearchResults={setSearchResults}
                                          pageTurnOnScroll={true}
                                          epubOptions={{
                                                flow: 'paginated',
                                          }}
                                    />

                                    {totalPages > 0 && (
                                          <div
                                                className={`absolute top-2 right-2 ${themeConfig.text} font-medium backdrop-blur-sm z-50 px-2 py-1 rounded ${themeConfig.cardBg}/80`}
                                          >
                                                {currentPage} / {totalPages}
                                          </div>
                                    )}

                                    {isGeneratingPages && (
                                          <div className="absolute top-2 right-2 bg-blue-500/80 text-white px-3 py-1.5 rounded-lg text-sm font-medium backdrop-blur-sm flex items-center space-x-2 z-50">
                                                <div className="animate-spin rounded-full h-3 w-3 border border-white border-t-transparent"></div>
                                                <span>Đang tính trang...</span>
                                          </div>
                                    )}
                              </div>
                        </div>
                  </div>
            </div>
      )
}

export default CleanEpubReader;
