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
import { Banknote, Barcode, BookOpenText, Calendar, MapPin, Ruler, Tag } from 'lucide-react';
import { Divider } from '@mui/material';

const InfoDetail = () => {
      const [value, setValue] = useState(0);
      const { slug } = useParams();

      const fetcher = (url: string) => fetch(url).then((res) => res.json());
      const { data, error, isLoading } = useSWR(
            slug ? `http://localhost:8888/api/v1/books/detail/${slug}` : null,
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
            <div className="max-w-4xl mx-auto mt-14 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                  <Box sx={{ width: '100%' }}>
                        {/* Tabs Header */}
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

                        <div className="dark:text-gray-300 text-gray-800">
                              <TabPanel index={0}>
                                    <div className="space-y-10">
                                          <div>
                                                <Typography variant="h6" className="font-bold mb-2 text-">
                                                      Thông tin chung về sách
                                                </Typography>
                                                <div className="mt-3 space-y-2">
                                                      <Typography className='flex items-center'>
                                                            <Calendar className="mr-2" size={14} />
                                                            <span className='text-sm'>Ngày xuất bản: {formatDate(data.data?.publicDate)}</span>
                                                      </Typography>
                                                      <Typography className='flex items-center'>
                                                            <Ruler className="mr-2" size={14} />
                                                            <span className='text-sm'>Kích thước sách: {data.data?.size}</span>
                                                      </Typography>
                                                      <Typography className='flex items-center'>
                                                            <Barcode className='mr-2' size={14} />
                                                            <span className='text-sm'> ISBN: {data.data?.isbn}</span>
                                                      </Typography>
                                                      <Typography className='flex items-center'>
                                                            <BookOpenText className='mr-2' size={14} />
                                                            <span className='text-sm'>Số trang: {data.data?.page}</span>
                                                      </Typography>
                                                </div>
                                          </div>

                                          <Divider />

                                          <div>
                                                <Typography variant="h6" className="font-bold mb-2">
                                                      Thông tin thuê sách
                                                </Typography>
                                                <div className="mt-3 space-y-2">
                                                      <Typography className="flex items-center text-sm">
                                                            <Banknote size={14} className='mr-2' />
                                                            <span className='text-sm'>Giá: {convertPriceToVND(data.data?.price)}</span>
                                                      </Typography>
                                                      <Typography className="flex items-center text-sm">
                                                            <MapPin className="mr-2" size={16} /> Địa chỉ cho thuê: 123 Đường ABC, TP. HCM
                                                      </Typography>
                                                </div>
                                          </div>
                                    </div>
                              </TabPanel>
                              <TabPanel index={1}>
                                    <Typography>Hiển thị các đánh giá tại đây.</Typography>
                              </TabPanel>
                        </div>
                  </Box>
            </div>
      );
};

export default InfoDetail;
