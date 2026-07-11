import React from 'react';
import {
  Card,
  CardContent,
  Box,
  Typography,
  useTheme,
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

/**
 * DashboardCard – Reusable metric card component.
 * Wrapped in React.memo to prevent unnecessary re-renders when parent re-renders.
 *
 * Props:
 *   title   – Card label text
 *   value   – Primary display value
 *   icon    – MUI icon element
 *   color   – Accent color string (hex / CSS)
 *   trend   – { value: number, label: string, isPositive: boolean } | null
 *   onClick – Optional click handler
 */
const DashboardCard = ({ title, value, icon, color = '#0ea5e9', trend = null, onClick }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Card
      onClick={onClick}
      sx={{
        borderRadius: 3,
        border: `1px solid ${theme.palette.divider}`,
        boxShadow: 'none',
        position: 'relative',
        overflow: 'hidden',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        '&:hover': onClick
          ? {
              transform: 'translateY(-2px)',
              boxShadow: `0 8px 24px ${color}22`,
            }
          : {},
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: color,
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        {/* Top row: title + icon */}
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 600,
              color: 'text.secondary',
              textTransform: 'uppercase',
              fontSize: '0.7rem',
              letterSpacing: '0.8px',
            }}
          >
            {title}
          </Typography>
          <Box
            sx={{
              width: 42,
              height: 42,
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: `${color}18`,
              color,
              flexShrink: 0,
            }}
          >
            {icon}
          </Box>
        </Box>

        {/* Main value */}
        <Typography
          variant="h4"
          sx={{
            fontWeight: 800,
            color: 'text.primary',
            lineHeight: 1,
            mb: trend ? 1.5 : 0,
          }}
        >
          {value}
        </Typography>

        {/* Trend indicator */}
        {trend && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            {trend.isPositive ? (
              <TrendingUpIcon sx={{ fontSize: 16, color: '#10b981' }} />
            ) : (
              <TrendingDownIcon sx={{ fontSize: 16, color: '#ef4444' }} />
            )}
            <Typography
              variant="caption"
              sx={{
                fontWeight: 600,
                color: trend.isPositive ? '#10b981' : '#ef4444',
              }}
            >
              {typeof trend.value === 'number' && !String(trend.value).includes('%')
                ? `${trend.isPositive ? '+' : ''}${trend.value}`
                : trend.value}
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              &nbsp;{trend.label}
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default React.memo(DashboardCard);
