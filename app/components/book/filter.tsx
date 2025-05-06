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
            <div className="space-y-4 h-auto w-full">
                  <div className="text-center text-base font-semibold uppercase text-black dark:text-white">Bộ lọc</div>
                  {filterOptions.map((filter, index) => (
                        <Accordion key={index} sx={{ backgroundColor: '#fff0f0' }}>
                              <AccordionSummary expandIcon={<IoIosArrowDropdown size={15} />}>
                                    <Typography className="text-sm text-gray-700">{filter.title}</Typography>
                              </AccordionSummary>
                              <AccordionDetails>
                                    <Stack>
                                          {filter.options.map((option, idx) => (
                                                <FormControlLabel
                                                      key={idx}
                                                      value={option.toLowerCase().replace(/\s+/g, '-')}
                                                      control={<Checkbox size="small" />}
                                                      label={<span className="text-xs">{option}</span>}
                                                />
                                          ))}
                                    </Stack>
                              </AccordionDetails>
                        </Accordion>
                  ))}
                  <Accordion sx={{ backgroundColor: '#fff0f0' }}>
                        <AccordionSummary expandIcon={<IoIosArrowDropdown size={15} />}>
                              <Typography className="text-sm text-gray-700">Giá tiền</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                              <Slider
                                    size="small"
                                    defaultValue={70}
                                    aria-label="Small"
                                    valueLabelDisplay="auto"
                              />
                        </AccordionDetails>
                  </Accordion>
            </div>
      );
};

export default Filter;
