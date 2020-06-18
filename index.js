require('dotenv').config();
require('express-async-errors');
const configs = require('config');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);
const errorMiddleware = require('./middleware/errorMiddleware');
const genres = require('./routes/genres');
const albums = require('./routes/albums');
const artists = require('./routes/artists');
const reviews = require('./routes/reviews');
const users = require('./routes/users');
const auth = require('./routes/auth');

const app = express();

// CHECK IF ENVIRONMENTAL VARIABLE HAS BEEN SET
if (!configs.get('jwtPrivateKey')) {
  console.error('FATAL ERROR: jwtPrivateKey is not defined!');
  process.exit(1);
}

// MONGOOSE CONNECTION -- CHANGE MONGO_ADDRESS VARIABLE TO APPROPRIATE CONNECTION STRING
mongoose
  .connect(`${process.env.MONGO_ADDRESS}/revue`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('Connected to database');
  })
  .catch((err) => console.error('Failed to connect to database. ERROR: ', err));

// MIDDLEWARE
app.use(express.json());
app.use(cors());
// HOME ROUTE
app.get('/', (req, res) => {
  res.send('Welcome To Stream!');
});
// API ROUTES
app.use('/api/genres', genres);
app.use('/api/albums', albums);
app.use('/api/artists', artists);
app.use('/api/reviews', reviews);
app.use('/api/users', users);
app.use('/api/auth', auth);
// ERROR MIDDLEWARE
app.use(errorMiddleware);

// SETTING THE PORT
const port = process.env.PORT || 3000;

// START SERVER BASED ON PORT VARIABLE
app.listen(port, () => console.log(`Listening on port ${port}.`));
