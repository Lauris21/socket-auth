const { isAuth } = require("../../middlewares/auth");
const { prueba, createChat } = require("../controllers/chat.controller");

const express = require("express");
const ChatRoutes = express.Router();

ChatRoutes.post("/", [isAuth], createChat);

ChatRoutes.post("/prueba", prueba);

module.exports = ChatRoutes;
