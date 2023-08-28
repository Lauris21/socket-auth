const { verifyGoogle } = require("../../helpers/google-verify");
const { deleteImgCloudinary } = require("../../middlewares/files");
const randomCode = require("../../utils/randomCode");
const randomPassword = require("../../utils/randomPassword");
const { generateToken } = require("../../utils/token");
const nodemailer = require("nodemailer");
const User = require("../models/user.model");

const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const setError = require("../../helpers/handleError");
const Chat = require("../models/chat.model");
const Message = require("../models/message.model");
dotenv.config();

const URL_COMPLET = process.env.URL_COMPLET;
const EMAIL_ENV = process.env.EMAIL_ENV;
const PASSWORD_ENV = process.env.PASSWORD_ENV;

const register = async (req, res, next) => {
  let catchImg = req.file?.path;

  try {
    await User.syncIndexes();
    let confirmationCode = randomCode();
    const UserExist = await User.findOne(
      { email: req.body.email },
      { name: req.body.name }
    );

    if (!UserExist) {
      const newUser = new User({ ...req.body, confirmationCode });

      if (req.file) {
        newUser.image = req.file.path;
      } else {
        newUser.image = "https://pic.onlinewebfonts.com/svg/img_181369.png";
      }

      try {
        const userSave = await newUser.save();

        if (userSave) {
          return res.redirect(
            307,
            `${URL_COMPLET}/api/v1/user/sendMailCode/${userSave._id}`
          );
          // return res.status(200).json(userSave);
        } else {
          return res.status(409).json(userSave, "User not save");
        }
      } catch (error) {
        return res.status(404).json(error.message);
      }
    } else {
      if (req.file) deleteImgCloudinary(catchImg);
      return res.status(409).json("This user already exist");
    }
  } catch (error) {
    if (req.file) deleteImgCloudinary(catchImg);
    console.log("error", error);
    return next(error);
  }
};

const sendMailCode = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userDB = await User.findById(id);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: EMAIL_ENV,
        pass: PASSWORD_ENV,
      },
    });

    const mailOptions = {
      from: EMAIL_ENV,
      to: userDB.email,
      subject: "Confirmation Code",
      text: `Your confirmation code is ${userDB.confirmationCode}. Thanks ${userDB.name}`,
    };

    transporter.sendMail(mailOptions, async (error, info) => {
      if (error) {
        const userDelete = await User.findByIdAndDelete(userDB._id);
        if (!userDelete) {
          return res.status(404).json({
            user: userDB,
            confirmationCode: "error, resend code, user has been delete",
          });
        }
      } else {
        return res.status(200).json({
          user: userDB,
          confirmationCode: userDB.confirmationCode,
        });
      }
    });
  } catch (error) {
    return next(error);
  }
};

const checkUser = async (req, res, next) => {
  try {
    const { email, confirmationCode } = req.body;
    const userDB = await User.findOne({ email });

    if (!userDB) {
      return res.status(404).json("User not found");
    } else {
      if (confirmationCode === userDB.confirmationCode) {
        try {
          await userDB.updateOne({ check: true });
        } catch (error) {
          return res.status(404).json(error.mensaje);
        }
        const updateUser = await User.findOne({ email });

        return res.status(200).json({
          testCheckOk: updateUser.check == true ? true : false,
        });
      } else {
        await User.findByIdAndDelete(userDB._id);

        return res.status(200).json({
          userDB,
          check: false,
          delete: (await User.findById(userDB._id))
            ? "Error delete user"
            : "Ok, delete user",
        });
      }
    }
  } catch (error) {
    return next(setError(500, "Error check code"));
  }
};

const resendCode = async (req, res, next) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: EMAIL_ENV,
        pass: PASSWORD_ENV,
      },
    });

    const userDB = await User.findOne({ email: req.body.email });

    if (userDB) {
      const mailOptions = {
        from: EMAIL_ENV,
        to: userDB.email,
        subject: "Confirmation Code",
        text: `Your confirmation code is ${userDB.confirmationCode}. Thanks ${userDB.name}`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return next(error);
        } else {
          return res.status(200).json({
            resend: true,
          });
        }
      });
    } else {
      return res.status(404).json("User not found");
    }
  } catch (error) {
    return next(setError(500, error.message || "Error resend code"));
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const userDB = await User.findOne({ email });

    if (userDB) {
      if (!userDB.estado) {
        return res.status(401).json({
          msg: "Contact with the administration, user already bloqued",
        });
      }
      if (bcrypt.compareSync(password, userDB.password)) {
        const token = generateToken(userDB._id, email);
        return res.status(200).json({
          user: userDB,
          token,
        });
      } else {
        return res.status(404).json("Password dont match");
      }
    } else {
      return res.status(404).json("User no register");
    }
  } catch (error) {
    return next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { _id, image } = req.user;
    await User.findByIdAndDelete(_id);

    if (await User.findById(_id)) {
      return res.status(404).json("User dont delete");
    } else {
      deleteImgCloudinary(image);
      try {
        await Chat.deleteMany({ userInit: _id });
        try {
          await Chat.deleteMany({ userTwo: _id });
          try {
            await Message.deleteMany({ user: _id });
            return res
              .status(200)
              .json("User, chats and messages have been delete");
          } catch (error) {
            return res.status(409).json("Error deleting messages of user");
          }
        } catch (error) {
          return res.status(409).json("Error deleting chats with userTwo");
        }
      } catch (error) {
        return res.status(409).json("Error deleting chats with userInit");
      }
    }
  } catch (error) {
    return next(error);
  }
};

const googleSignIn = async (req, res, next) => {
  const { token_id } = req.body;

  try {
    const googleUser = await verifyGoogle(token_id);

    const { name, picture, email } = googleUser;

    const userDB = await User.findOne({ email });

    if (token_id) {
      if (!userDB) {
        if (picture == undefined) {
          const data = {
            name,
            email,
            google: true,
            password: randomPassword(),
            image: "https://pic.onlinewebfonts.com/svg/img_181369.png",
            check: true,
            confirmationCode: randomCode(),
          };
          const newUser = new User(data);
          await newUser.save();
          if (newUser) {
            return res.status(200).json({
              msg: "User Google create okey 👌🏽",
              newUser,
            });
          } else {
            return res.status(404).json("Error register user");
          }
        } else {
          const data = {
            name,
            email,
            google: true,
            password: randomPassword(),
            image: picture,
            check: true,
            confirmationCode: randomCode(),
          };

          const newUser = new User(data);
          await newUser.save();

          if (newUser) {
            return res.status(200).json({
              msg: "User Google create okey 👌🏽",
              newUser,
            });
          } else {
            return res.status(404).json("Error register user");
          }
        }
      } else {
        // Si el usuario en DB esta en estado false porque ha sido bloqueado
        if (!userDB.estado) {
          return res.status(401).json({
            msg: "Contact with the administration, user already bloqued",
          });
        }
        const token = generateToken(userDB._id, email);
        return res.status(200).json({
          userDB,
          token,
          msg: "User login okey",
        });
      }
    } else {
      return res.status(404).json("Token Google not found ❌");
    }
  } catch (error) {
    return next(error);
  }
};

const autoLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const userDB = await User.findOne({ email });

    if (userDB) {
      if ((password, userDB.password)) {
        const token = generateToken(userDB._id, email);
        return res.status(200).json({
          user: userDB,
          token,
        });
      } else {
        return res.status(404).json("Password don`t match");
      }
    } else {
      return res.status(404).json("User no register");
    }
  } catch (error) {
    return next(error);
  }
};

const tokenRenovate = async (req, res, next) => {
  try {
    const { user } = req;

    const token = generateToken(user._id, user.email);

    return res.json({ user, token });
  } catch (error) {
    return next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const allUsers = await User.find();
    if (allUsers) {
      return res.status(200).json(allUsers);
    } else {
      return res.status(404).json("Error not found Users");
    }
  } catch (error) {
    return next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const { _id } = req.user._id;
    const user = await User.findById(_id).populate("chats");
    console.log(user);
    return res.status(200).json(user);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  register,
  sendMailCode,
  checkUser,
  resendCode,
  login,
  deleteUser,
  googleSignIn,
  autoLogin,
  tokenRenovate,
  getAll,
  getUser,
};
