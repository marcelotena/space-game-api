const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const errorHandler = require('./middleware/error');
const connectDB = require('./config/db');
const http = require('http');
const socketio = require('socket.io');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Connect Database
connectDB();

// Route files
const auth = require('./routes/api/auth');
const users = require('./routes/api/users');
const planets = require('./routes/api/planets');

const app = express();
app.get('/', (req, res) => res.send('API Running'));

const server = http.createServer(app);
const io = socketio(server);

// Run when a client connects
io.on('connection', socket => {
  console.log('New user connection...');

  socket.on('disconnect', () => {
    console.log('User has left the chat.');
  });
});

// Enable CORS
const allowedOrigins = process.env.ALLOWED_ORIGINS;
app.use(cors({
  origin: function(origin, callback){

    // allow requests with no origin
    // (like mobile apps or curl requests)
    if(!origin) return callback(null, true);

    if(allowedOrigins.indexOf(origin) === -1){
      var msg = 'The CORS policy for this site does not ' +
          'allow access from the specified Origin.';

      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// Dev logging middleware
if(process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Mount routers
app.use('/api/v1/auth', auth);
app.use('/api/v1/users', users);
app.use('/api/v1/planets', planets);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server started on port ${PORT}`.cyan));