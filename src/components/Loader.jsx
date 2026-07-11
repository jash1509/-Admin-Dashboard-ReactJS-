import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

/**
 * Loader – Suspense fallback spinner.
 * Wrapped in React.memo to prevent unnecessary re-renders.
 */
const Loader = ({ message = 'Loading...' }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        width: '100%',
        gap: 2,
      }}
    >
      <CircularProgress
        size={48}
        thickness={4}
        sx={{
          color: 'primary.main',
          animationDuration: '700ms',
        }}
      />
      <Typography
        variant="body2"
        sx={{
          color: 'text.secondary',
          fontWeight: 500,
          letterSpacing: '0.5px',
        }}
      >
        {message}
      </Typography>
    </Box>
  );
};

export default React.memo(Loader);
