require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const genres = require('./routes/genres');
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

// SETTING THE PORT
const port = process.env.PORT || 3000;

// START SERVER BASED ON PORT VARIABLE
app.listen(port, () => console.log(`Listening on port ${port}.`));
