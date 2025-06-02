// components/RequireAuth.js
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const RequireAuth = ({ children }) => {
  const user = useSelector((state) => state.user);
  const location = useLocation();

  const isAuthenticated = Boolean(user?.firstName);

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;
