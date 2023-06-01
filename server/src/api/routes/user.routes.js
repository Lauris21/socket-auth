const { isAuth, isAuthAdmin } = require("../../middlewares/auth");
const { upload } = require("../../middlewares/files");
const {
  register,
  login,
  deleteUser,
} = require("../controllers/user.controller");

const express = require("express");

const UserRoutes = express.Router();

UserRoutes.post("/register", upload.single("image"), register);
UserRoutes.post("/login", login);
UserRoutes.delete("/delete", [isAuth], deleteUser);

module.exports = { UserRoutes };
