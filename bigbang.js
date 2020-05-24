const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');
const planetType = require('./controllers/helpers/planetFunctions');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Load model
const Planet = require('./models/Planet');

// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

// Add planets to DB
const galaxies = 1;
const systems = 10;
const positions = 15;

const universe = async () => {
  let body = {
    coordinates: {
      galaxy: 0,
      system: 0,
      position: 0
    }
  };

  for(let g = 1; g <= galaxies; g++) {
    for(let s = 1; s <= systems; s++) {
      for(let p = 1; p <= positions; p++) {
        const planetInfo = new planetType(p);
        body.planetInfo = await planetInfo.generatePlanet();
        body.coordinates.galaxy = g;
        body.coordinates.system = s;
        body.coordinates.position = p;

        console.log(body);

        await Planet.create(body);
      }
    }
  }
};

const generateUniverse = async () => {
  try {
    await universe();

    console.log('Big Bang executed...'.green.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// Delete planets from DB
const destroyUniverse = async () => {
  try {
    await Planet.deleteMany();

    console.log('All planets destroyed...'.red.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// node bigbang -g // node bigbang -d
if(process.argv[2] === '-g') {
  generateUniverse();
} else if (process.argv[2] === '-d') {
  destroyUniverse();
}