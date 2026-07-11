import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Grid,
  Avatar,
  Divider,
  useTheme,
  Alert,
  Switch,
  FormControlLabel,
  Chip,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import PersonIcon from '@mui/icons-material/Person';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { AppContext } from '../context/AppContext';

export default function Settings() {
  const theme = useTheme();
  const { user, setUser, addNotification, themeMode, toggleTheme } = useContext(AppContext);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      role: '',
    },
  });

  // Pre-populate form with current user data
  useEffect(() => {
    reset({
      name: user.name,
      email: user.email,
      role: user.role,
    });
  }, [user, reset]);

  const watchedName = watch('name');
  const watchedRole = watch('role');

  const onSubmit = (data) => {
    setUser({
      ...user,
      name: data.name,
      role: data.role,
      email: data.email,
    });
    addNotification('success', 'Profile settings updated successfully.');
  };

  const initials = (watchedName || user.name || 'AD')
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const isDark = theme.palette.mode === 'dark';

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto' }}>
      {/* Page Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5 }}>
          Account & System Settings
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          Configure your administrator profile and application preferences.
        </Typography>
      </Box>

      {isSubmitSuccessful && (
        <Alert severity="success" sx={{ mb: 3, borderRadius: 2 }}>
          Your settings have been saved successfully!
        </Alert>
      )}

      {/* Main Settings Layout using Flexbox instead of legacy Grid to bypass React 19 layout bugs */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 3,
          alignItems: 'flex-start',
        }}
      >
        {/* Profile Preview Card */}
        <Box
          sx={{
            width: { xs: '100%', md: '300px' },
            flexShrink: 0,
            position: { md: 'sticky' },
            top: 80,
          }}
        >
          <Card
            sx={{
              borderRadius: 4,
              border: `1px solid ${theme.palette.divider}`,
              boxShadow: 'none',
              textAlign: 'center',
              py: 4,
              px: 2,
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
              <Avatar
                sx={{
                  width: 100,
                  height: 100,
                  bgcolor: theme.palette.primary.main,
                  fontSize: '2rem',
                  fontWeight: 700,
                  boxShadow: '0 8px 16px rgba(14,165,233,0.25)',
                  border: `3px solid ${theme.palette.background.paper}`,
                  outline: `3px solid ${theme.palette.primary.main}`,
                }}
              >
                {initials}
              </Avatar>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  {watchedName || user.name}
                </Typography>
                <Chip
                  label={watchedRole || user.role}
                  size="small"
                  color="primary"
                  variant="outlined"
                  sx={{ mt: 0.75, fontWeight: 600 }}
                />
                <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mt: 1 }}>
                  {user.email}
                </Typography>
              </Box>
            </Box>

            {/* Theme Toggle in Card */}
            <Divider sx={{ my: 3 }} />
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5 }}>
              <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.secondary' }}>
                Appearance
              </Typography>
              <Button
                variant="outlined"
                startIcon={isDark ? <LightModeIcon /> : <DarkModeIcon />}
                onClick={toggleTheme}
                size="small"
                sx={{ borderRadius: 2, fontWeight: 600 }}
              >
                {isDark ? 'Light Mode' : 'Dark Mode'}
              </Button>
            </Box>
          </Card>
        </Box>

        {/* Settings Form Card */}
        <Box sx={{ flexGrow: 1, width: '100%', minWidth: 0 }}>
          <Card
            sx={{
              borderRadius: 4,
              border: `1px solid ${theme.palette.divider}`,
              boxShadow: 'none',
            }}
          >
            <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
              <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
                {/* Profile Section */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                  <PersonIcon color="primary" />
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    Administrator Profile
                  </Typography>
                </Box>

                {/* Form fields inline wrapper */}
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    gap: 2.5,
                    mb: 3,
                  }}
                >
                  {/* Name */}
                  <Box sx={{ flex: 1 }}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      id="settings-name"
                      error={Boolean(errors.name)}
                      helperText={errors.name?.message}
                      {...register('name', { required: 'Name is required' })}
                    />
                  </Box>

                  {/* Role / Title */}
                  <Box sx={{ flex: 1 }}>
                    <TextField
                      fullWidth
                      label="Job Title / Role"
                      id="settings-role"
                      error={Boolean(errors.role)}
                      helperText={errors.role?.message}
                      {...register('role', { required: 'Role is required' })}
                    />
                  </Box>

                  {/* Email */}
                  <Box sx={{ flex: 1.5 }}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      id="settings-email"
                      type="email"
                      error={Boolean(errors.email)}
                      helperText={errors.email?.message}
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address',
                        },
                      })}
                    />
                  </Box>
                </Box>

                <Divider sx={{ my: 4 }} />

                {/* System Settings Section */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                  <SettingsSuggestIcon color="primary" />
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    System Preferences
                  </Typography>
                </Box>

                {/* Preferences items side-by-side */}
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    gap: 2.5,
                  }}
                >
                  <Card
                    variant="outlined"
                    sx={{ flex: 1, borderRadius: 2, border: `1px solid ${theme.palette.divider}` }}
                  >
                    <CardContent sx={{ p: 2.5 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            Dark Mode
                          </Typography>
                          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                            Toggle between light and dark themes.
                          </Typography>
                        </Box>
                        <Switch
                          checked={isDark}
                          onChange={toggleTheme}
                          color="primary"
                        />
                      </Box>
                    </CardContent>
                  </Card>

                  <Card
                    variant="outlined"
                    sx={{ flex: 1, borderRadius: 2, border: `1px solid ${theme.palette.divider}` }}
                  >
                    <CardContent sx={{ p: 2.5 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            Email Notifications
                          </Typography>
                          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                            Receive activity alerts via email.
                          </Typography>
                        </Box>
                        <Switch defaultChecked color="primary" />
                      </Box>
                    </CardContent>
                  </Card>
                </Box>

                {/* Save Button */}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    startIcon={<SaveIcon />}
                    sx={{
                      background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                      boxShadow: '0 4px 14px rgba(14,165,233,0.3)',
                      px: 4,
                    }}
                  >
                    Save Settings
                  </Button>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
}
