import { createContext, useContext, useEffect, useState } from "react";
// ⬇️ on importe depuis lib/api
import { getToken, isTokenExpired } from "../lib/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("user");
      const tok = getToken();
      if (raw && tok && !isTokenExpired(tok)) {
        setUser(JSON.parse(raw));
      } else {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    } catch {}
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
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);