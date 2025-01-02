import Timer from "@/app/utils/timer";

const Subscribe = () => {
      return (
            <div className="w-full h-40 bg-gray-50 flex justify-between items-center p-4">
                  {/* Timer bên trái */}
                  <div className="flex-1">
                        <Timer />
                  </div>

                  {/* Phần đăng ký bên phải */}
                  <div className="flex-1 flex justify-center">
                        <div className="max-w-md w-full">
                              <h2 className="text-2xl font-semibold text-center mb-4 text-gray-800">Đăng ký nhận tin</h2>
                              <input
                                    type="email"
                                    placeholder="example@gmail.com"
                                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                              <div className="mt-4 text-center">
                                    <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300">
                                          Đăng ký
                                    </button>
                              </div>
                        </div>
                  </div>
            </div>
      );
};

export default Subscribe;