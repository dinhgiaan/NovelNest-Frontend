import { CircleDollarSign, Library, ShieldCheck, Slack, Speech } from "lucide-react"

const Services = () => {
      return (
            <div className="mb-56 pt-24">
                  <h2 className="mt-24 mb-10 flex items-center justify-center ">
                        <span className="mr-5">
                              <Slack size={28} color="#00bcd4" />
                        </span>
                        <p className="text-transparent text-2xl bg-clip-text font-bold gap-4 bg-gradient-to-r from-[#64f3dd] #ccc to-[#4df47c]">
                              Nơi Đây Của Chúng Tôi Mang Lại
                        </p>
                        <span className="ml-5">
                              <Slack size={28} color="#00bcd4" />
                        </span>
                  </h2>

                  <div className="relative flex justify-around">
                        {/* Horizontal connecting line */}
                        <div className="absolute top-1/2 left-[10%] w-4/5 h-1 bg-gray-300" />

                        <div className="relative flex flex-col items-center justify-center bg-[#00bcd4] p-4 w-32 h-32 rounded-full z-10">
                              <ShieldCheck size={30} color="white" />
                              <p className="text-xs mt-2 font-[500] text-center text-white">Bảo mật an toàn</p>
                        </div>

                        <div className="relative flex flex-col items-center justify-center bg-[#00bcd4] p-4 w-32 h-32 rounded-full z-10">
                              <CircleDollarSign size={30} color="white" />
                              <p className="text-xs mt-2 font-[500] text-white">Giá cả ưu đãi</p>
                        </div>

                        <div className="relative flex flex-col items-center justify-center bg-[#00bcd4] p-4 w-32 h-32 rounded-full z-10">
                              <Speech size={30} color="white" />
                              <p className="text-xs mt-2 font-[500] text-white">Phản hồi tức thì</p>
                        </div>

                        <div className="relative flex flex-col items-center justify-center bg-[#00bcd4] p-4 w-32 h-32 rounded-full z-10">
                              <Library size={30} color="white" />
                              <p className="text-xs mt-2 font-[500] text-white">Thể loại đa dạng</p>
                        </div>
                  </div>
            </div>
      )
}

export default Services
