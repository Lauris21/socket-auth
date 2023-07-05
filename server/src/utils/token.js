const jwt = require("jsonwebtoken");
const User = require("../api/models/user.model");
const dotenv = require("dotenv");
dotenv.config();

const generateToken = (id, email) => {
  if (!id || !email) {
    throw new Error("Email or id are missing");
  }
  return jwt.sign({ id, email }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

const verifyToken = (token) => {
  if (!token) {
    throw new Error("Token is missing");
  }
  return jwt.verify(token, process.env.JWT_SECRET);
};

const verifySocketToken = async (token) => {
  try {
    if (token) {
      const { id } = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(id);

      if (!user) {
        return res.status(404).json({
          msg: "Token not valid - User not found in db",
        });
      }

      if (!user.estado) {
        return es.status(401).json({
          msg: "User is blocked - Contact with admin",
        });
      }
      return user;
    } else {
      return res.status(401).json({
        msg: "No hay token en la petición",
      });
    }
  } catch (error) {
    return error;
  }
};
module.exports = { generateToken, verifyToken, verifySocketToken };
