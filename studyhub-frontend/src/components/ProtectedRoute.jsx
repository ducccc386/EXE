/**
 * components/ProtectedRoute.jsx
 * Guard route theo role. Dùng STORAGE_KEYS constant thay vì hardcode string.
 */
import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../services/authService";
import { ROUTES } from "../constants";

export default function ProtectedRoute({ children, allowedRoles }) {
  const user = getCurrentUser();

  if (!user) return <Navigate to={ROUTES.LOGIN} replace />;

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  return children;
}
