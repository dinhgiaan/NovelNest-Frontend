import { forwardRef, useState } from "react"
import { BadgeInfo, ArrowLeft, ArrowRight } from "lucide-react"
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide, Tooltip } from "@mui/material"
import type { TransitionProps } from "@mui/material/transitions"
import { ThemeConfig } from "../types/epub.types"

interface HelpDialogProps {
      themeConfig: ThemeConfig
}

const Transition = forwardRef<unknown, TransitionProps & {
      children: React.ReactElement
}>(function Transition(props, ref) {
      return <Slide direction="up" ref={ref} {...props} />
})

const HelpDialog: React.FC<HelpDialogProps> = ({ themeConfig }) => {
      const [open, setOpen] = useState(false)

      const handleClickOpen = () => setOpen(true)
      const handleClose = () => setOpen(false)

      return (
            <>
                  <Tooltip title="Hướng dẫn" arrow>
                        <button
                              onClick={handleClickOpen}
                              className={`p-2 ${themeConfig.textSecondary} ${themeConfig.text} ${themeConfig.buttonHover} rounded-md transition-colors`}
                        >
                              <BadgeInfo size={18} />
                        </button>
                  </Tooltip>

                  <Dialog
                        open={open}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={handleClose}
                        PaperProps={{ sx: { borderRadius: 2, maxWidth: 500 } }}
                  >
                        <DialogTitle className="font-semibold text-lg pb-2">
                              Hướng dẫn sử dụng
                        </DialogTitle>

                        <DialogContent dividers>
                              <DialogContentText component="div">
                                    <div className="space-y-4">
                                          <div className="flex items-center gap-3 text-sm text-white">
                                                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-medium">
                                                      1
                                                </span>
                                                <span>Sử dụng phím</span>
                                                <kbd className="px-2 py-1 bg-gray-100 rounded text-xs font-mono">
                                                      <ArrowLeft size={12} className="text-black" />
                                                </kbd>
                                                <span>hoặc</span>
                                                <kbd className="px-2 py-1 bg-gray-100 rounded text-xs font-mono">
                                                      <ArrowRight size={12} className="text-black" />
                                                </kbd>
                                                <span>để chuyển trang</span>
                                          </div>

                                          <div>
                                                <div className="flex items-center gap-3 text-sm mb-2">
                                                      <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-medium">
                                                            2
                                                      </span>
                                                      <span className="font-medium text-white">Các tính năng có sẵn:</span>
                                                </div>
                                                <ul className={`list-disc pl-10 space-y-1 text-sm ${themeConfig.lable}`}>
                                                      <li>Lưu vị trí đọc lần cuối</li>
                                                      <li>Chuyển đổi theme (Sáng/Tối/Sepia/Huyền Ảo)</li>
                                                      <li>Hiển thị số trang</li>
                                                      <li>Tìm kiếm và highlight từ khóa</li>
                                                      <li>Scroll theo chiều dọc</li>
                                                </ul>
                                          </div>
                                    </div>
                              </DialogContentText>
                        </DialogContent>

                        <DialogActions sx={{ p: 2.5 }}>
                              <Button
                                    variant="contained"
                                    onClick={handleClose}
                                    sx={{
                                          textTransform: "none",
                                          borderRadius: 1.5,
                                          fontWeight: 500,
                                    }}
                              >
                                    Đã hiểu
                              </Button>
                        </DialogActions>
                  </Dialog>
            </>
      )
}

export default HelpDialog;
