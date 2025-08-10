import { useAuth } from '@/contexts/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';
import { UserType } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredUserType?: UserType;
  requireAuth?: boolean;
}

export default function ProtectedRoute({ 
  children, 
  requiredUserType, 
  requireAuth = true 
}: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Check if authentication is required
  if (requireAuth && (!user || !user.isAuthenticated)) {
    // Redirect to appropriate login page based on the current route
    const redirectPath = location.pathname.includes('farmer') ? '/farmer-login' : '/investor-login';
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  // Check user type authorization
  if (requiredUserType && user?.type !== requiredUserType) {
    // Redirect to the correct dashboard for the user's type
    const correctDashboard = user?.type === 'farmer' ? '/farmer-dashboard' : '/investor-dashboard';
    return <Navigate to={correctDashboard} replace />;
  }

  return <>{children}</>;
}
