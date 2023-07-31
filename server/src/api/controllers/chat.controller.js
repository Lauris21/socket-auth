const User = require("../models/user.model");
const Chat = require("../models/chat.model");

const createChat = async (req, res, next) => {
  try {
    await Chat.syncIndexes();

    const chatDuplicate = await Chat.findOne(
      {
        userInit: req.user._id,
      },
      { userTwo: req.body.user }
    );

    if (!chatDuplicate) {
      const newChat = new Chat({ ...req.body });

      try {
        const chatSave = await newChat.save();

        if (chatSave) {
          try {
            await User.findByIdAndUpdate(req.user._id, {
              $push: { chats: newChat._id },
            });
          } catch (error) {
            return res.status(404).json("Error updating user chats");
          }
          return res.status(200).json(chatSave, "Chat create ok");
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

module.exports = { createChat };
