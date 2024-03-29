import { API_Chat } from "./service.config";
import { updateToken } from "../../utils/updateToken";

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

export const autoLogin = async (data) => {
  return API_Chat.post("user/login/autoLogin", data)
    .then((res) => res)
    .catch((error) => {
      return error;
    });
};

export const loginUser = async (data) => {
  return API_Chat.post("user/login", data)
    .then((res) => res)
    .catch((error) => {
      return error;
    });
};

export const updateTokenUser = async () => {
  return API_Chat.get("user/", {
    headers: {
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => {
      return error;
    });
};

export const getAllUsers = async () => {
  return API_Chat.get("user/allUsers")
    .then((res) => res)
    .catch((error) => {
      return error;
    });
};

export const getUser = async () => {
  return API_Chat.get("user/getById", {
    headers: {
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => {
      return error;
    });
};

export const getChatUser = async () => {
  return API_Chat.get("user/getChatUser", {
    headers: {
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => {
      return error;
    });
};
