import Heading from "./utils/heading";
import Layout from "./components/Layout";
import ScrollToTop from "./utils/scroll-to-top";
import Header from "./components/header";
import Footer from "./components/footer";

const HomePage = () => {
  return (
    <>
      <div>
        <Heading
          title="NovelNest"
          description="NovelNest, nơi lựa chọn tốt nhất cho việc đọc sách của bạn."
          keyword="NovelNest, Book, Book Store, Dinhgiaan, Dinhgiaandev"
        />
        <Header />
        <Layout />
        <ScrollToTop />
        <Footer />
      </div>
    </>
  );
}

export default HomePage
