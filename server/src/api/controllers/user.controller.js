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

module.exports = { register, login };
