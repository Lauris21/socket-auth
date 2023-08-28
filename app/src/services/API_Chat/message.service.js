import { API_Chat } from "./service.config";
import { updateToken } from "../../utils/updateToken";

export const createMessage = async (data) => {
  return API_Chat.post("message", data, {
    headers: {
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => {
      return error;
    });
};
