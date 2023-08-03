const User = require("../models/user.model");
const Chat = require("../models/chat.model");
const Message = require("../models/message.model");

const createMessage = async (req, res, next) => {
  try {
    await Message.syncIndexes();

    const user = req.user._id;
    const newMessage = new Message({ ...req.body, user: user });

    try {
      const saveMessage = await newMessage.save();

      if (saveMessage) {
        try {
          await Chat.findByIdAndUpdate(req.body.chat, {
            $push: { messages: newMessage._id },
          });
          return res.status(200).json(saveMessage);
        } catch (error) {
          return res.status(404).json("Error updating Chat ❌");
        }
      } else {
        return res.status(409).json("Error, message hasn`t been create ❌");
      }
    } catch (error) {
      return next(error);
    }
  } catch (error) {
    return next(error);
  }
};

const deleteMessage = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedMessage = await Message.findByIdAndDelete(id);

    if (deletedMessage) {
      try {
        await Chat.updateOne({ messages: id }, { $pull: { messages: id } });

        const testChat = await Chat.find({ messages: id });

        return res.status(200).json({
          deletedMessage: deletedMessage,
          testDeleteMessage: (await Message.findById(id))
            ? "Error message hasn`t been delete ❌"
            : "🗑️ Message has been delete",
          testChat:
            testChat.length > 0
              ? "Error update Chat ❌"
              : "Chat has been update ✅",
        });
      } catch (error) {
        return res.status(409).json("Error updating chat ❌");
      }
    } else {
      return res.status(404).json("Error, message not found for delete ❌");
    }
  } catch (error) {}
};
module.exports = { createMessage, deleteMessage };
