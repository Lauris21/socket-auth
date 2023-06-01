import { API_Chat } from "./service.config";

export const googleSignIn = async (token) => {
  return API_Chat.post("/user/google", token)
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((error) => {
      return error;
    });
};
