import { createContext, useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(() => {
    if (localStorage.getItem("user")) {
      return localStorage.getItem("user");
    } else return null;
  });

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  const login = (data) => {
    setUser(data);
    const dataStorage = JSON.stringify(data);
    localStorage.setItem("user", dataStorage);
    navigate("/dashboard");
  };

  const value = useMemo(() => ({ user, login, logout }), [user]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useAuth = () => {
  return useContext(UserContext);
};
