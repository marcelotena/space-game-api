const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const errorHandler = require('./middleware/error');
const connectDB = require('./config/db');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Connect Database
connectDB();

// Route files
const auth = require('./routes/api/auth');
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');
const customers = require('./routes/api/customers');
const invoices = require('./routes/api/invoices');

const app = express();
app.get('/', (req, res) => res.send('API Running'));

// Enable CORS
const allowedOrigins = ['http://localhost:3000',
  'https://fy-next-app.now.sh/'];
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
app.use('/api/v1/profile', profile);
app.use('/api/v1/posts', posts);
app.use('/api/v1/customers', customers);
app.use('/api/v1/invoices', invoices);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`.cyan));