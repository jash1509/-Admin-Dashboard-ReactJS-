import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Loader from '../components/Loader';

// Lazy-loaded pages for code splitting
const Users = React.lazy(() => import('../pages/Users'));
const Settings = React.lazy(() => import('../pages/Settings'));

/**
 * AppRoutes – Central routing configuration.
 * Users and Settings pages are lazy-loaded with Suspense.
 */
export default function AppRoutes() {
  return (
    <Routes>
      {/* Redirect root to /dashboard */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* Dashboard – eagerly loaded as main entry page */}
      <Route path="/dashboard" element={<Dashboard />} />

      {/* Users – lazy loaded with Suspense */}
      <Route
        path="/users"
        element={
          <Suspense fallback={<Loader message="Loading Users..." />}>
            <Users />
          </Suspense>
        }
      />

      {/* Settings – lazy loaded with Suspense */}
      <Route
        path="/settings"
        element={
          <Suspense fallback={<Loader message="Loading Settings..." />}>
            <Settings />
          </Suspense>
        }
      />

      {/* Fallback redirect */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
