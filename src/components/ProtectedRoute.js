
// src/components/ProtectedRoute.js
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';

const ProtectedRoute = ({ children, adminOnly }) => {
  const { isAuthenticated, isAdmin } = useContext(AuthContext);
  

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/" />; // Redirect non-admins to home
  }

  return children;
};

export default ProtectedRoute;
