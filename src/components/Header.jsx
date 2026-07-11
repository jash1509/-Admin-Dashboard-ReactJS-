import React, { useState, useContext, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Badge,
  Box,
  Menu,
  MenuItem,
  Avatar,
  Tooltip,
  useTheme,
  Divider,
  InputBase,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import SearchIcon from '@mui/icons-material/Search';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import { AppContext } from '../context/AppContext';

export default function Header({ onDrawerToggle }) {
  const theme = useTheme();
  const location = useLocation();
  const {
    notifications,
    themeMode,
    toggleTheme,
    user,
    markAllNotificationsRead,
    clearNotifications,
  } = useContext(AppContext);

  const [anchorEl, setAnchorEl] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const isDark = theme.palette.mode === 'dark';

  const handleOpenNotifications = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseNotifications = () => {
    setAnchorEl(null);
  };

  // useCallback for search handler – performance optimization
  const handleSearch = useCallback((e) => {
    setSearchValue(e.target.value);
  }, []);

  const unreadCount = notifications.filter((n) => n.unread).length;

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/' || path === '/dashboard') return 'Dashboard Overview';
    if (path === '/users') return 'User Management';
    if (path === '/settings') return 'Account & Settings';
    return 'Admin Control Panel';
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircleIcon sx={{ color: theme.palette.success.main }} />;
      case 'warning':
        return <WarningIcon sx={{ color: theme.palette.warning.main }} />;
      case 'danger':
        return <ErrorIcon sx={{ color: theme.palette.error.main }} />;
      default:
        return <InfoIcon sx={{ color: theme.palette.info.main }} />;
    }
  };

  const initials = user?.name
    ? user.name
        .split(' ')
        .map((w) => w[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : 'AD';

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        borderBottom: `1px solid ${theme.palette.divider}`,
        zIndex: theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, sm: 3 }, gap: 2 }}>
        {/* Left: Hamburger + Page Title */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexShrink: 0 }}>
          <IconButton
            color="inherit"
            edge="start"
            onClick={onDrawerToggle}
            sx={{ mr: 0.5, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="h1"
            sx={{ fontWeight: 700, fontSize: { xs: '1rem', sm: '1.2rem' }, whiteSpace: 'nowrap' }}
          >
            {getPageTitle()}
          </Typography>
        </Box>

        {/* Center: Search Box */}
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            alignItems: 'center',
            bgcolor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
            borderRadius: 2,
            px: 1.5,
            py: 0.5,
            gap: 1,
            flex: 1,
            maxWidth: 360,
            border: `1px solid ${theme.palette.divider}`,
            transition: 'border-color 0.2s',
            '&:focus-within': {
              borderColor: theme.palette.primary.main,
            },
          }}
        >
          <SearchIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
          <InputBase
            placeholder="Search users, settings..."
            value={searchValue}
            onChange={handleSearch}
            sx={{
              flex: 1,
              fontSize: '0.875rem',
              color: 'text.primary',
              '& input::placeholder': { color: 'text.secondary', opacity: 1 },
            }}
            inputProps={{ 'aria-label': 'search' }}
          />
        </Box>

        {/* Right: Actions */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 1 } }}>
          {/* Theme Toggle */}
          <Tooltip title={themeMode === 'light' ? 'Enable Dark Mode' : 'Enable Light Mode'}>
            <IconButton onClick={toggleTheme} color="inherit">
              {themeMode === 'light' ? (
                <DarkModeIcon />
              ) : (
                <LightModeIcon sx={{ color: '#fbbf24' }} />
              )}
            </IconButton>
          </Tooltip>

          {/* Notifications Trigger */}
          <Tooltip title="View Notifications">
            <IconButton color="inherit" onClick={handleOpenNotifications} id="notification-btn">
              <Badge badgeContent={unreadCount} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Tooltip>

          {/* Notification Dropdown */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleCloseNotifications}
            PaperProps={{
              sx: {
                width: 360,
                maxHeight: 480,
                mt: 1.5,
                borderRadius: 3,
                boxShadow: isDark
                  ? '0 10px 25px -5px rgba(0,0,0,0.5)'
                  : '0 10px 25px -5px rgba(15,23,42,0.1)',
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                Notifications {unreadCount > 0 && `(${unreadCount} new)`}
              </Typography>
              <Box sx={{ display: 'flex', gap: 0.5 }}>
                {notifications.length > 0 && (
                  <>
                    <Tooltip title="Mark all read">
                      <IconButton size="small" onClick={markAllNotificationsRead}>
                        <DoneAllIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Clear all">
                      <IconButton size="small" onClick={clearNotifications}>
                        <DeleteSweepIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </>
                )}
              </Box>
            </Box>
            <Divider />

            {notifications.length === 0 ? (
              <Box sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  No notifications yet.
                </Typography>
              </Box>
            ) : (
              <Box sx={{ overflowY: 'auto', maxHeight: 350 }}>
                {notifications.map((n) => (
                  <MenuItem
                    key={n.id}
                    onClick={handleCloseNotifications}
                    sx={{
                      py: 1.5,
                      px: 2,
                      borderBottom: `1px solid ${theme.palette.divider}`,
                      whiteSpace: 'normal',
                      bgcolor: n.unread
                        ? isDark
                          ? 'rgba(14,165,233,0.06)'
                          : 'rgba(14,165,233,0.04)'
                        : 'transparent',
                      '&:hover': { bgcolor: theme.palette.action.hover },
                    }}
                  >
                    <Box sx={{ display: 'flex', gap: 1.5, width: '100%' }}>
                      <Box sx={{ mt: 0.25 }}>{getNotificationIcon(n.type)}</Box>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography
                          variant="body2"
                          sx={{ fontWeight: n.unread ? 600 : 400, lineHeight: 1.4 }}
                        >
                          {n.text}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{ color: 'text.secondary', mt: 0.5, display: 'block' }}
                        >
                          {n.time}
                        </Typography>
                      </Box>
                    </Box>
                  </MenuItem>
                ))}
              </Box>
            )}
          </Menu>

          <Divider orientation="vertical" flexItem sx={{ my: 1.5, display: { xs: 'none', sm: 'block' } }} />

          {/* User Avatar + Name */}
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', gap: 1 }}>
            <Avatar
              sx={{
                width: 34,
                height: 34,
                bgcolor: theme.palette.primary.main,
                fontSize: '0.8rem',
                fontWeight: 700,
                border: `1.5px solid ${theme.palette.divider}`,
              }}
            >
              {initials}
            </Avatar>
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 600, lineHeight: 1.2 }}>
                {user?.name || 'Admin'}
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.7rem' }}>
                {user?.role || 'Administrator'}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
