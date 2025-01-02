import Timer from "@/app/utils/timer";

const Subscribe = () => {
      return (
            <div className="w-full p-8">
                  <div className="max-w-6xl mx-auto">
                        <div className="backdrop-blur-sm dark:bg-white/10 bg-[#b8e6ea] rounded-lg p-6 shadow-xl">
                              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                                    <div className="flex-1 text-center md:text-left">
                                          <h2 className="text-xl font-bold mb-2 dark:text-white/90 text-black/65">Ưu đãi đặc biệt</h2>
                                          <p className="dark:text-white/70 text-black/45 text-sm mb-2">Còn lại:</p>
                                          <div className="text-3xl font-bold text-yellow-300">
                                                <Timer />
                                          </div>
                                    </div>

                                    <div className="w-full md:w-auto flex flex-col sm:flex-row gap-4 items-stretch">
                                          <input
                                                type="email"
                                                placeholder="Nhập email của bạn"
                                                className="flex-1 min-w-[280px] text-xs font-medium px-4 py-3 rounded-xl bg-white/90 text-gray-800 placeholder-gray-500 border-2 border-transparent focus:border-yellow-300 focus:outline-none transition-all"
                                          />
                                          <button className="px-8 py-2 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold rounded-xl transform hover:scale-105 transition-all duration-200 shadow-lg">
                                                Đăng ký ngay
                                          </button>
                                    </div>
                              </div>
                        </div>
                  </div>
            </div>
      );
};

export default Subscribe;