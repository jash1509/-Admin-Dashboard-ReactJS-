import React from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Avatar,
  Typography,
  IconButton,
  Tooltip,
  useTheme,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchOffIcon from '@mui/icons-material/SearchOff';

/**
 * DataTable – Reusable users data table component.
 * Wrapped in React.memo to prevent unnecessary re-renders.
 *
 * Props:
 *   users    – Array of user objects { id, name, email, role, status, avatar }
 *   onEdit   – (id) => void
 *   onDelete – (id) => void
 */
const DataTable = ({ users, onEdit, onDelete }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const getStatusColor = (status) => {
    return status === 'Active' ? 'success' : 'default';
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'Admin':
        return { bg: '#6366f115', color: '#6366f1' };
      case 'Manager':
        return { bg: '#0ea5e915', color: '#0ea5e9' };
      case 'Editor':
        return { bg: '#f59e0b15', color: '#d97706' };
      default:
        return { bg: isDark ? '#ffffff10' : '#64748b15', color: '#64748b' };
    }
  };

  const getAvatarColor = (name) => {
    const colors = ['#6366f1', '#0ea5e9', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  if (users.length === 0) {
    return (
      <Paper
        elevation={0}
        sx={{
          py: 8,
          px: 2,
          textAlign: 'center',
          borderRadius: 3,
          border: `1px solid ${theme.palette.divider}`,
          bgcolor: 'background.paper',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <SearchOffIcon sx={{ fontSize: 48, color: 'text.secondary', opacity: 0.5 }} />
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
            No Users Found
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', maxWidth: 300, mx: 'auto' }}>
            We couldn't find any users matching your search or filters. Try adjusting your query or role selectors.
          </Typography>
        </Box>
      </Paper>
    );
  }

  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{
        borderRadius: 3,
        border: `1px solid ${theme.palette.divider}`,
        overflowX: 'auto',
        overflowY: 'hidden',
        bgcolor: 'background.paper',
      }}
    >
      <Table>
        <TableHead
          sx={{
            bgcolor: isDark ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.02)',
          }}
        >
          <TableRow>
            <TableCell sx={{ fontWeight: 700, fontSize: '0.8rem', color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              ID
            </TableCell>
            <TableCell sx={{ fontWeight: 700, fontSize: '0.8rem', color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Name
            </TableCell>
            <TableCell sx={{ fontWeight: 700, fontSize: '0.8rem', color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Email
            </TableCell>
            <TableCell sx={{ fontWeight: 700, fontSize: '0.8rem', color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Role
            </TableCell>
            <TableCell sx={{ fontWeight: 700, fontSize: '0.8rem', color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Status
            </TableCell>
            <TableCell
              align="center"
              sx={{ fontWeight: 700, fontSize: '0.8rem', color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.5px' }}
            >
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((userItem, index) => {
            const roleStyle = getRoleColor(userItem.role);
            const avatarColor = getAvatarColor(userItem.name);
            const initials = userItem.name
              .split(' ')
              .map((w) => w[0])
              .join('')
              .toUpperCase()
              .slice(0, 2);

            return (
              <TableRow
                key={userItem.id}
                sx={{
                  '&:hover': {
                    bgcolor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.01)',
                  },
                  borderBottom: `1px solid ${theme.palette.divider}`,
                  '&:last-child': { borderBottom: 'none' },
                }}
              >
                {/* ID */}
                <TableCell>
                  <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600, fontFamily: 'monospace' }}>
                    #{userItem.id}
                  </Typography>
                </TableCell>

                {/* Name + Avatar */}
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Avatar
                      sx={{
                        width: 36,
                        height: 36,
                        bgcolor: avatarColor,
                        fontSize: '0.8rem',
                        fontWeight: 700,
                      }}
                    >
                      {initials}
                    </Avatar>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {userItem.name}
                    </Typography>
                  </Box>
                </TableCell>

                {/* Email */}
                <TableCell>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {userItem.email}
                  </Typography>
                </TableCell>

                {/* Role */}
                <TableCell>
                  <Box
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      px: 1.25,
                      py: 0.5,
                      borderRadius: 1.5,
                      bgcolor: roleStyle.bg,
                      color: roleStyle.color,
                      fontWeight: 700,
                      fontSize: '0.75rem',
                    }}
                  >
                    {userItem.role}
                  </Box>
                </TableCell>

                {/* Status */}
                <TableCell>
                  <Chip
                    label={userItem.status}
                    color={getStatusColor(userItem.status)}
                    size="small"
                    sx={{
                      fontWeight: 600,
                      fontSize: '0.75rem',
                      height: 24,
                    }}
                  />
                </TableCell>

                {/* Actions */}
                <TableCell align="center">
                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.5 }}>
                    <Tooltip title="Edit User" arrow>
                      <IconButton
                        size="small"
                        onClick={() => onEdit(userItem.id)}
                        sx={{
                          color: 'primary.main',
                          '&:hover': { bgcolor: 'primary.main', color: '#fff' },
                          transition: 'all 0.2s',
                        }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete User" arrow>
                      <IconButton
                        size="small"
                        onClick={() => onDelete(userItem.id)}
                        sx={{
                          color: 'error.main',
                          '&:hover': { bgcolor: 'error.main', color: '#fff' },
                          transition: 'all 0.2s',
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default React.memo(DataTable);
