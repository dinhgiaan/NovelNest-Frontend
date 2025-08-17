import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

const Loading = () => {
      return (
            <div className='w-full h-screen bg-white dark:bg-[#233b57] flex justify-center items-center'>
                  <Box sx={{ width: '60%' }}>
                        <LinearProgress />
                  </Box>
            </div>
      );
}

export default Loading;
