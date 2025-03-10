'use client';

import { useState } from 'react';
import useSWR from 'swr';
import { useParams } from 'next/navigation';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import convertPriceToVND from '@/app/utils/convert.price';
import ErrorAPI from '../error.api';
import Loading from '@/app/utils/loading';
import { Divider } from '@mui/material';
import { MdDateRange } from 'react-icons/md';
import { SlSizeFullscreen } from 'react-icons/sl';
import { AiOutlineBarcode } from 'react-icons/ai';
import { GiMoneyStack, GiSpellBook } from 'react-icons/gi';

const InfoDetail = () => {
      const [value, setValue] = useState(0);
      const { slug } = useParams();

      const fetcher = (url: string) => fetch(url).then((res) => res.json());
      const { data, error, isLoading } = useSWR(
            slug ? `${process.env.NEXT_PUBLIC_BOOKS}/detail/${slug}` : null,
            fetcher
      );

      const formatDate = (date: string) => {
            const parsedDate = new Date(date);
            return parsedDate.toLocaleDateString('vi-VN').replace(/\//g, ' - ');
      };

      const handleChange = (event: React.SyntheticEvent, newValue: number) => {
            setValue(newValue);
      };

      const TabPanel = ({ children, index }: { children: React.ReactNode; index: number }) => (
            <div role="tabpanel" hidden={value !== index} aria-labelledby={`tab-${index}`}>
                  {value === index && (
                        <Box sx={{ p: 3 }}>
                              <Typography>{children}</Typography>
                        </Box>
                  )}
            </div>
      );

      if (error) return <ErrorAPI />;
      if (isLoading) return <Loading />;

      return (
            <div className="max-w-4xl mx-auto mt-14 rounded-lg shadow-md">
                  <Box sx={{ width: '100%' }}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }} className="bg-gray-100 dark:bg-gray-700 rounded-t-lg">
                              <Tabs
                                    value={value}
                                    onChange={handleChange}
                                    aria-label="Book Info Tabs"
                                    textColor="primary"
                                    indicatorColor="primary"
                                    centered
                              >
                                    <Tab label="Thông tin chi tiết" id="tab-0" aria-controls="tabpanel-0" />
                                    <Tab label="Đánh giá" id="tab-1" aria-controls="tabpanel-1" />
                              </Tabs>
                        </Box>

                        <div>
                              <TabPanel index={0}>
                                    <div className="space-y-10">
                                          <div>
                                                <Typography variant="h6" className="font-bold mb-2 dark:text-[#c7c54a] text-[#eca874]">
                                                      Thông tin chung về sách
                                                </Typography>
                                                <div className="mt-3 space-y-2">
                                                      <Typography className='flex items-center'>
                                                            <MdDateRange className="mr-2" size={14} color='#a935db' />
                                                            <span className='text-sm dark:text-gray-300 text-gray-800'>Ngày xuất bản: {formatDate(data.data?.publicDate)}</span>
                                                      </Typography>
                                                      <Typography className='flex items-center'>
                                                            <SlSizeFullscreen className="mr-2" size={14} color='#a935db' />
                                                            <span className='text-sm dark:text-gray-300 text-gray-800'>Kích thước sách: {data.data?.size}</span>
                                                      </Typography>
                                                      <Typography className='flex items-center'>
                                                            <AiOutlineBarcode className='mr-2' size={14} color='#a935db' />
                                                            <span className='text-sm dark:text-gray-300 text-gray-800'> ISBN: {data.data?.isbn}</span>
                                                      </Typography>
                                                      <Typography className='flex items-center'>
                                                            <GiSpellBook className='mr-2' size={14} color='#a935db' />
                                                            <span className='text-sm dark:text-gray-300 text-gray-800'>Số trang: {data.data?.page}</span>
                                                      </Typography>
                                                </div>
                                          </div>

                                          <Divider sx={{ bgcolor: '#ccc' }} />

                                          <div>
                                                <Typography variant="h6" className="font-bold mb-2 dark:text-[#c7c54a] text-[#eca874]">
                                                      Thông tin thuê sách
                                                </Typography>
                                                <div className="mt-3 space-y-2">
                                                      <Typography className="flex items-center text-sm">
                                                            <GiMoneyStack size={14} className='mr-2' color='#a935db' />
                                                            <span className='text-sm dark:text-gray-300 text-gray-800'>Giá: {convertPriceToVND(data.data?.price)}</span>
                                                      </Typography>
                                                </div>
                                          </div>
                                    </div>
                              </TabPanel>
                              <TabPanel index={1}>
                                    <Typography>Hiện tại chưa có đánh giá nào.</Typography>
                              </TabPanel>
                        </div>
                  </Box>
            </div>
      );
};

export default InfoDetail;
