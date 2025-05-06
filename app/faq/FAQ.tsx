import { Accordion, AccordionDetails, AccordionSummary, Divider, Typography } from "@mui/material";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";

interface IProps {
      faqData: { _id: string; question: string; answer: string }[];
}

const FAQPage = ({ faqData }: IProps) => {

      return (
            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
                  <div className="max-w-4xl mx-auto p-6">
                        <h1 className="text-2xl font-bold text-center mb-20 text-gray-800 dark:text-gray-100">
                              Những Câu Hỏi Thường Gặp
                        </h1>
                        <div className="space-y-6">
                              {faqData.map((item, index) => (
                                    <Accordion key={item._id} className="border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white dark:bg-gray-800">
                                          <AccordionSummary
                                                expandIcon={<IoIosArrowDown color='brown' />}
                                                aria-controls={`panel-${item._id}-content`}
                                                id={`panel-${item._id}-header`}
                                          >
                                                <Typography component="span" className="dark:text-[#49daeb] text-[#7e9cff]" fontSize={15}>CÂU HỎI {index + 1}:
                                                      <span className="dark:text-[#dbd759] text-[#f0c17e]"> {item.question}</span></Typography>
                                          </AccordionSummary>
                                          <Divider sx={{ bgcolor: '#ccc' }} />
                                          <AccordionDetails className="flex items-center ml-2">
                                                <Typography className="dark:text-white text-black flex items-center" fontSize={12}><IoIosArrowForward className="mr-2" /> {item.answer}</Typography>
                                          </AccordionDetails>
                                    </Accordion>
                              ))}
                        </div>
                  </div>
            </div>
      );
};

export default FAQPage;
