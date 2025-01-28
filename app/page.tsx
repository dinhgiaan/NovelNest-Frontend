import Heading from "./utils/heading";
import Layout from "./components/layout";

const HomePage = () => {
  return (
    <>
      <div>
        <Heading
          title="NovelNest"
          description="NovelNest, nơi lựa chọn tốt nhất cho việc đọc sách của bạn."
          keyword="NovelNest, Book, Book Store, Dinhgiaan, Dinhgiaandev"
        />
        <Layout />
      </div>
    </>
  );
}

export default HomePage
