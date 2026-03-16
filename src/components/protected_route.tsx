import { Navigate } from "react-router-dom";
import { check_is_admin_authenticated } from "@/functions/auth";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const is_authenticated = check_is_admin_authenticated();

  if (!is_authenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
