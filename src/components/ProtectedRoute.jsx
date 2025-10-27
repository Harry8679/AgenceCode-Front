import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
// ⬇️ idem : on importe depuis lib/api
import { getToken, isTokenExpired, hardLogoutAndRedirect } from "../lib/api";

export default function ProtectedRoute({ children }) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const token = getToken();

  if (!user || !token || isTokenExpired(token)) {
    // Nettoyage + redirection immédiate
    logout?.();
    hardLogoutAndRedirect();
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return children;
}
