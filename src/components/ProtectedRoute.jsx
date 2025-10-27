import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getToken, isTokenExpired, hardLogoutAndRedirect } from "../lib/api";

export default function ProtectedRoute({ children }) {
  const { user, logout, ready } = useAuth();
  const location = useLocation();
  const token = getToken();

  // ⏳ Tant que l’auth n’est pas hydratée, on ne décide pas encore.
  if (!ready) return null; // ou un spinner si tu préfères

  if (!user || !token || isTokenExpired(token)) {
    logout?.();
    hardLogoutAndRedirect();
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return children;
}