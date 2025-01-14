import { Accordion, AccordionDetails, AccordionSummary, FormControl, FormControlLabel, Radio, Typography } from '@mui/material';
import { ChevronDown } from 'lucide-react';

const Filter = () => {
      return (
            <div className="space-y-4">
                  <div className='text-center text-base font-semibold uppercase'>Bộ lọc</div>
                  <FormControl fullWidth>
                        <Accordion>
                              <AccordionSummary
                                    expandIcon={<ChevronDown size={15} />}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                              >
                                    <Typography className='text-xs text-gray-700'>Thể loại</Typography>
                              </AccordionSummary>
                              <AccordionDetails>
                                    <FormControlLabel value="kinh-di" control={<Radio size="small" />} label={<span className="text-xs">Kinh dị</span>} />
                                    <FormControlLabel value="hanh-dong" control={<Radio size="small" />} label={<span className="text-xs">Hành động</span>} />
                                    <FormControlLabel value="hai-huoc" control={<Radio size="small" />} label={<span className="text-xs">Hài hước</span>} />
                              </AccordionDetails>
                        </Accordion>

                        <Accordion>
                              <AccordionSummary
                                    expandIcon={<ChevronDown size={15} />}
                                    aria-controls="panel2-content"
                                    id="panel2-header"
                              >
                                    <Typography className="text-sm text-gray-700">Đánh giá</Typography>
                              </AccordionSummary>
                              <AccordionDetails>
                                    <FormControlLabel value="kinh-di" control={<Radio size="small" />} label={<span className="text-xs">Kinh dị</span>} />
                                    <FormControlLabel value="hanh-dong" control={<Radio size="small" />} label={<span className="text-xs">Hành động</span>} />
                                    <FormControlLabel value="hai-huoc" control={<Radio size="small" />} label={<span className="text-xs">Hài hước</span>} />
                              </AccordionDetails>
                        </Accordion>

                        <Accordion>
                              <AccordionSummary
                                    expandIcon={<ChevronDown size={15} />}
                                    aria-controls="panel3-content"
                                    id="panel3-header"
                              >
                                    <Typography className="text-sm text-gray-700">Giá tiền</Typography>
                              </AccordionSummary>
                              <AccordionDetails>
                                    <FormControlLabel value="kinh-di" control={<Radio size="small" />} label={<span className="text-sm">Kinh dị</span>} />
                                    <FormControlLabel value="hanh-dong" control={<Radio size="small" />} label={<span className="text-sm">Hành động</span>} />
                                    <FormControlLabel value="hai-huoc" control={<Radio size="small" />} label={<span className="text-sm">Hài hước</span>} />
                              </AccordionDetails>
                        </Accordion>
                  </FormControl>
            </div>
      );
};

export default Filter;
