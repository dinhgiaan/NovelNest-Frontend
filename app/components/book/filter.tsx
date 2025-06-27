import { Accordion, AccordionDetails, AccordionSummary, Checkbox, FormControlLabel, Slider, Stack, Typography } from '@mui/material';
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
            <div className="space-y-2 sm:space-y-4 h-auto w-full">
                  {/* Filter Title - Responsive */}
                  <div className="text-center text-sm sm:text-base font-semibold uppercase text-black dark:text-white mb-2 sm:mb-4">
                        Bộ lọc
                  </div>

                  {/* Filter Options - Responsive Accordions */}
                  {filterOptions.map((filter, index) => (
                        <Accordion
                              key={index}
                              sx={{
                                    backgroundColor: '#fff0f0',
                                    '&.MuiAccordion-root': {
                                          boxShadow: 'none',
                                          border: '1px solid #e5e7eb',
                                          borderRadius: '8px',
                                          marginBottom: '8px',
                                          '&:before': {
                                                display: 'none',
                                          },
                                    },
                                    '&.Mui-expanded': {
                                          margin: '0 0 8px 0',
                                    }
                              }}
                        >
                              <AccordionSummary
                                    expandIcon={<IoIosArrowDropdown size={15} />}
                                    sx={{
                                          padding: '8px 16px',
                                          minHeight: '40px',
                                          '&.Mui-expanded': {
                                                minHeight: '40px',
                                          },
                                          '& .MuiAccordionSummary-content': {
                                                margin: '8px 0',
                                                '&.Mui-expanded': {
                                                      margin: '8px 0',
                                                }
                                          }
                                    }}
                              >
                                    <Typography className="text-xs sm:text-sm text-gray-700 font-medium">
                                          {filter.title}
                                    </Typography>
                              </AccordionSummary>

                              <AccordionDetails
                                    sx={{
                                          padding: '8px 16px 16px 16px',
                                          paddingTop: 0
                                    }}
                              >
                                    <Stack spacing={0.5}>
                                          {filter.options.map((option, idx) => (
                                                <FormControlLabel
                                                      key={idx}
                                                      value={option.toLowerCase().replace(/\s+/g, '-')}
                                                      control={
                                                            <Checkbox
                                                                  size="small"
                                                                  sx={{
                                                                        padding: '4px',
                                                                        '& .MuiSvgIcon-root': {
                                                                              fontSize: '1rem'
                                                                        }
                                                                  }}
                                                            />
                                                      }
                                                      label={
                                                            <span className="text-xs sm:text-sm text-gray-600">
                                                                  {option}
                                                            </span>
                                                      }
                                                      sx={{
                                                            margin: 0,
                                                            '& .MuiFormControlLabel-label': {
                                                                  fontSize: '0.75rem',
                                                                  '@media (min-width: 640px)': {
                                                                        fontSize: '0.875rem'
                                                                  }
                                                            }
                                                      }}
                                                />
                                          ))}
                                    </Stack>
                              </AccordionDetails>
                        </Accordion>
                  ))}

                  {/* Price Range Filter - Responsive */}
                  <Accordion
                        sx={{
                              backgroundColor: '#fff0f0',
                              '&.MuiAccordion-root': {
                                    boxShadow: 'none',
                                    border: '1px solid #e5e7eb',
                                    borderRadius: '8px',
                                    marginBottom: '8px',
                                    '&:before': {
                                          display: 'none',
                                    },
                              },
                              '&.Mui-expanded': {
                                    margin: '0 0 8px 0',
                              }
                        }}
                  >
                        <AccordionSummary
                              expandIcon={<IoIosArrowDropdown size={15} />}
                              sx={{
                                    padding: '8px 16px',
                                    minHeight: '40px',
                                    '&.Mui-expanded': {
                                          minHeight: '40px',
                                    },
                                    '& .MuiAccordionSummary-content': {
                                          margin: '8px 0',
                                          '&.Mui-expanded': {
                                                margin: '8px 0',
                                          }
                                    }
                              }}
                        >
                              <Typography className="text-xs sm:text-sm text-gray-700 font-medium">
                                    Giá tiền
                              </Typography>
                        </AccordionSummary>

                        <AccordionDetails
                              sx={{
                                    padding: '8px 16px 16px 16px',
                                    paddingTop: 0
                              }}
                        >
                              <div className="px-2">
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
                                                '& .MuiSlider-track': {
                                                      height: 4,
                                                },
                                                '& .MuiSlider-rail': {
                                                      height: 4,
                                                      opacity: 0.3,
                                                },
                                          }}
                                    />

                                    {/* Price Range Display */}
                                    <div className="flex justify-between mt-2">
                                          <span className="text-xs text-gray-500">0₫</span>
                                          <span className="text-xs text-gray-500">500,000₫</span>
                                    </div>
                              </div>
                        </AccordionDetails>
                  </Accordion>

                  {/* Apply Filter Button - Mobile */}
                  <div className="lg:hidden pt-4">
                        <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm">
                              Áp dụng bộ lọc
                        </button>
                  </div>
            </div>
      );
};

export default Filter;