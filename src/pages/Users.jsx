import React, { useContext, useState, useMemo, useCallback } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  Button,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Chip,
  MenuItem,
  Collapse,
  Alert,
  Snackbar,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import FilterListIcon from '@mui/icons-material/FilterList';

import { AppContext } from '../context/AppContext';
import DataTable from '../components/DataTable';
import UserForm from '../components/UserForm';

/**
 * Users page – lazy-loaded.
 * Manages users list, search, filtering, add/edit/delete operations.
 */
export default function Users() {
  const theme = useTheme();
  const { users, addUser, updateUser, deleteUser } = useContext(AppContext);

  // Local state
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null); // null = add mode
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const isDark = theme.palette.mode === 'dark';

  const ROLES = ['All', 'Admin', 'Manager', 'Editor', 'User'];
  const STATUSES = ['All', 'Active', 'Inactive'];

  // Memoized filtered users list
  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchesSearch =
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.role.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesRole = filterRole === 'All' || u.role === filterRole;
      const matchesStatus = filterStatus === 'All' || u.status === filterStatus;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, searchTerm, filterRole, filterStatus]);

  // useCallback for handlers
  const handleSearch = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  const handleAddClick = useCallback(() => {
    setEditingUser(null);
    setShowForm(true);
  }, []);

  const handleEdit = useCallback(
    (id) => {
      const target = users.find((u) => u.id === id);
      if (target) {
        setEditingUser(target);
        setShowForm(true);
        // Scroll to form
        setTimeout(() => {
          document.getElementById('user-form-section')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    },
    [users]
  );

  const handleDelete = useCallback((id) => {
    setDeleteConfirmId(id);
  }, []);

  const handleDeleteConfirm = useCallback(() => {
    if (deleteConfirmId) {
      deleteUser(deleteConfirmId);
      setDeleteConfirmId(null);
      setSnackbar({ open: true, message: 'User deleted successfully.', severity: 'warning' });
    }
  }, [deleteConfirmId, deleteUser]);

  const handleDeleteCancel = useCallback(() => {
    setDeleteConfirmId(null);
  }, []);

  const handleFormSubmit = useCallback(
    (data) => {
      if (editingUser) {
        updateUser(editingUser.id, data);
        setSnackbar({ open: true, message: `User "${data.name}" updated successfully.`, severity: 'success' });
      } else {
        addUser(data);
        setSnackbar({ open: true, message: `User "${data.name}" added successfully.`, severity: 'success' });
      }
      setShowForm(false);
      setEditingUser(null);
    },
    [editingUser, addUser, updateUser]
  );

  const handleFormCancel = useCallback(() => {
    setShowForm(false);
    setEditingUser(null);
  }, []);

  const handleSidebarClick = useCallback((role) => {
    setFilterRole(role);
  }, []);

  return (
    <Box>
      {/* Page Header */}
      <Box
        sx={{
          mb: 4,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 2,
        }}
      >
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5 }}>
            User Management
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            Add, edit, and manage all users in the system.
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<PersonAddIcon />}
          onClick={handleAddClick}
          id="add-user-btn"
          sx={{
            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
            boxShadow: '0 4px 14px rgba(14,165,233,0.3)',
          }}
        >
          Add User
        </Button>
      </Box>

      {/* Search + Filter Card */}
      <Card
        sx={{
          mb: 3,
          borderRadius: 3,
          border: `1px solid ${theme.palette.divider}`,
          boxShadow: 'none',
        }}
      >
        <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: 'center',
              gap: 2,
              flexWrap: 'wrap',
            }}
          >
            {/* Search */}
            <Box sx={{ flex: { xs: '1 1 100%', md: '2 1 0%' }, width: '100%' }}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search by name, email, or role..."
                value={searchTerm}
                onChange={handleSearch}
                id="user-search"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: 'text.secondary' }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            {/* Role Filter */}
            <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 0%' }, width: '100%' }}>
              <TextField
                select
                fullWidth
                label="Filter by Role"
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                id="role-filter"
              >
                {ROLES.map((r) => (
                  <MenuItem key={r} value={r}>
                    {r}
                  </MenuItem>
                ))}
              </TextField>
            </Box>

            {/* Status Filter */}
            <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 0%' }, width: '100%' }}>
              <TextField
                select
                fullWidth
                label="Filter by Status"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                id="status-filter"
              >
                {STATUSES.map((s) => (
                  <MenuItem key={s} value={s}>
                    {s}
                  </MenuItem>
                ))}
              </TextField>
            </Box>

            {/* Result count badge */}
            <Box sx={{ display: 'flex', justifyContent: { xs: 'flex-start', sm: 'center' }, flexShrink: 0 }}>
              <Chip
                label={`${filteredUsers.length} user${filteredUsers.length !== 1 ? 's' : ''}`}
                color="primary"
                variant="outlined"
                sx={{ fontWeight: 700, height: 40, px: 1, borderRadius: 2 }}
              />
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Users DataTable */}
      <DataTable users={filteredUsers} onEdit={handleEdit} onDelete={handleDelete} />

      {/* Add / Edit User Form */}
      <Collapse in={showForm} id="user-form-section">
        <Card
          sx={{
            mt: 4,
            borderRadius: 3,
            border: `2px solid ${theme.palette.primary.main}`,
            boxShadow: `0 0 0 4px ${theme.palette.primary.main}15`,
          }}
        >
          <CardContent sx={{ p: { xs: 2.5, sm: 4 } }}>
            <UserForm
              key={editingUser ? `edit-${editingUser.id}` : 'add'}
              onSubmit={handleFormSubmit}
              onCancel={handleFormCancel}
              mode={editingUser ? 'edit' : 'add'}
              defaultValues={
                editingUser
                  ? {
                      name: editingUser.name,
                      email: editingUser.email,
                      role: editingUser.role,
                      status: editingUser.status,
                    }
                  : null
              }
            />
          </CardContent>
        </Card>
      </Collapse>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={Boolean(deleteConfirmId)}
        onClose={handleDeleteCancel}
        PaperProps={{ sx: { borderRadius: 3 } }}
      >
        <DialogTitle sx={{ fontWeight: 700 }}>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this user? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 2.5, pt: 0 }}>
          <Button onClick={handleDeleteCancel} color="inherit" variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained" autoFocus>
            Delete User
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar Toast */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
          variant="filled"
          sx={{ borderRadius: 2 }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
