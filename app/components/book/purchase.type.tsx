import React from 'react';
import { FormControl, Select, MenuItem, SelectChangeEvent, Paper, Typography, Alert } from '@mui/material';
import { FaCircleInfo } from 'react-icons/fa6';

interface IProps {
      purchaseType: string
      setPurchaseType: (value: string) => void;
}

const PurchaseType = ({ purchaseType, setPurchaseType }: IProps) => {


      const handleChange = (event: SelectChangeEvent) => {
            setPurchaseType(event.target.value);
      };

      return (
            <Paper
                  elevation={0}
                  className="w-2/5 py-3 px-5 ml-96"
                  sx={{ border: '1px solid rgba(0, 0, 0, 0.12)', backgroundColor: '#fafcfb' }}
            >
                  <Typography
                        variant="subtitle2"
                        className="text-black"
                  >
                        Chọn một trong ba hình thức mua sách dưới đây
                  </Typography>

                  <FormControl fullWidth size="small" className="mt-4">
                        <Select
                              value={purchaseType}
                              onChange={handleChange}
                              // displayEmpty
                              renderValue={(selected) => {
                                    if (!selected) {
                                          return (
                                                <Typography sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>
                                                      Chọn kiểu
                                                </Typography>
                                          );
                                    }

                                    return selected === 'hardcopy'
                                          ? 'Mua bản cứng'
                                          : selected === 'online'
                                                ? 'Mua bản mềm'
                                                : 'Mua cả bản cứng và bản mềm';
                              }}
                        >
                              <MenuItem value="hardcopy">Mua bản cứng</MenuItem>
                              <MenuItem value="online">Mua bản mềm</MenuItem>
                              <MenuItem value="both">Mua cả bản cứng và bản mềm</MenuItem>
                        </Select>
                  </FormControl>

                  <Alert
                        severity="warning"
                        icon={<FaCircleInfo size={16} />}
                        className="mt-4"
                        sx={{
                              '& .MuiAlert-message': {
                                    fontSize: '0.6rem',
                                    color: '#666'
                              },
                              backgroundColor: 'transparent',
                              padding: '0'
                        }}
                  >
                        Nếu mua bản cứng, bạn sẽ không thể đọc bản mềm. Nếu mua bản mềm, bạn sẽ không thể đọc bản cứng.
                  </Alert>

                  <Alert
                        severity="warning"
                        icon={<FaCircleInfo size={16} />}
                        sx={{
                              '& .MuiAlert-message': {
                                    fontSize: '0.6rem',
                                    color: '#666'
                              },
                              backgroundColor: 'transparent',
                              padding: '0'
                        }}
                  >
                        {'Nếu chọn "Cả hai", sẽ tính thêm "50.000 đ" phí vào thanh toán.'}
                  </Alert>
            </Paper>
      );
};

export default PurchaseType;