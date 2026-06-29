import { RouterProvider } from 'react-router';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { router } from './routes';

declare module '@mui/material/styles' {
  interface PaletteColor {
    lighter?: string;
  }
  interface SimplePaletteColorOptions {
    lighter?: string;
  }
}

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#c4f135',
      dark: '#a8d020',
      light: '#d4f76a',
      contrastText: '#080b14',
      lighter: 'rgba(196, 241, 53, 0.12)',
    },
    secondary: {
      main: '#ff4e1a',
      contrastText: '#ffffff',
      lighter: 'rgba(255, 78, 26, 0.12)',
    },
    background: {
      default: '#080b14',
      paper: '#0d1120',
    },
    success: {
      main: '#22c55e',
      lighter: 'rgba(34, 197, 94, 0.12)',
    },
    warning: {
      main: '#f59e0b',
      lighter: 'rgba(245, 158, 11, 0.12)',
    },
    info: {
      main: '#38bdf8',
      lighter: 'rgba(56, 189, 248, 0.12)',
    },
    error: {
      main: '#ef4444',
      lighter: 'rgba(239, 68, 68, 0.12)',
    },
    text: {
      primary: '#e8f0ff',
      secondary: '#5a6a8a',
    },
    divider: 'rgba(26, 34, 64, 0.8)',
    action: {
      hover: 'rgba(196, 241, 53, 0.04)',
      selected: 'rgba(196, 241, 53, 0.08)',
    },
  },
  shape: {
    borderRadius: 6,
  },
  typography: {
    fontFamily: '"DM Sans", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Barlow Condensed", sans-serif',
      fontWeight: 800,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontFamily: '"Barlow Condensed", sans-serif',
      fontWeight: 800,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontFamily: '"Barlow Condensed", sans-serif',
      fontWeight: 700,
    },
    h4: {
      fontFamily: '"Barlow Condensed", sans-serif',
      fontWeight: 700,
    },
    h5: {
      fontFamily: '"Barlow Condensed", sans-serif',
      fontWeight: 700,
    },
    h6: {
      fontFamily: '"Barlow Condensed", sans-serif',
      fontWeight: 600,
    },
    button: {
      fontWeight: 600,
      letterSpacing: '0.01em',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#080b14',
          backgroundImage: 'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(196, 241, 53, 0.06) 0%, transparent 60%)',
          minHeight: '100vh',
        },
        '*::-webkit-scrollbar': {
          width: 4,
          height: 4,
        },
        '*::-webkit-scrollbar-track': {
          background: 'transparent',
        },
        '*::-webkit-scrollbar-thumb': {
          background: 'rgba(26, 34, 64, 0.8)',
          borderRadius: 2,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: '#0d1120',
          border: '1px solid rgba(26, 34, 64, 0.8)',
          boxShadow: 'none',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: '#0d1120',
          border: '1px solid rgba(26, 34, 64, 0.8)',
          boxShadow: 'none',
        },
        elevation2: {
          boxShadow: 'none',
        },
        elevation3: {
          boxShadow: 'none',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 6,
          fontFamily: '"DM Sans", sans-serif',
          fontWeight: 600,
          transition: 'all 0.15s ease',
        },
        containedPrimary: {
          color: '#080b14',
          boxShadow: '0 0 20px rgba(196, 241, 53, 0.2)',
          '&:hover': {
            backgroundColor: '#d4f76a',
            boxShadow: '0 0 30px rgba(196, 241, 53, 0.35)',
          },
        },
        outlinedPrimary: {
          borderColor: 'rgba(196, 241, 53, 0.4)',
          color: '#c4f135',
          '&:hover': {
            borderColor: '#c4f135',
            backgroundColor: 'rgba(196, 241, 53, 0.06)',
          },
        },
        outlinedSecondary: {
          borderColor: 'rgba(26, 34, 64, 0.8)',
          color: '#5a6a8a',
          '&:hover': {
            borderColor: 'rgba(90, 106, 138, 0.5)',
            backgroundColor: 'rgba(26, 34, 64, 0.4)',
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: 'all 0.15s ease',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: 'rgba(8, 11, 20, 0.9)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(26, 34, 64, 0.8)',
          boxShadow: 'none',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundImage: 'none',
          backgroundColor: '#080b14',
          borderRight: '1px solid rgba(26, 34, 64, 0.8)',
          boxShadow: 'none',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          fontWeight: 600,
          fontFamily: '"DM Sans", sans-serif',
          fontSize: '0.75rem',
          letterSpacing: '0.02em',
        },
        colorPrimary: {
          backgroundColor: 'rgba(196, 241, 53, 0.12)',
          color: '#c4f135',
          border: '1px solid rgba(196, 241, 53, 0.25)',
        },
        colorSuccess: {
          backgroundColor: 'rgba(34, 197, 94, 0.12)',
          color: '#22c55e',
          border: '1px solid rgba(34, 197, 94, 0.25)',
        },
        colorWarning: {
          backgroundColor: 'rgba(245, 158, 11, 0.12)',
          color: '#f59e0b',
          border: '1px solid rgba(245, 158, 11, 0.25)',
        },
        colorError: {
          backgroundColor: 'rgba(239, 68, 68, 0.12)',
          color: '#ef4444',
          border: '1px solid rgba(239, 68, 68, 0.25)',
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 2,
          backgroundColor: 'rgba(26, 34, 64, 0.8)',
          height: 6,
        },
        barColorPrimary: {
          backgroundColor: '#c4f135',
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          fontFamily: '"DM Sans", sans-serif',
          fontSize: '0.875rem',
          color: '#5a6a8a',
          minHeight: 48,
          '&.Mui-selected': {
            color: '#c4f135',
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: '#c4f135',
          height: 2,
        },
      },
    },
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(8, 11, 20, 0.95)',
          backdropFilter: 'blur(12px)',
          borderTop: '1px solid rgba(26, 34, 64, 0.8)',
          height: 64,
        },
      },
    },
    MuiBottomNavigationAction: {
      styleOverrides: {
        root: {
          color: '#5a6a8a',
          minWidth: 60,
          padding: '6px 8px',
          '&.Mui-selected': {
            color: '#c4f135',
          },
          '& .MuiBottomNavigationAction-label': {
            fontFamily: '"DM Sans", sans-serif',
            fontWeight: 600,
            fontSize: '0.7rem',
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundImage: 'none',
          backgroundColor: '#0d1120',
          border: '1px solid rgba(26, 34, 64, 0.8)',
          boxShadow: '0 24px 64px rgba(0,0,0,0.6)',
          borderRadius: 10,
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          fontFamily: '"Barlow Condensed", sans-serif',
          fontWeight: 700,
          fontSize: '1.25rem',
          letterSpacing: '0.02em',
          borderBottom: '1px solid rgba(26, 34, 64, 0.8)',
          padding: '16px 24px',
        },
      },
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          backgroundColor: '#0d1120',
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          '& .MuiTableCell-head': {
            backgroundColor: '#141928',
            color: '#5a6a8a',
            fontFamily: '"DM Sans", sans-serif',
            fontWeight: 600,
            fontSize: '0.7rem',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            borderBottom: '1px solid rgba(26, 34, 64, 0.8)',
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid rgba(26, 34, 64, 0.4)',
          padding: '12px 16px',
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          transition: 'background-color 0.1s ease',
          '&:hover': {
            backgroundColor: 'rgba(196, 241, 53, 0.03)',
          },
          '&:last-child .MuiTableCell-root': {
            borderBottom: 'none',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'rgba(26, 34, 64, 0.8)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(90, 106, 138, 0.5)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#c4f135',
            },
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#c4f135',
          },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          fontFamily: '"Barlow Condensed", sans-serif',
          fontWeight: 700,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: 'rgba(26, 34, 64, 0.8)',
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 6,
        },
      },
    },
  },
});

export default function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
