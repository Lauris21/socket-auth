import { Navigate } from "react-router-dom";
import { autoLogin } from "../services/API_Chat/user.service";

const useAutoLogin = async (allUser, userLogin) => {
  try {
    // eslint-disable-next-line no-unsafe-optional-chaining
    const { password, email } = allUser?.user;

    const customData = {
      email,
      password,
    };

    const setData = await autoLogin(customData);
    console.log(setData);
    if (setData.status == 200) {
      const dataCustom = {
        token: setData.data.token,
        user: setData.data.user.name,
        email: setData.data.user.email,
        image: setData.data.user.image,
        check: setData.data.user.check,
      };

      const dataString = JSON.stringify(dataCustom);
      userLogin(dataString);
      return <Navigate to="/dashboard" />;
    } else {
      return <Navigate to="/login" />;
    }
  } catch (error) {
    return error;
  }
};

export default useAutoLogin;
