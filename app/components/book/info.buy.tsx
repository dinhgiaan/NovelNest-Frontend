import formatPrice from '@/app/utils/convert.price';
import { Accordion, AccordionDetails, AccordionSummary, Divider, Typography } from '@mui/material'
import { IoIosArrowDropdown } from 'react-icons/io';


interface IProps {
      book: any;
      userInfo: any
}

const InfoBuy = ({ book, userInfo }: IProps) => {

      return (
            <div className="container mx-auto px-4">
                  <div className="flex flex-col lg:flex-row gap-6">
                        <div className="w-full lg:w-3/4">
                              <div className=" rounded-sm">
                                    <Accordion defaultExpanded>
                                          <AccordionSummary
                                                expandIcon={<IoIosArrowDropdown className="w-5 h-5" />}
                                          >
                                                <Typography>
                                                      <span className='font-semibold uppercase dark:text-[#6fd7db] text-[#dada77]'>Thông tin độc giả</span>
                                                </Typography>
                                          </AccordionSummary>
                                          <Divider />
                                          <AccordionDetails className="p-4">
                                                <div className="grid grid-cols gap-4">
                                                      <div className="flex items-center text-sm">
                                                            <span className="font-medium mr-1">Họ và tên:</span>
                                                            <span>{userInfo.user?.name}</span>
                                                      </div>
                                                      <div className="flex items-center text-sm">
                                                            <span className="font-medium mr-1">Số điện thoại:</span>
                                                            <span>{userInfo.user?.phone}</span>
                                                      </div>
                                                      <div className="flex items-center text-sm">
                                                            <span className="font-medium mr-1">Địa chỉ:</span>
                                                            <span>{userInfo.user?.address}</span>
                                                      </div>
                                                </div>
                                          </AccordionDetails>
                                    </Accordion>

                                    <Accordion defaultExpanded>
                                          <AccordionSummary
                                                expandIcon={<IoIosArrowDropdown className="w-5 h-5" />}
                                          >
                                                <Typography>
                                                      <span className='font-semibold uppercase dark:text-[#6fd7db] text-[#dada77]'>Thông tin sách</span>
                                                </Typography>
                                          </AccordionSummary>
                                          <Divider />
                                          <AccordionDetails className="p-4">
                                                <div className="grid grid-cols gap-4">
                                                      <div className="flex items-center text-sm">
                                                            <span className="font-medium mr-1">Tiêu đề:</span>
                                                            <span>{book.title}</span>
                                                      </div>
                                                      <div className="flex items-center text-sm">
                                                            <span className="font-medium mr-1">Giá tiền:</span>
                                                            <span>{formatPrice(book.price)}</span>
                                                      </div>
                                                      <div className="flex items-center text-sm">
                                                            <span className="font-medium mr-1">Số lượng:</span>
                                                            <span>1</span>
                                                      </div>
                                                </div>
                                          </AccordionDetails>
                                    </Accordion>
                              </div>
                        </div>

                        <div className="w-full lg:w-1/4">
                              <div className="bg-white rounded-sm shadow-md p-4">
                                    <Typography variant="h6" className="uppercase mb-4 text-center text-black">
                                          Thông tin đơn hàng
                                    </Typography>
                                    <Divider />

                                    <div className="space-y-4 mt-9 text-sm">
                                          <div className="flex justify-between text-black">
                                                <span>Tổng số sách:</span>
                                                <span>1</span>
                                          </div>
                                          <div className="flex justify-between text-black">
                                                <span>Tổng tiền:</span>
                                                <span>{formatPrice(book.price)}</span>
                                          </div>

                                          <div className="space-y-2">
                                                <input
                                                      type="text"
                                                      placeholder="Nhập mã voucher (nếu có)"
                                                      className="w-full p-2 border rounded-md text-sm text-black dark:text-white"
                                                />
                                                <button className="w-full bg-[#131313] text-white py-2 rounded-sm hover:bg-[#67d3e1] transition-colors">
                                                      Áp dụng
                                                </button>
                                          </div>

                                          <Divider className="my-4" />

                                          <div className="flex justify-between font-semibold text-black">
                                                <span>Tổng thanh toán:</span>
                                                <span>{formatPrice(book.price)}</span>
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </div>
            </div>
      );
}

export default InfoBuy;