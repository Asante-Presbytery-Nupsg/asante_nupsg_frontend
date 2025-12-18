import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

interface RequireAdminProps {
  children: React.ReactNode;
}

const RequireAdmin = ({ children }: RequireAdminProps) => {
  const { user, isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading || (isAuthenticated && !user)) {
    return <div className="p-6">Loading Dashboard...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const roleName = user?.role;

  if (roleName !== "Admin") {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

export default RequireAdmin;
