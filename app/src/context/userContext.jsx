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

  const [allUser, setAllUser] = useState({
    data: {
      user: {
        password: "",
        email: "",
      },
    },
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
      check: data.userDB.check,
      chats: data.userDB.chats,
    };
    const dataString = JSON.stringify(dataCustom);
    setUser(dataCustom);
    localStorage.setItem("user", dataString);
    navigate("/dashboard");
  };

  const userLogin = (data) => {
    localStorage.setItem("user", data);
    const parseData = JSON.parse(data);
    setUser(() => parseData);
  };

  const bridgeData = (state) => {
    const data = localStorage.getItem("data");
    const dataJson = JSON.parse(data);
    switch (state) {
      case "REGISTER_USER":
        setAllUser(dataJson);
        localStorage.removeItem("data");
        break;

      default:
        break;
    }
  };

  const [connect, setConnect] = useState(false);
  const [newChat, setNewChat] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [idSocketUserTwo, setidSocketUserTwo] = useState(null);

  console.log(user);

  const value = useMemo(
    () => ({
      user,
      setUser,
      login,
      logout,
      userLogin,
      allUser,
      setAllUser,
      bridgeData,
      connect,
      setConnect,
      newChat,
      setNewChat,
      showChat,
      setShowChat,
      idSocketUserTwo,
      setidSocketUserTwo,
    }),
    [user, allUser, connect, newChat, showChat, idSocketUserTwo]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useAuth = () => {
  return useContext(UserContext);
};
