const { isAuth } = require("../../middlewares/auth");
const {
  createChat,
  deleteChat,
  getChatByUserTwo,
  getAllChats,
  getChatsOfUser,
} = require("../controllers/chat.controller");

const express = require("express");
const ChatRoutes = express.Router();

ChatRoutes.post("/", [isAuth], createChat);
ChatRoutes.delete("/delete/:id", deleteChat);
ChatRoutes.get("/getChatByUserTwo", getChatByUserTwo);
ChatRoutes.get("/getAllChats", getAllChats);
ChatRoutes.get("/getmeChat", [isAuth], getChatsOfUser);

module.exports = ChatRoutes;
