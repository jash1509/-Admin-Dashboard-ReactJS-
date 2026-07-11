import React, { useContext, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Card,
  CardContent,
  useTheme,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Button,
  Avatar,
  Chip,
} from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import InfoIcon from '@mui/icons-material/Info';
import ErrorIcon from '@mui/icons-material/Error';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ListAltIcon from '@mui/icons-material/ListAlt';

import { AppContext } from '../context/AppContext';
import DashboardCard from '../components/DashboardCard';

export default function Dashboard() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { users, notifications } = useContext(AppContext);
  const isDark = theme.palette.mode === 'dark';

  // Memoize analytics calculations to optimize performance
  const stats = useMemo(() => {
    const totalUsers = users.length;
    const activeUsers = users.filter((u) => u.status === 'Active').length;
    const inactiveUsers = users.filter((u) => u.status === 'Inactive').length;

    // Role distribution
    const roleMap = {};
    users.forEach((u) => {
      roleMap[u.role] = (roleMap[u.role] || 0) + 1;
    });

    const roleBreakdown = Object.entries(roleMap)
      .map(([role, count]) => ({ role, count }))
      .sort((a, b) => b.count - a.count);

    return {
      totalUsers,
      activeUsers,
      inactiveUsers,
      roleBreakdown,
      orders: 1284, // Simulated
      revenue: 48500, // Simulated
    };
  }, [users]);

  // useCallback for navigation handlers – performance optimization
  const handleNavigateUsers = useCallback(() => {
    navigate('/users');
  }, [navigate]);

  const handleNavigateAddUser = useCallback(() => {
    navigate('/users');
  }, [navigate]);

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircleIcon sx={{ color: theme.palette.success.main }} />;
      case 'warning':
        return <WarningAmberIcon sx={{ color: theme.palette.warning.main }} />;
      case 'danger':
        return <ErrorIcon sx={{ color: theme.palette.error.main }} />;
      default:
        return <InfoIcon sx={{ color: theme.palette.info.main }} />;
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'Admin': return '#6366f1';
      case 'Manager': return '#0ea5e9';
      case 'Editor': return '#f59e0b';
      default: return '#64748b';
    }
  };

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
            Welcome back! 👋
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            Here's what's happening in your admin panel today.
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<ListAltIcon />}
            onClick={handleNavigateUsers}
            sx={{ borderColor: theme.palette.divider }}
          >
            View Users
          </Button>
          <Button
            variant="contained"
            startIcon={<PersonAddIcon />}
            onClick={handleNavigateAddUser}
            sx={{
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
              boxShadow: '0 4px 14px rgba(14,165,233,0.3)',
            }}
          >
            Add User
          </Button>
        </Box>
      </Box>

      {/* Dashboard Cards Grid */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          flexWrap: 'wrap',
          gap: 3,
          mb: 4,
        }}
      >
        <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)', md: '1 1 calc(25% - 18px)' } }}>
          <DashboardCard
            title="Total Users"
            value={stats.totalUsers}
            icon={<PeopleIcon sx={{ fontSize: 22 }} />}
            color="#6366f1"
            onClick={handleNavigateUsers}
            trend={{ value: '+12', label: 'vs last month', isPositive: true }}
          />
        </Box>
        <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)', md: '1 1 calc(25% - 18px)' } }}>
          <DashboardCard
            title="Active Users"
            value={stats.activeUsers}
            icon={<PersonIcon sx={{ fontSize: 22 }} />}
            color="#10b981"
            onClick={handleNavigateUsers}
            trend={{
              value: `${Math.round((stats.activeUsers / stats.totalUsers) * 100)}%`,
              label: 'active rate',
              isPositive: true,
            }}
          />
        </Box>
        <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)', md: '1 1 calc(25% - 18px)' } }}>
          <DashboardCard
            title="Orders"
            value={stats.orders.toLocaleString()}
            icon={<ShoppingCartIcon sx={{ fontSize: 22 }} />}
            color="#f59e0b"
            trend={{ value: '+5.2%', label: 'vs last week', isPositive: true }}
          />
        </Box>
        <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)', md: '1 1 calc(25% - 18px)' } }}>
          <DashboardCard
            title="Revenue"
            value={`$${stats.revenue.toLocaleString()}`}
            icon={<AttachMoneyIcon sx={{ fontSize: 22 }} />}
            color="#0ea5e9"
            trend={{ value: '+8.4%', label: 'vs last quarter', isPositive: true }}
          />
        </Box>
      </Box>

      {/* Bottom Section */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 3,
        }}
      >
        {/* Users List Preview */}
        <Box sx={{ flex: { xs: '1 1 100%', md: '7 1 0%' }, width: '100%', minWidth: 0 }}>
          <Card
            sx={{
              height: '100%',
              borderRadius: 4,
              border: `1px solid ${theme.palette.divider}`,
              boxShadow: 'none',
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Recent Users
                </Typography>
                <Button
                  variant="text"
                  size="small"
                  onClick={handleNavigateUsers}
                  sx={{ fontWeight: 600, color: 'primary.main' }}
                >
                  View All →
                </Button>
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {users.slice(0, 5).map((u) => {
                  const initials = u.name
                    .split(' ')
                    .map((w) => w[0])
                    .join('')
                    .toUpperCase()
                    .slice(0, 2);
                  const colors = ['#6366f1', '#0ea5e9', '#10b981', '#f59e0b', '#ef4444'];
                  let hash = 0;
                  for (let i = 0; i < u.name.length; i++) {
                    hash = u.name.charCodeAt(i) + ((hash << 5) - hash);
                  }
                  const avatarColor = colors[Math.abs(hash) % colors.length];

                  return (
                    <Box
                      key={u.id}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.5,
                        p: 1.5,
                        borderRadius: 2,
                        border: `1px solid ${theme.palette.divider}`,
                        bgcolor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.01)',
                      }}
                    >
                      <Avatar sx={{ width: 38, height: 38, bgcolor: avatarColor, fontSize: '0.8rem', fontWeight: 700 }}>
                        {initials}
                      </Avatar>
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography variant="body2" sx={{ fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {u.name}
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                          {u.email}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', flexShrink: 0 }}>
                        <Box
                          sx={{
                            px: 1,
                            py: 0.25,
                            borderRadius: 1,
                            bgcolor: `${getRoleColor(u.role)}15`,
                            color: getRoleColor(u.role),
                            fontSize: '0.7rem',
                            fontWeight: 700,
                          }}
                        >
                          {u.role}
                        </Box>
                        <Chip
                          label={u.status}
                          size="small"
                          color={u.status === 'Active' ? 'success' : 'default'}
                          sx={{ height: 20, fontSize: '0.65rem', fontWeight: 700 }}
                        />
                      </Box>
                    </Box>
                  );
                })}
              </Box>
            </CardContent>
          </Card>
        </Box>

        {/* Role Breakdown + Notifications */}
        <Box sx={{ flex: { xs: '1 1 100%', md: '5 1 0%' }, width: '100%', minWidth: 0 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, height: '100%' }}>
            {/* Role distribution */}
            <Card
              sx={{
                borderRadius: 4,
                border: `1px solid ${theme.palette.divider}`,
                boxShadow: 'none',
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2.5 }}>
                  Role Distribution
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {stats.roleBreakdown.map(({ role, count }) => {
                    const pct = Math.round((count / stats.totalUsers) * 100);
                    return (
                      <Box key={role}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.75 }}>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {role}
                          </Typography>
                          <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                            {count} ({pct}%)
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            height: 7,
                            borderRadius: 4,
                            bgcolor: isDark ? '#1f2937' : '#f1f5f9',
                            overflow: 'hidden',
                          }}
                        >
                          <Box
                            sx={{
                              height: '100%',
                              width: `${pct}%`,
                              borderRadius: 4,
                              background: `linear-gradient(90deg, ${getRoleColor(role)}, ${getRoleColor(role)}99)`,
                              transition: 'width 0.6s ease',
                            }}
                          />
                        </Box>
                      </Box>
                    );
                  })}
                </Box>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card
              sx={{
                flex: 1,
                borderRadius: 4,
                border: `1px solid ${theme.palette.divider}`,
                boxShadow: 'none',
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                  Recent Activity
                </Typography>
                {notifications.length === 0 ? (
                  <Box sx={{ py: 3, textAlign: 'center' }}>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      No recent activity.
                    </Typography>
                  </Box>
                ) : (
                  <List disablePadding>
                    {notifications.slice(0, 3).map((log, idx) => (
                      <React.Fragment key={log.id}>
                        <ListItem alignItems="flex-start" sx={{ px: 0, py: 1.25 }}>
                          <ListItemIcon sx={{ minWidth: 38, mt: 0.5 }}>
                            {getNotificationIcon(log.type)}
                          </ListItemIcon>
                          <ListItemText
                            primary={log.text}
                            primaryTypographyProps={{ variant: 'body2', fontWeight: 500, lineHeight: 1.4 }}
                            secondary={log.time}
                            secondaryTypographyProps={{ variant: 'caption', sx: { mt: 0.5, display: 'block' } }}
                          />
                        </ListItem>
                        {idx < Math.min(2, notifications.length - 1) && <Divider component="li" />}
                      </React.Fragment>
                    ))}
                  </List>
                )}
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
