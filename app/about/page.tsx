import Footer from "../components/footer"
import Header from "../components/header"
import Heading from "../utils/heading"
import AboutPage from "./About"


const page = () => {
      return (
            <>
                  <Heading
                        title="Về chúng tôi"
                        description="NovelNest, nơi lựa chọn tốt nhất cho việc đọc sách của bạn."
                        keyword="NovelNest, Book, Book Store, Dinhgiaan, Dinhgiaandev"
                  />
                  <Header />
                  <AboutPage />
                  <Footer />
            </>
      )
}

export default page