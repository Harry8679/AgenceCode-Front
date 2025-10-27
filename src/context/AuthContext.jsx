import { createContext, useContext, useEffect, useState } from "react";
import { getToken, isTokenExpired } from "../lib/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Hydrater immédiatement depuis localStorage pour éviter le flash au 1er render
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem("user");
      return raw ? JSON.parse(raw) : null;
    } catch { return null; }
  });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const tok = getToken();
      if (tok && !isTokenExpired(tok)) {
        // si token valide, on garde l'état (déjà lu ci-dessus)
      } else {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser(null);
      }
    } finally {
      setReady(true); // ✅ l’hydratation est terminée
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    if (userData?.token) localStorage.setItem("token", userData.token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, ready }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);