const { isAuth, isAuthAdmin } = require("../../middlewares/auth");
const { upload } = require("../../middlewares/files");
const {
  register,
  login,
  deleteUser,
  googleSignIn,
  sendMailCode,
  checkUser,
  resendCode,
  autoLogin,
  tokenRenovate,
  getAll,
  getUser,
  getChatUser,
} = require("../controllers/user.controller");

const express = require("express");

const UserRoutes = express.Router();

UserRoutes.post("/register", register);
UserRoutes.post("/login", login);
UserRoutes.post("/google", googleSignIn);
UserRoutes.delete("/delete", [isAuth], deleteUser);
UserRoutes.post("/checkUser", checkUser);
UserRoutes.post("/resendCode", resendCode);
UserRoutes.post("/login/autoLogin", autoLogin);
UserRoutes.get("/", [isAuth], tokenRenovate);
UserRoutes.get("/allUsers", getAll);
UserRoutes.get("/getById", [isAuth], getUser);
UserRoutes.get("/getChatUser", [isAuth], getChatUser);

UserRoutes.post("/sendMailCode/:id", sendMailCode);

module.exports = UserRoutes;
