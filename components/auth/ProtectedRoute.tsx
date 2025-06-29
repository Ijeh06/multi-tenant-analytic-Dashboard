
import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import SignIn from '../../pages/SignIn';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <SignIn />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
