import type { Rendition } from "epubjs"
import { ThemeMode, themes } from "../types/epub.types"

interface BookLocations {
      generate: (charsPerPage: number) => Promise<void>;
      total: number;
      length: () => number;
      locationFromCfi: (cfi: string) => number | null;
}

interface EpubBook {
      locations: BookLocations;
      [key: string]: unknown;
}

export const updateTheme = (rendition: Rendition, theme: ThemeMode) => {
      const themeConfig = themes[theme]
      const renditionThemes = rendition.themes

      renditionThemes.override("background", themeConfig.readerBg)
      renditionThemes.override("color", theme === "light" || theme === "sepia" ? "#000000" : "#ffffff")
}

export const processEpubUrl = (url: string): string | null => {
      try {
            console.log("Original EPUB URL:", url)
            let processedUrl = url

            if (url.includes("cloudinary.com") && !url.includes("/raw/")) {
                  processedUrl = url.replace("/upload/", "/raw/upload/")
            }

            try {
                  new URL(processedUrl)
                  console.log("Processed EPUB URL:", processedUrl)
                  return processedUrl
            } catch (urlError) {
                  console.error("Invalid URL format:", urlError)
                  return null
            }
      } catch (error) {
            console.error("Error processing EPUB URL:", error)
            return null
      }
}

export const generatePageLocations = async (
      book: EpubBook,
      setTotalPages: (total: number) => void,
      setCurrentPage: (page: number) => void,
      location: string | number,
      setIsGeneratingPages: (loading: boolean) => void
) => {
      if (!book) return

      try {
            setIsGeneratingPages(true)
            await book.locations.generate(1024)

            const total = book.locations.total
            console.log("Total pages:", total)
            setTotalPages(total)

            if (location && book.locations.length() > 0) {
                  try {
                        const pageNum = book.locations.locationFromCfi(location as string)
                        if (pageNum && typeof pageNum === "number") {
                              setCurrentPage(pageNum)
                        }
                  } catch (error) {
                        console.error("Error getting initial page from CFI:", error)
                  }
            }
      } catch (error) {
            console.error("Error generating page locations:", error)
      } finally {
            setIsGeneratingPages(false)
      }
}