'use client';

import {
      Accordion,
      AccordionDetails,
      AccordionSummary,
      Checkbox,
      FormControlLabel,
      Slider,
      Stack,
      Typography,
} from '@mui/material';
import { IoIosArrowDropdown } from 'react-icons/io';

const filterOptions = [
      {
            title: 'Thể loại',
            options: ['Kinh dị', 'Hành động', 'Hài hước'],
      },
      {
            title: 'Đánh giá',
            options: ['1 sao', '2 sao', '3 sao', '4 sao', '5 sao'],
      },
];

const Filter = () => {
      return (
            <div className="w-ful mx-auto space-y-3 sm:space-y-4">
                  <div className="text-center text-sm sm:text-base font-semibold uppercase text-black dark:text-white">
                        Bộ lọc
                  </div>

                  {/* Filter Options */}
                  {filterOptions.map((filter, index) => (
                        <Accordion
                              key={index}
                              sx={{
                                    backgroundColor: '#fff0f0',
                                    boxShadow: 'none',
                                    border: '1px solid #e5e7eb',
                                    borderRadius: '8px',
                                    mb: 1,
                                    '&:before': { display: 'none' },
                                    '&.Mui-expanded': { margin: '0 0 8px 0' },
                              }}
                        >
                              <AccordionSummary
                                    expandIcon={<IoIosArrowDropdown size={16} />}
                                    sx={{
                                          px: 2,
                                          minHeight: 40,
                                          '&.Mui-expanded': { minHeight: 40 },
                                          '& .MuiAccordionSummary-content': {
                                                my: 1,
                                                '&.Mui-expanded': { my: 1 },
                                          },
                                    }}
                              >
                                    <Typography className="text-xs sm:text-sm text-gray-700 font-medium">
                                          {filter.title}
                                    </Typography>
                              </AccordionSummary>

                              <AccordionDetails sx={{ pt: 0, px: 2, pb: 2 }}>
                                    <Stack spacing={0.5}>
                                          {filter.options.map((option, idx) => (
                                                <FormControlLabel
                                                      key={idx}
                                                      value={option.toLowerCase().replace(/\s+/g, '-')}
                                                      control={
                                                            <Checkbox
                                                                  size="small"
                                                                  sx={{
                                                                        p: '4px',
                                                                        '& .MuiSvgIcon-root': { fontSize: '1rem' },
                                                                  }}
                                                            />
                                                      }
                                                      label={
                                                            <span className="text-xs sm:text-sm text-gray-600">{option}</span>
                                                      }
                                                      sx={{
                                                            m: 0,
                                                            '& .MuiFormControlLabel-label': {
                                                                  fontSize: '0.75rem',
                                                                  '@media (min-width: 640px)': {
                                                                        fontSize: '0.875rem',
                                                                  },
                                                            },
                                                      }}
                                                />
                                          ))}
                                    </Stack>
                              </AccordionDetails>
                        </Accordion>
                  ))}

                  {/* Price Filter */}
                  <Accordion
                        sx={{
                              backgroundColor: '#fff0f0',
                              boxShadow: 'none',
                              border: '1px solid #e5e7eb',
                              borderRadius: '8px',
                              mb: 1,
                              '&:before': { display: 'none' },
                              '&.Mui-expanded': { margin: '0 0 8px 0' },
                        }}
                  >
                        <AccordionSummary
                              expandIcon={<IoIosArrowDropdown size={16} />}
                              sx={{
                                    px: 2,
                                    minHeight: 40,
                                    '&.Mui-expanded': { minHeight: 40 },
                                    '& .MuiAccordionSummary-content': {
                                          my: 1,
                                          '&.Mui-expanded': { my: 1 },
                                    },
                              }}
                        >
                              <Typography className="text-xs sm:text-sm text-gray-700 font-medium">
                                    Giá tiền
                              </Typography>
                        </AccordionSummary>

                        <AccordionDetails sx={{ pt: 0, px: 2, pb: 2 }}>
                              <Slider
                                    size="small"
                                    defaultValue={70}
                                    aria-label="Price Range"
                                    valueLabelDisplay="auto"
                                    sx={{
                                          color: '#3b82f6',
                                          '& .MuiSlider-thumb': {
                                                width: 16,
                                                height: 16,
                                                '&:hover, &.Mui-focusVisible': {
                                                      boxShadow: '0 0 0 8px rgba(59, 130, 246, 0.16)',
                                                },
                                          },
                                          '& .MuiSlider-track, & .MuiSlider-rail': {
                                                height: 4,
                                          },
                                          '& .MuiSlider-rail': { opacity: 0.3 },
                                    }}
                              />
                              <div className="flex justify-between mt-1 text-xs text-gray-400">
                                    <span>0₫</span>
                                    <span>500.000₫</span>
                              </div>
                        </AccordionDetails>
                  </Accordion>

                  {/* Apply Button for Mobile */}
                  <div className="lg:hidden pt-2">
                        <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg text-sm transition">
                              Áp dụng bộ lọc
                        </button>
                  </div>
            </div>
      );
};

export default Filter;
