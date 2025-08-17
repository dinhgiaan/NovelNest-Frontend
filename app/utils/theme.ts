import { createTheme, Theme } from '@mui/material/styles';

export const createLightTheme = (): Theme => createTheme({
      palette: {
            mode: 'light',
            primary: {
                  main: '#1976d2',
            },
            secondary: {
                  main: '#dc004e',
            },
            background: {
                  default: '#ffffff',
                  paper: '#ffffff',
            },
            text: {
                  primary: '#000000',
                  secondary: '#666666',
            },
      },
      components: {
            MuiCard: {
                  styleOverrides: {
                        root: {
                              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                              borderRadius: '12px',
                        },
                  },
            },
            MuiTextField: {
                  styleOverrides: {
                        root: {
                              '& .MuiOutlinedInput-root': {
                                    borderRadius: '8px',
                              },
                        },
                  },
            },
            MuiButton: {
                  styleOverrides: {
                        root: {
                              borderRadius: '8px',
                              textTransform: 'none',
                        },
                  },
            },
      },
});

export const createDarkTheme = (): Theme => createTheme({
      palette: {
            mode: 'dark',
            primary: {
                  main: '#90caf9',
            },
            secondary: {
                  main: '#f48fb1',
            },
            background: {
                  default: '#121212',
                  paper: '#1e1e1e',
            },
            text: {
                  primary: '#ffffff',
                  secondary: '#b0b0b0',
            },
      },
      components: {
            MuiCard: {
                  styleOverrides: {
                        root: {
                              boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                              borderRadius: '12px',
                              backgroundColor: '#1e1e1e',
                        },
                  },
            },
            MuiTextField: {
                  styleOverrides: {
                        root: {
                              '& .MuiOutlinedInput-root': {
                                    borderRadius: '8px',
                                    '& fieldset': {
                                          borderColor: '#444444',
                                    },
                                    '&:hover fieldset': {
                                          borderColor: '#666666',
                                    },
                                    '&.Mui-focused fieldset': {
                                          borderColor: '#90caf9',
                                    },
                              },
                              '& .MuiInputLabel-root': {
                                    color: '#b0b0b0',
                              },
                        },
                  },
            },
            MuiButton: {
                  styleOverrides: {
                        root: {
                              borderRadius: '8px',
                              textTransform: 'none',
                        },
                  },
            },
      },
});

export const lightTheme = createLightTheme();
export const darkTheme = createDarkTheme();
