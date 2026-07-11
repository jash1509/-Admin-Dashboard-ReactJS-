import React, { useState, useContext, useMemo } from 'react';
import { BrowserRouter } from 'react-router-dom';
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Box,
} from '@mui/material';
import { AppProvider, AppContext } from './context/AppContext';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import AppRoutes from './routes/AppRoutes';

const DRAWER_WIDTH = 260;

function MainApp() {
  const { themeMode, user } = useContext(AppContext);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  // Memoize theme to prevent unnecessary MUI re-renders
  const theme = useMemo(() => {
    const isDark = themeMode === 'dark';
    return createTheme({
      palette: {
        mode: themeMode,
        primary: {
          main: '#0ea5e9',
          light: '#38bdf8',
          dark: '#0284c7',
        },
        secondary: {
          main: '#6366f1',
        },
        background: {
          default: isDark ? '#0b0f19' : '#f8fafc',
          paper: isDark ? '#111827' : '#ffffff',
        },
        text: {
          primary: isDark ? '#f3f4f6' : '#1e293b',
          secondary: isDark ? '#9ca3af' : '#64748b',
        },
        divider: isDark ? '#1f2937' : '#e2e8f0',
      },
      typography: {
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
        h1: { fontWeight: 800 },
        h2: { fontWeight: 800 },
        h3: { fontWeight: 700 },
        h4: { fontWeight: 700 },
        h5: { fontWeight: 600 },
        h6: { fontWeight: 600 },
        subtitle1: { fontWeight: 500 },
        subtitle2: { fontWeight: 500 },
        button: { textTransform: 'none', fontWeight: 600 },
      },
      shape: {
        borderRadius: 12,
      },
      components: {
        MuiButton: {
          styleOverrides: {
            root: {
              borderRadius: 8,
              boxShadow: 'none',
              '&:hover': { boxShadow: 'none' },
            },
          },
        },
        MuiCard: {
          styleOverrides: {
            root: { backgroundImage: 'none' },
          },
        },
        MuiTextField: {
          defaultProps: {
            size: 'small',
          },
        },
      },
    });
  }, [themeMode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        {/* Sidebar Navigation */}
        <Sidebar open={mobileOpen} onClose={handleDrawerToggle} user={user} />

        {/* Main Content Area */}
        <Box
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
            minHeight: '100vh',
          }}
        >
          {/* Top Header */}
          <Header onDrawerToggle={handleDrawerToggle} />

          {/* Page Content */}
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: { xs: 2, sm: 3, md: 4 },
              width: '100%',
              bgcolor: 'background.default',
            }}
          >
            <AppRoutes />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <MainApp />
      </BrowserRouter>
    </AppProvider>
  );
}
