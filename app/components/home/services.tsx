import { BiSupport } from "react-icons/bi"
import { FaMoneyBillWave } from "react-icons/fa"
import { GiBookshelf, GiFrayedArrow } from "react-icons/gi"
import { MdOutlineSecurity } from "react-icons/md"

const Services = () => {
      return (
            <div className="mb-24">
                  <h2 className="mt-24 mb-10 flex items-center justify-center ">
                        <span className="transform -rotate-45 mr-5">
                              <GiFrayedArrow size={28} color="#00bcd4" />
                        </span>
                        <p className="text-transparent text-2xl bg-clip-text font-bold gap-4 bg-gradient-to-r from-[#64f3dd] #ccc to-[#4df47c]">
                              Nơi Đây Của Chúng Tôi Mang Lại
                        </p>
                        <span className="transform rotate-[135deg] ml-5">
                              <GiFrayedArrow size={28} color="#00bcd4" />
                        </span>
                  </h2>

                  <div className="relative flex justify-around">
                        {/* Horizontal connecting line */}
                        <div className="absolute top-1/2 left-[10%] w-4/5 h-[2px] bg-gray-300" />

                        <div className="relative flex flex-col items-center justify-center bg-[#00bcd4] p-4 w-36 h-36 rounded-full z-10">
                              <MdOutlineSecurity size={30} color="white" />
                              <p className="text-[13px] mt-2 font-[500] text-center text-white">Bảo mật an toàn</p>
                        </div>

                        <div className="relative flex flex-col items-center justify-center bg-[#00bcd4] p-4 w-36 h-36 rounded-full z-10">
                              <FaMoneyBillWave size={30} color="white" />
                              <p className="text-[13px] mt-2 font-[500] text-white">Giá cả ưu đãi</p>
                        </div>

                        <div className="relative flex flex-col items-center justify-center bg-[#00bcd4] p-4 w-36 h-36 rounded-full z-10">
                              <BiSupport size={30} color="white" />
                              <p className="text-[12px] mt-2 font-[500] text-white">Hỗ trợ nhanh chóng</p>
                        </div>

                        <div className="relative flex flex-col items-center justify-center bg-[#00bcd4] p-4 w-36 h-36 rounded-full z-10">
                              <GiBookshelf size={30} color="white" />
                              <p className="text-[13px] mt-2 font-[500] text-white">Thể loại đa dạng</p>
                        </div>
                  </div>
            </div>
      )
}

export default Services
