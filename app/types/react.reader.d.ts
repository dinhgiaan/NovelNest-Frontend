declare module 'react-reader' {
      import { ReactNode } from 'react'

      export interface ReactReaderProps {
            url: string
            title?: string
            location?: string | number
            locationChanged?: (location: string) => void
            tocChanged?: (toc: unknown[]) => void
            epubInitOptions?: unknown
            epubOptions?: unknown
            getRendition?: (rendition: unknown) => void
            handleKeyPress?: boolean
            handleTextSelected?: (cfiRange: string, contents: unknown) => void
            loadingView?: ReactNode
            swipeable?: boolean
            searchQuery?: string;
            onSearchResults?: (results: SearchResult[]) => void;
            pageTurnOnScroll?: boolean
            styles?: unknown;
      }

      export const ReactReader: React.FC<ReactReaderProps>
}