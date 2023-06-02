import { useContext } from "react";
import { UserContext } from "../constext/userContext";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
  const { user } = useContext(UserContext);

  if (user == null) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoutes;
