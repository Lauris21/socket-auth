import { API_Chat } from "./service.config";
import { updateToken } from "../../utils/updateToken";

export const createChat = async (data) => {
  return API_Chat.post("chat", data, {
    headers: {
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => {
      return error;
    });
};
