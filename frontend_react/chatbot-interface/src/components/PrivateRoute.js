import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element }) => {
  const userId = sessionStorage.getItem('userId'); // Check if the user is authenticated

  if (!userId) {
    // If no user is found in session, redirect to the login page
    return <Navigate to="/login" />;
  }

  return element; // If authenticated, render the requested component
};

export default PrivateRoute;
