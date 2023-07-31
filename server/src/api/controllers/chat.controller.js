const User = require("../models/user.model");
const Chat = require("../models/chat.model");

const createChat = async (req, res, next) => {
  try {
    await Chat.syncIndexes();

    const userInit = req.user._id;
    const { userTwo } = req.body;

    const chatDuplicate = await Chat.findOne({ userInit }, { userTwo });

    if (!chatDuplicate) {
      const newChat = new Chat({ ...req.body, userInit: userInit });

      try {
        const chatSave = await newChat.save();

        if (chatSave) {
          try {
            await User.findByIdAndUpdate(userInit, {
              $push: { chats: newChat._id },
            });

            try {
              await User.findByIdAndUpdate(userTwo, {
                $push: { chats: newChat._id },
              });
              return res.status(200).json(chatSave);
            } catch (error) {
              return res.status(404).json("Error updating userTwo chats");
            }
          } catch (error) {
            return res.status(404).json("Error updating userInit chats");
          }
        } else {
          return res.status(409).json("chat has been not create");
        }
      } catch (error) {
        return res.status(404).json(error.message);
      }
    } else {
      return res.status(409).json("This chat already exist");
    }
  } catch (error) {
    return next(error);
  }
};

const prueba = () => {
  console.log("prueba");
};

module.exports = { createChat, prueba };
