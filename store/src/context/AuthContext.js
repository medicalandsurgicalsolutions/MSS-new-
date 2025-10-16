import { createContext, useContext, useEffect, useState } from "react";
import { setToken } from "@services/httpServices";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Check localStorage on client-side
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token); // set Axios header
      setUser({ token });
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
