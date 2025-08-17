"use client"

import type React from "react"
import { Box, Typography, Paper, Stack, Container, useTheme } from "@mui/material"
import { MessageCircleQuestion, Clock } from "lucide-react"

const SupportTicket = () => {
      const theme = useTheme()

      return (
            <Container maxWidth="sm">
                  <Paper
                        elevation={0}
                        sx={{
                              borderRadius: 2,
                              border: `1px solid ${theme.palette.divider}`,
                              bgcolor: theme.palette.background.paper,
                              p: 3,
                        }}
                  >
                        <Stack spacing={2} alignItems="center" textAlign="center">
                              <Box
                                    sx={{
                                          width: 48,
                                          height: 48,
                                          borderRadius: '50%',
                                          bgcolor: theme.palette.primary.main + '15',
                                          display: 'flex',
                                          alignItems: 'center',
                                          justifyContent: 'center',
                                    }}
                              >
                                    <MessageCircleQuestion
                                          size={24}
                                          color={theme.palette.primary.main}
                                    />
                              </Box>

                              <Stack spacing={1} alignItems="center">
                                    <Typography variant="h6" fontWeight={600}>
                                          Hỗ trợ khách hàng
                                    </Typography>

                                    <Stack direction="row" alignItems="center" spacing={0.5}>
                                          <Clock size={14} color={theme.palette.text.secondary} />
                                          <Typography variant="body2" color="text.secondary">
                                                Sắp ra mắt
                                          </Typography>
                                    </Stack>
                              </Stack>

                              <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ maxWidth: 300 }}
                              >
                                    Chúng tôi đang phát triển hệ thống hỗ trợ để phục vụ bạn tốt hơn.
                              </Typography>
                        </Stack>
                  </Paper>
            </Container>
      )
}

export default SupportTicket;
