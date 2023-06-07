import { createContext, useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(() => {
    if (localStorage.getItem("user")) {
      const data = localStorage.getItem("user");
      return JSON.parse(data);
    } else return null;
  });

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  const login = (data) => {
    const dataCustom = {
      token: data.token,
      name: data.userDB.name,
      email: data.userDB.email,
      image: data.userDB.image,
    };
    const dataString = JSON.stringify(dataCustom);
    setUser(dataCustom);
    localStorage.setItem("user", dataString);
    navigate("/dashboard");
  };

  const value = useMemo(() => ({ user, login, logout }), [user]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useAuth = () => {
  return useContext(UserContext);
};
