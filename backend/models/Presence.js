const mongoose = require('mongoose');

const presenceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  lastSeen: { type: Date },
});

module.exports = mongoose.model('Presence', presenceSchema);
