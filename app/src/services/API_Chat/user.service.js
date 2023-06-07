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
    .then((res) => console.log(res))
    .catch((error) => console.log(error));
};
