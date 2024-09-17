const Chat = require('../models/Chat');
const Message = require('../models/Message');

exports.createGroupChat = async (req, res) => {
  const { userIds } = req.body;

  try {
    const chat = new Chat({ users: userIds });
    await chat.save();
    res.status(201).json(chat);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.sendMessage = async (req, res) => {
  const { chatId, senderId, content, fileUrl } = req.body;

  try {
    const message = new Message({ chatId, sender: senderId, content, fileUrl });
    await message.save();

    const chat = await Chat.findById(chatId);
    chat.messages.push(message);
    await chat.save();

    res.status(201).json(message);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
