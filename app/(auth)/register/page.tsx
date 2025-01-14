import Heading from "../../utils/heading"
import RegisterPage from "./Register"

const page = () => {

      return (
            <>
                  <Heading
                        title="Đăng ký tài khoản"
                        description="NovelNest, nơi lựa chọn tốt nhất cho việc đọc sách của bạn."
                        keyword="NovelNest, Book, Book Store, Dinhgiaan, Dinhgiaandev"
                  />
                  <RegisterPage />
            </>
      )
}

export default page