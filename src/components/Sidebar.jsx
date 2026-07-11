import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  Avatar,
  IconButton,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const DRAWER_WIDTH = 260;

/**
 * Sidebar – Fixed navigation drawer.
 * Wrapped in React.memo to avoid re-renders when parent theme state changes.
 */
const Sidebar = ({ open, onClose, user }) => {
  const theme = useTheme();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'Users', icon: <PeopleIcon />, path: '/users' },
    { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
  ];

  const initials = user?.name
    ? user.name
        .split(' ')
        .map((w) => w[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : 'AD';

  const drawerContent = (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: theme.palette.mode === 'dark' ? '#0f172a' : '#1e293b',
        color: '#f8fafc',
      }}
    >
      {/* Brand Logo */}
      <Box
        sx={{
          p: 2.5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(255,255,255,0.03)',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <AdminPanelSettingsIcon sx={{ fontSize: 32, color: theme.palette.primary.light }} />
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              letterSpacing: '0.5px',
              background: `linear-gradient(45deg, #38bdf8, ${theme.palette.primary.light})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            AdminPanel
          </Typography>
        </Box>
        {isMobile && (
          <IconButton onClick={onClose} sx={{ color: '#94a3b8' }}>
            <ChevronLeftIcon />
          </IconButton>
        )}
      </Box>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)' }} />

      {/* Section Label */}
      <Box sx={{ px: 3, pt: 3, pb: 1 }}>
        <Typography
          variant="caption"
          sx={{ color: '#475569', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', fontSize: '0.65rem' }}
        >
          Navigation
        </Typography>
      </Box>

      {/* Nav Menu */}
      <Box sx={{ flexGrow: 1, px: 2, pb: 3 }}>
        <List sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <ListItem key={item.text} disablePadding>
                <ListItemButton
                  component={NavLink}
                  to={item.path}
                  onClick={isMobile ? onClose : undefined}
                  sx={{
                    borderRadius: 2,
                    py: 1.25,
                    px: 2,
                    color: isActive ? '#fff' : '#94a3b8',
                    bgcolor: isActive ? 'primary.main' : 'transparent',
                    boxShadow: isActive ? '0 4px 12px rgba(14, 165, 233, 0.3)' : 'none',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      bgcolor: isActive ? 'primary.main' : 'rgba(255,255,255,0.06)',
                      color: '#fff',
                      '& .MuiListItemIcon-root': { color: '#fff' },
                    },
                    '& .MuiListItemIcon-root': {
                      color: isActive ? '#fff' : '#94a3b8',
                      minWidth: 40,
                      transition: 'color 0.2s',
                    },
                  }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{
                      fontSize: '0.95rem',
                      fontWeight: isActive ? 700 : 500,
                    }}
                  />
                  {isActive && (
                    <Box
                      sx={{
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        bgcolor: '#fff',
                        opacity: 0.8,
                        ml: 1,
                      }}
                    />
                  )}
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)' }} />

      {/* User Footer Profile */}
      <Box
        sx={{
          p: 2.5,
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          background: 'rgba(0,0,0,0.1)',
        }}
      >
        <Avatar
          sx={{
            width: 40,
            height: 40,
            bgcolor: theme.palette.primary.main,
            fontSize: '0.85rem',
            fontWeight: 700,
            border: '2px solid rgba(255,255,255,0.1)',
          }}
        >
          {initials}
        </Avatar>
        <Box sx={{ overflow: 'hidden', flex: 1 }}>
          <Typography
            variant="subtitle2"
            sx={{ fontWeight: 600, color: '#f8fafc', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
          >
            {user?.name || 'Administrator'}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: '#94a3b8', fontSize: '0.75rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
          >
            {user?.role || 'Admin'}
          </Typography>
        </Box>
      </Box>
    </Box>
  );

  return (
    <Box component="nav" sx={{ width: { md: DRAWER_WIDTH }, flexShrink: { md: 0 } }}>
      {/* Mobile Drawer */}
      {isMobile ? (
        <Drawer
          variant="temporary"
          open={open}
          onClose={onClose}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH, border: 'none' },
          }}
        >
          {drawerContent}
        </Drawer>
      ) : (
        /* Desktop Drawer */
        <Drawer
          variant="permanent"
          open
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH, border: 'none' },
          }}
        >
          {drawerContent}
        </Drawer>
      )}
    </Box>
  );
};

export default React.memo(Sidebar);
