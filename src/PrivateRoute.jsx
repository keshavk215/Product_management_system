import React from 'react';
import { useAuth } from './AuthContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element }) => {
    const { token } = useAuth();

    // If the user is not authenticated, navigate to the login page
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // If authenticated, render the element
    return element; 
};

export default ProtectedRoute;
