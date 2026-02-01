import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Login from '../pages/Login';

const RequireAdmin = ({ children }) => {
  const { user, loading } = useSelector((state) => state.auth);

  if (loading) {
    return null; // Let global loaders handle; keeps UX consistent
  }

  // Not authenticated: show login inline
  if (!user) {
    return <Login />;
  }

  // Authenticated but not admin: send to normal dashboard
  const role = (user.role || 'user').toLowerCase();
  if (role !== 'admin') {
    return <Navigate to="/app" replace />;
  }

  // Admin: allow access
  return children;
};

export default RequireAdmin;
