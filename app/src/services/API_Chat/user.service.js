import { API_Chat } from "./service.config";

export const googleSignIn = async (token) => {
  return API_Chat.post("/user/google", token)
    .then((res) => {
      console.log(res);
      if (res.data.newUser) {
        localStorage.setItem("email", res.data.newUser.email);
      } else {
        localStorage.setItem("email", res.data.userDB.email);
      }
      return res;
    })
    .catch((error) => {
      return error;
    });
};
