const { isAuth, isAuthAdmin } = require("../../middlewares/auth");
const {
  createMessage,
  deleteMessage,
  // getChatByUserTwo,
  // getAllChats,
} = require("../controllers/message.controller");

const express = require("express");
const MessageRoutes = express.Router();

MessageRoutes.post("/", [isAuth], createMessage);
MessageRoutes.delete("/delete/:id", deleteMessage);

module.exports = MessageRoutes;
