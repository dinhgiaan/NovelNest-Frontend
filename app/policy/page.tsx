import Footer from "../components/footer"
import Header from "../components/header"
import Heading from "../utils/heading"
import PolicyPage from "./Policy"

const page = () => {
      return (
            <>
                  <Heading
                        title="Chính sách"
                        description="NovelNest, nơi lựa chọn tốt nhất cho việc đọc sách của bạn."
                        keyword="NovelNest, Book, Book Store, Dinhgiaan, Dinhgiaandev"
                  />
                  <Header />
                  <PolicyPage />
                  <Footer />
            </>
      )
}

export default page