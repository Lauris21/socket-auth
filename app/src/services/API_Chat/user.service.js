import { API_Chat } from "./service.config";

export const googleSignIn = async (token) => {
  console.log("entro", token);
  return API_Chat.post("/user/google", token)
    .then((res) => console.log(res.json()))
    .then((res) => console.log(res))
    .catch((error) => {
      return error;
    });
};
