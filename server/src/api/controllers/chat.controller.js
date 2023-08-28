const User = require("../models/user.model");
const Chat = require("../models/chat.model");

const createChat = async (req, res, next) => {
  try {
    await Chat.syncIndexes();

    const userInit = req.user._id;
    const { userTwo } = req.body;

    const chatDuplicate = await Chat.findOne({
      userInit: userInit,
      userTwo: userTwo,
    });

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
              return res.status(404).json("Error updating userTwo chats ❌");
            }
          } catch (error) {
            return res.status(404).json("Error updating userInit chats ❌");
          }
        } else {
          return res.status(404).json("Error, chat hasn`t been create ❌");
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

const deleteChat = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedChat = await Chat.findByIdAndDelete(id);

    if (deletedChat) {
      try {
        await User.updateMany({ chats: id }, { $pull: { chats: id } });

        const testUser = await User.find({ chats: id });

        return res.status(200).json({
          deletedChat: deletedChat,
          testDeleteChat: (await Chat.findById(id))
            ? "Error chat is not delete ❌"
            : "🗑️ Chat has been delete ❌",
          testUser:
            testUser.length > 0
              ? "Error update Users"
              : "User has been update ✅",
        });
      } catch (error) {
        return res.status(409).json("Error updating users");
      }
    } else {
      return res.status(404).json("Error, chat not found for delete ❌");
    }
  } catch (error) {
    return next(error);
  }
};

const getChatByUserTwo = async (req, res, next) => {
  try {
    const { userTwo } = req.body;

    const chatWhitUser = await Chat.find({ userTwo: userTwo });

    if (chatWhitUser) {
      return res.status(200).json(chatWhitUser);
    } else {
      return res.status(404).json("Error, chat not found");
    }
  } catch (error) {
    return next(error);
  }
};

const getAllChats = async (req, res, next) => {
  try {
    const allChats = await Chat.find();

    if (allChats) {
      return res.status(200).json(allChats);
    } else {
      return res.status(404).json("Error, chats not found");
    }
  } catch (error) {
    return next(error);
  }
};

const getChatsOfUser = async (req, res, next) => {
  try {
    const { _id } = req.user._id;

    const chatsByUser = await Chat.find({ userInit: _id }).populate("userTwo");

    if (chatsByUser) {
      return res.status(200).json(chatsByUser);
    } else {
      return res.status(404).json("Chat not found");
    }
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createChat,
  deleteChat,
  getChatByUserTwo,
  getAllChats,
  getChatsOfUser,
};
