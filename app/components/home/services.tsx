import { BsCreditCard } from "react-icons/bs"
import { GiBurningBook, GiLotusFlower } from "react-icons/gi"
import { IoIosFlash } from "react-icons/io"
import { MdOutlineSecurity } from "react-icons/md"

const Services = () => {
      return (
            <div className="mb-56 pt-24">
                  <h2 className="mt-24 mb-10 flex items-center justify-center ">
                        <span className="mr-5">
                              <GiLotusFlower size={28} color="#00bcd4" />
                        </span>
                        <p className="text-transparent text-2xl bg-clip-text font-bold gap-4 bg-gradient-to-r from-[#64f3dd] #ccc to-[#4df47c]">
                              Nơi Đây Của Chúng Tôi Mang Lại
                        </p>
                        <span className="ml-5">
                              <GiLotusFlower size={28} color="#00bcd4" />
                        </span>
                  </h2>

                  <div className="relative flex justify-around">
                        {/* Horizontal connecting line */}
                        <div className="absolute top-1/2 left-[10%] w-4/5 h-1 bg-gray-300" />

                        <div className="relative flex flex-col items-center justify-center bg-[#00bcd4] p-4 w-36 h-36 rounded-full z-10">
                              <MdOutlineSecurity size={37} color="white" />
                              <p className="text-xs mt-2 font-[500] text-center text-white">Bảo mật an toàn</p>
                        </div>

                        <div className="relative flex flex-col items-center justify-center bg-[#00bcd4] p-4 w-36 h-36 rounded-full z-10">
                              <BsCreditCard size={37} color="white" />
                              <p className="text-xs mt-2 font-[500] text-white">Thanh toán tiện lợi</p>
                        </div>

                        <div className="relative flex flex-col items-center justify-center bg-[#00bcd4] p-4 w-36 h-36 rounded-full z-10">
                              <IoIosFlash size={37} color="white" />
                              <p className="text-xs mt-2 font-[500] text-white">Phản hồi tức thì</p>
                        </div>

                        <div className="relative flex flex-col items-center justify-center bg-[#00bcd4] p-4 w-36 h-36 rounded-full z-10">
                              <GiBurningBook size={37} color="white" />
                              <p className="text-xs mt-2 font-[500] text-white">Kho sách phong phú</p>
                        </div>
                  </div>
            </div>
      )
}

export default Services
