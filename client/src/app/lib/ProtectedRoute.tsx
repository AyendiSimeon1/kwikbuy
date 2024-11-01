import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '@/redux/userSlice';

const ProtectedRoute = () => {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />
};

const PublicRoute = () => {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    return !isAuthenticated ? <Outlet /> : <Navigate to="/dashboard" replace />
};

export { ProtectedRoute, PublicRoute };