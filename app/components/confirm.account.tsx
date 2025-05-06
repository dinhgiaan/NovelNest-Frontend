import { Box, Modal, Typography, Button } from '@mui/material';
import { MdCheckCircleOutline } from 'react-icons/md';

interface IProps {
      isConfirmOpen: boolean;
      setIsConfirmOpen: (value: boolean) => void;
      email: string;
}

const ConfirmAccount = ({ isConfirmOpen, setIsConfirmOpen, email }: IProps) => {
      return (
            <Modal
                  open={isConfirmOpen}
                  onClose={() => setIsConfirmOpen(false)}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
            >
                  <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 430,
                        bgcolor: '#fff',
                        borderRadius: 2,
                        boxShadow: 24,
                        p: 4,
                  }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                              <MdCheckCircleOutline color='#1976d2' size={72} />
                              <Typography id="modal-modal-title" variant="h5" sx={{ fontWeight: 600, color: '#333' }}>
                                    Kích hoạt tài khoản
                              </Typography>
                        </Box>
                        <Typography id="modal-modal-description" sx={{ mt: 3, color: '#555', fontSize: '0.9rem' }}>
                              Đường link kích hoạt tài khoản đã được gửi vào email <strong>{email}</strong>.<br />
                              Vui lòng kiểm tra email và bấm vào đường link để hoàn tất kích hoạt.
                        </Typography>
                        <Typography sx={{ mt: 2, color: 'error.main', fontSize: '0.85rem' }}>
                              Lưu ý: Đường link sẽ hết hạn sau 10 phút!
                        </Typography>
                        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
                              <Button
                                    onClick={() => setIsConfirmOpen(false)}
                                    variant="contained"
                                    color="primary"
                                    sx={{ px: 4 }}
                              >
                                    Đã hiểu
                              </Button>
                        </Box>
                  </Box>
            </Modal>
      );
};

export default ConfirmAccount;
