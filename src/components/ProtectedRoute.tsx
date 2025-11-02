import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { UserType } from '../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedTypes?: UserType[];
}

export function ProtectedRoute({ children, allowedTypes }: ProtectedRouteProps) {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedTypes && user && !allowedTypes.includes(user.type)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
}
