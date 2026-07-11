import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Typography,
  Divider,
  useTheme,
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

const ROLES = ['Admin', 'Manager', 'Editor', 'User'];
const STATUSES = ['Active', 'Inactive'];

/**
 * UserForm – Add/Edit user form using React Hook Form.
 * Wrapped in React.memo to prevent unnecessary re-renders.
 *
 * Props:
 *   onSubmit     – (data) => void  called with validated form data
 *   onCancel     – () => void
 *   defaultValues – pre-filled values when editing (optional)
 *   mode          – 'add' | 'edit'
 */
const UserForm = ({ onSubmit, onCancel, defaultValues = null, mode = 'add' }) => {
  const theme = useTheme();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: defaultValues || {
      name: '',
      email: '',
      role: '',
      status: 'Active',
    },
  });

  const handleFormSubmit = (data) => {
    onSubmit(data);
    if (mode === 'add') reset();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(handleFormSubmit)}
      noValidate
    >
      {/* Form Title */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
        <PersonAddIcon color="primary" />
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          {mode === 'edit' ? 'Edit User Details' : 'Add New User'}
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
        {/* Row 1: Name and Email */}
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2.5 }}>
          {/* Name Field */}
          <Box sx={{ flex: 1 }}>
            <TextField
              fullWidth
              label="Full Name"
              id="user-name"
              variant="outlined"
              error={Boolean(errors.name)}
              helperText={errors.name?.message}
              {...register('name', {
                required: 'Name is required',
                minLength: {
                  value: 2,
                  message: 'Name must be at least 2 characters',
                },
              })}
            />
          </Box>

          {/* Email Field */}
          <Box sx={{ flex: 1 }}>
            <TextField
              fullWidth
              label="Email Address"
              id="user-email"
              type="email"
              variant="outlined"
              error={Boolean(errors.email)}
              helperText={errors.email?.message}
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Please enter a valid email address',
                },
              })}
            />
          </Box>
        </Box>

        {/* Row 2: Role and Status */}
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2.5 }}>
          {/* Role Dropdown */}
          <Box sx={{ flex: 1 }}>
            <Controller
              name="role"
              control={control}
              rules={{ required: 'Role is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  fullWidth
                  label="Role"
                  id="user-role"
                  variant="outlined"
                  error={Boolean(errors.role)}
                  helperText={errors.role?.message}
                >
                  <MenuItem value="" disabled>
                    <em>Select a role</em>
                  </MenuItem>
                  {ROLES.map((role) => (
                    <MenuItem key={role} value={role}>
                      {role}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Box>

          {/* Status Dropdown */}
          <Box sx={{ flex: 1 }}>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  fullWidth
                  label="Status"
                  id="user-status"
                  variant="outlined"
                  error={Boolean(errors.status)}
                  helperText={errors.status?.message}
                >
                  {STATUSES.map((s) => (
                    <MenuItem key={s} value={s}>
                      {s}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Box>
        </Box>

        {/* Action Buttons */}
        <Box sx={{ width: '100%' }}>
          <Divider sx={{ mb: 2.5 }} />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button
              variant="outlined"
              color="inherit"
              startIcon={<CancelIcon />}
              onClick={onCancel}
              sx={{ color: 'text.secondary' }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={isSubmitting}
              startIcon={<SaveIcon />}
              sx={{
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                boxShadow: '0 4px 14px rgba(14,165,233,0.3)',
                px: 3,
              }}
            >
              {mode === 'edit' ? 'Save Changes' : 'Add User'}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default React.memo(UserForm);
