import Header from "../components/header"
import Heading from "../utils/heading"
import BookPage from "./Book"

const page = () => {
      return (
            <>
                  <Heading
                        title="Những cuốn sách | NovelNest"
                        description="NovelNest, nơi lựa chọn tốt nhất cho việc đọc sách của bạn."
                        keyword="NovelNest, Book, Book Store, Dinhgiaan, Dinhgiaandev"
                  />
                  <Header />
                  <BookPage />
            </>
      )
}

export default page