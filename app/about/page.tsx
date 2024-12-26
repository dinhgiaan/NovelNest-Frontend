import Heading from "../utils/heading"
import AboutPage from "./About"


const page = () => {
      return (
            <>
                  <Heading
                        title="Về chúng tôi | NovelNest"
                        description="NovelNest, nơi lựa chọn tốt nhất cho việc đọc sách của bạn."
                        keyword="NovelNest, Book, Book Store, Dinhgiaan, Dinhgiaandev"
                  />
                  <AboutPage />
            </>
      )
}

export default page