'use client';

import { useState } from "react";
import useSWR from "swr";
import { styled } from "@mui/material/styles";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, { AccordionSummaryProps, accordionSummaryClasses } from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";

import ErrorAPI from "../components/error.api";
import Loading from "../utils/loading";
import { faqService } from "../lib/api/faq";
import { ArrowRight } from "lucide-react";

const Accordion = styled((props: AccordionProps) => (
      <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
      border: `1px solid ${theme.palette.divider}`,
      "&:not(:last-child)": {
            borderBottom: 0,
      },
      "&::before": {
            display: "none",
      },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
      <MuiAccordionSummary
            expandIcon={<ArrowRight size={20} />}
            {...props}
      />
))(({ theme }) => ({
      backgroundColor: "rgba(0, 0, 0, .03)",
      flexDirection: "row",
      [`& .${accordionSummaryClasses.expandIconWrapper}.${accordionSummaryClasses.expanded}`]: {
            transform: "rotate(90deg)",
      },
      [`& .${accordionSummaryClasses.content}`]: {
            marginLeft: theme.spacing(1),
      },
      ...theme.applyStyles?.("dark", {
            backgroundColor: "rgba(255, 255, 255, .05)",
      }),
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
      padding: theme.spacing(2),
      borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

const FAQPage = () => {
      const [expanded, setExpanded] = useState<string | false>(false);

      const { data, error, isLoading } = useSWR("faqs", faqService.getAllFAQ, {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
      });

      const faqData: IFAQ[] = data?.data?.faq || [];

      if (error) return <ErrorAPI />;
      if (isLoading) return <Loading />;

      const handleChange =
            (panel: string) => (_event: React.SyntheticEvent, newExpanded: boolean) => {
                  setExpanded(newExpanded ? panel : false);
            };

      return (
            <div className="min-h-screen bg-[#FFFFFF] dark:bg-[#191B24]">
                  <div className="h-10"></div>
                  <div className="py-12 px-6">
                        <div className="max-w-3xl mx-auto">
                              <div className="text-center mb-16">
                                    <h1 className="text-3xl font-semibold text-gray-900 dark:text-white mb-3">
                                          Câu Hỏi Thường Gặp
                                    </h1>
                                    <p className="text-gray-600 dark:text-gray-400">
                                          Tìm câu trả lời cho những thắc mắc về NovelNest
                                    </p>
                              </div>

                              {faqData.map((item, index) => (
                                    <Accordion
                                          key={item._id}
                                          expanded={expanded === item._id}
                                          onChange={handleChange(item._id)}
                                    >
                                          <AccordionSummary aria-controls={`${item._id}-content`} id={`${item._id}-header`}>
                                                <Typography component="span" className="font-medium">
                                                      <span className="text-gray-400 mr-2">{index + 1}.</span>
                                                      {item.question}
                                                </Typography>
                                          </AccordionSummary>
                                          <AccordionDetails>
                                                <Typography variant="body2" className="leading-relaxed">
                                                      {item.answer}
                                                </Typography>
                                          </AccordionDetails>
                                    </Accordion>
                              ))}
                        </div>
                  </div>
            </div>
      );
};

export default FAQPage;
