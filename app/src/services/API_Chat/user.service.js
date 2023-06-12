import { API_Chat } from "./service.config";

export const googleSignIn = async (token) => {
  return API_Chat.post("/user/google", token)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return error;
    });
};

export const registerDB = async (data) => {
  return API_Chat.post("user/register", data)
    .then((res) => res)
    .catch((error) => {
      return error;
    });
};

export const checkNewUser = async (data) => {
  return API_Chat.post("user/checkUser", data)
    .then((res) => res)
    .catch((error) => {
      return error;
    });
};

export const resendCode = async (data) => {
  return API_Chat.post("user/resendCode", data)
    .then((res) => res)
    .catch((error) => {
      return error;
    });
};
