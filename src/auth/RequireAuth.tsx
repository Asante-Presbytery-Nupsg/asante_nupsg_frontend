import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAdmin = ({ children }: { children: React.ReactNode }) => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center space-y-4">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-blue-300"></div>
          <div className="absolute inset-0 rounded-full border-4 border-t-blue-700 animate-spin"></div>
        </div>
        <p className="text-gray-600 text-lg font-medium animate-pulse">
          Loading, please wait...
        </p>
      </div>
    );
  }
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (user.role !== "Admin") {
    console.warn("Access denied: Invalid role", user.role);
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

export default RequireAdmin;
