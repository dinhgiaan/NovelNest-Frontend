import Footer from "../components/footer"
import Header from "../components/header"
import Heading from "../utils/heading"
import BookPage from "./Book"

const page = () => {
      return (
            <>
                  <Heading
                        title="Khám phá các cuốn sách"
                        description="NovelNest, nơi lựa chọn tốt nhất cho việc đọc sách của bạn."
                        keyword="NovelNest, Book, Book Store, Dinhgiaan, Dinhgiaandev"
                  />
                  <Header />
                  <BookPage />
                  <Footer />
            </>
      )
}

export default page