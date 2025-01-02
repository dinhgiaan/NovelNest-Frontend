import Heading from "@/app/utils/heading"
import LoginPage from "./Login"

const page = () => {

      return (
            <>
                  <Heading
                        title="Đăng nhập tài khoản"
                        description="NovelNest, nơi lựa chọn tốt nhất cho việc đọc sách của bạn."
                        keyword="NovelNest, Book, Book Store, Dinhgiaan, Dinhgiaandev"
                  />
                  <LoginPage />
            </>
      )
}

export default page