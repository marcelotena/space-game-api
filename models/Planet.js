const mongoose = require('mongoose');
const Planet = require('planetFunctions');

const PlanetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter your name']
  },
  email: {
    type: String,
    unique: true,
    match: [
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please add a valid email'
    ]
  },
  address: {
    type: String,
    required: [true, 'Please add an address']
  },
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
  coordinates: {
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
  colonisedBy: {
    type: mongoose.Schema.ObjectId, // Populate on colonisation or player creation
    ref: 'Player'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Generate planet type fields before saving
PlanetSchema.pre('save', async function(next) {
  const planetInfo = new Planet(this.coordinates.position);
  this.planetType = planetInfo.generatePlanet();

  next();
});

module.exports = mongoose.model('Planet', PlanetSchema);