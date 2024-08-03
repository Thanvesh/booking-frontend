// src/App.js
import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PropertyPage from './pages/PropertyPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import FavoritesPage from './pages/FavoritesPage';
import UserProfilePage from './pages/UserProfilePage';
import AdminDashboard from './components/admin/AdminDashboard';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ForgotPassword from './components/auth/ForgotPassword';
import ResetPassword from './components/auth/ResetPassword';
import OrdersPage from './pages/OrdersPage';
import Header from './components/Header';
import AdminHeader from './components/AdminHeader';
import { AuthProvider } from './contexts/AuthContext';
import AuthContext from './contexts/AuthContext';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
};

const AppContent = () => {
  const { isAuthenticated, isAdmin } = useContext(AuthContext);

  return (
    <>
      {isAuthenticated && (isAdmin ? <AdminHeader /> : <Header />)}
      <Routes>
        <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to={isAdmin ? '/admin' : '/'} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* Protected Routes for Non-Admins */}
        <Route path="/" element={isAuthenticated && !isAdmin ? <HomePage /> : <Navigate to={isAdmin ? '/admin' : '/login'} />} />
        <Route path="/properties/:id" element={isAuthenticated && !isAdmin ? <PropertyPage /> : <Navigate to={isAdmin ? '/admin' : '/login'} />} />
        <Route path="/cart" element={isAuthenticated && !isAdmin ? <CartPage /> : <Navigate to={isAdmin ? '/admin' : '/login'} />} />
        <Route path="/orders" element={isAuthenticated && !isAdmin ? <OrdersPage /> : <Navigate to={isAdmin ? '/admin' : '/login'} />} />
        <Route path="/checkout" element={isAuthenticated && !isAdmin ? <CheckoutPage /> : <Navigate to={isAdmin ? '/admin' : '/login'} />} />
        <Route path="/favorites" element={isAuthenticated && !isAdmin ? <FavoritesPage /> : <Navigate to={isAdmin ? '/admin' : '/login'} />} />
        <Route path="/profile" element={isAuthenticated ? <UserProfilePage /> : <Navigate to="/login" />} />

        {/* Protected Route for Admins */}
        <Route path="/admin" element={isAuthenticated && isAdmin ? <AdminDashboard /> : <Navigate to={isAuthenticated ? '/' : '/login'} />} />
      </Routes>
    </>
  );
};

export default App;
