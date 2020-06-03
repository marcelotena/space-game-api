const mongoose = require('mongoose');

const PlayerSchema = new mongoose.Schema({
  name: String,
  planets: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Planet'
  }],
  points: {
    global: Number,
    economy: Number,
    research: Number,
    fleet: Number
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Player', PlayerSchema);