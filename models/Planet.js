const mongoose = require('mongoose');

const PlanetSchema = new mongoose.Schema({
  name: String,
  planetInfo: { // Planet type
    planetType: {
      code: {
        type: String,
        enum: ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
      },
      name: {
        type: String,
        enum: ['desert', 'dry', 'normal', 'jungle', 'oceanic', 'ice', 'gas']
      }
    },
    usedSlots: Number,
    slots: Number,
    imageSystem: String
  },
  coordinates: { // Planet position
    galaxy: {
      type: Number,
      required: [true, 'Please enter a Galaxy number between 1 and 5'],
      min: 1,
      max: 5
    },
    system: {
      type: Number,
      required: [true, 'Please enter a System number between 1 and 499'],
      min: 1,
      max: 499
    },
    position: {
      type: Number,
      required: [true, 'Please enter a Position number between 1 and 15'],
      min: 1,
      max: 15
    },
  },
  resources: { // Resources
    metal: {
      type: Number,
      default: 1000
    },
    crystal: {
      type: Number,
      default: 1000
    },
    deuterium: {
      type: Number,
      default: 0
    },
  },
  buildings: { // Building levels
    metalMine: Number,
    solarPlant: Number,
    crystalMine: Number,
    deuteriumSynthesizer: Number,
    metalStorage: Number,
    crystalStorage: Number,
    deuteriumTank: Number
  },
  colonisedBy: { // Planet owner (if colonised)
    type: mongoose.Schema.ObjectId, // Populate on colonisation or player creation
    ref: 'Player'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Planet', PlanetSchema);