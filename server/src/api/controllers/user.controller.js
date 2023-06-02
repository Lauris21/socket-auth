const { verifyGoogle } = require("../../helpers/google-verify");
const { deleteImgCloudinary } = require("../../middlewares/files");
const { generateToken } = require("../../utils/token");

const User = require("../models/user.model");

const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();

const register = async (req, res, next) => {
  let catchImg = req.file?.path;
  // console.log("body", req.body);
  try {
    await User.syncIndexes();

    const UserExist = await User.findOne(
      { email: req.body.email },
      { name: req.body.name }
    );

    if (!UserExist) {
      const newUser = new User({ ...req.body });

      if (req.file) {
        newUser.image = req.file.path;
      } else {
        newUser.image = "https://pic.onlinewebfonts.com/svg/img_181369.png";
      }

      try {
        const userSave = await newUser.save();

        if (userSave) {
          return res.status(200).json(userSave);
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

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const userDB = await User.findOne({ email });

    if (userDB) {
      if (bcrypt.compareSync(password, userDB.password)) {
        const token = generateToken(userDB._id, email);
        return res.status(200).json({
          user: {
            email,
            _id: userDB._id,
          },
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
      return res.status(200).json("User has been delete");
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
        const data = {
          name,
          email,
          google: true,
          password: "...123Hola!",
          image: picture,
        };

        const newUser = new User(data);
        await newUser.save();

        return res.status(200).json({
          msg: "Usuario Google create okey 👌🏽",
          newUser,
        });
      } else {
        // Si el usuario en DB esta en estado false porque ha sido bloqueado
        if (!userDB.estado) {
          return res.status(401).json({
            msg: "Hable con el administrador, usuario bloqueado",
          });
        }
        const token = generateToken(userDB._id, email);
        return res.status(200).json({
          userDB,
          token,
        });
      }
    } else {
      return res.status(404).json("Token Google not found ❌");
    }
  } catch (error) {
    return next(error);
  }
};

module.exports = { register, login, deleteUser, googleSignIn };
