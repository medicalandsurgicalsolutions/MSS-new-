import { createContext, useContext, useEffect, useState } from "react";
import { setToken } from "@services/httpServices";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // ✅ On app load, check if token exists in localStorage
  useEffect(() => {
    const token = localStorage.getItem("mss_token"); // match with login
    if (token) {
      setToken(token); // set Axios header globally
      setUser({ token }); // update user state
    }
  }, []);

  // ✅ Logout function
  const logout = () => {
    localStorage.removeItem("mss_token");
    setUser(null);
    setToken(null); // remove Axios header
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Hook to use auth anywhere
export const useAuth = () => useContext(AuthContext);
