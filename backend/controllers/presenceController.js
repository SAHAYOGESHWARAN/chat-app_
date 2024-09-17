const Presence = require('../models/Presence');

exports.updatePresence = async (req, res) => {
  const { userId, isOnline } = req.body;

  try {
    const presence = await Presence.findOneAndUpdate(
      { userId },
      { lastSeen: isOnline ? null : Date.now() },
      { new: true, upsert: true }
    );
    res.status(200).json(presence);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
