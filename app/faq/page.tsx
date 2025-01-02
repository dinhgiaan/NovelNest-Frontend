import Footer from "../components/footer"
import Header from "../components/header"
import Heading from "../utils/heading"
import FAQPage from "./FAQ"

const page = () => {
      return (
            <>
                  <Heading
                        title="Các câu hỏi thường gặp"
                        description="NovelNest, nơi lựa chọn tốt nhất cho việc đọc sách của bạn."
                        keyword="NovelNest, Book, Book Store, Dinhgiaan, Dinhgiaandev"
                  />
                  <Header />
                  <FAQPage />
                  <Footer />
            </>
      )
}

export default page