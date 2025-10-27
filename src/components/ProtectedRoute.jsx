// src/components/ProtectedRoute.jsx
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getToken, isTokenExpired, hardLogoutAndRedirect } from "../lib/auth";

export default function ProtectedRoute({ children }) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const token = getToken();

  if (!user || !token || isTokenExpired(token)) {
    // Nettoyage état + redirect
    logout?.();
    hardLogoutAndRedirect();
    return <Navigate to="/" replace state={{ from: location }} />;
  }
  return children;
}