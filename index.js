require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const genres = require('./routes/genres');
const movies = require('./routes/movies');
const customers = require('./routes/customers');
const rentals = require('./routes/rentals');

const app = express();

app.use(express.json());

// MONGOOSE CONNECTION
mongoose
  .connect(`${process.env.MONGO_ADDRESS}/stream`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('connected');
  })
  .catch((err) => console.error('connection failed', err));

// HOME ROUTE
app.get('/', (req, res) => {
  res.send('Welcome To Stream!');
});

// API ROUTES
app.use('/api/genres', genres);
app.use('/api/movies', movies);
app.use('/api/customers', customers);
app.use('/api/rentals', rentals);

// SETTING THE PORT
const port = process.env.PORT || 3000;

// START SERVER BASED ON PORT VARIABLE
app.listen(port, () => console.log(`Listening on port ${port}.`));
