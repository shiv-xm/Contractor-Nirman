import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#D9531E', // Construction Warm Terracotta
      light: '#F4733E',
      dark: '#B03E0E',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#0F172A', // Deep Slate Navy
      light: '#1E293B',
      dark: '#020617',
      contrastText: '#FFFFFF',
    },
    success: {
      main: '#059669', // Emerald Green for Verified Badges
      light: '#10B981',
      dark: '#047857',
    },
    warning: {
      main: '#D97706', // Safety Amber
      light: '#F59E0B',
      dark: '#B45309',
    },
    background: {
      default: '#F8FAFC',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#0F172A',
      secondary: '#475569',
    },
    divider: '#E2E8F0',
  },
  typography: {
    fontFamily: [
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontWeight: 800,
      letterSpacing: '-0.025em',
      color: '#0F172A',
    },
    h2: {
      fontWeight: 700,
      letterSpacing: '-0.02em',
      color: '#0F172A',
    },
    h3: {
      fontWeight: 700,
      letterSpacing: '-0.015em',
      color: '#0F172A',
    },
    h4: {
      fontWeight: 600,
      color: '#0F172A',
    },
    h5: {
      fontWeight: 600,
      color: '#0F172A',
    },
    h6: {
      fontWeight: 600,
      color: '#0F172A',
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 18px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(217, 83, 30, 0.18)',
          },
          '&.MuiButton-containedPrimary': {
            background: 'linear-gradient(135deg, #D9531E 0%, #C44210 100%)',
            '&:hover': {
              background: 'linear-gradient(135deg, #C44210 0%, #A8340A 100%)',
            },
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          border: '1px solid #E2E8F0',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.04), 0 1px 2px -1px rgba(0, 0, 0, 0.04)',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
          '&:hover': {
            borderColor: '#CBD5E1',
            boxShadow: '0 10px 25px -5px rgba(15, 23, 42, 0.08), 0 8px 10px -6px rgba(15, 23, 42, 0.04)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          borderRadius: 6,
        },
      },
    },
  },
});
