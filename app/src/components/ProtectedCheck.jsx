import { Navigate } from "react-router-dom";
import { useAuth } from "../context/userContext";

const ProtectedCheck = ({ children }) => {
  const { user, allUser } = useAuth();

  if (allUser?.data?.user?.check == true || user?.check == true) {
    return <Navigate to="/dashboard" />;
  } else {
    return children;
  }
};

export default ProtectedCheck;
