import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { authService } from '../../services/authService';
import type { UserRole } from '../../types/auth';

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: UserRole[];
}

function ProtectedRoute({
  children,
  allowedRoles,
}: ProtectedRouteProps) {
  const user = authService.getCurrentUser();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return (
      <Navigate
        to={authService.getHomePath(user.role)}
        replace
      />
    );
  }

  return children;
}

export default ProtectedRoute;