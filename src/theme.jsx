import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    background: {
      default: '#F1F3F4',
    },
    primary: {
      main: '#14194C',
    },
  },
  typography: {
    fontFamily: 'Mulis, sans-serif',
    h4: {
      fontWeight: 800,
    },
    h5: {
      fontWeight: 800,
    },
  },
  mixins: {
    alignInTheCenter: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
    },
  },
});

export default theme;
