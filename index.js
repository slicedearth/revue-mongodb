const express = require('express');
const genres = require('./routes/genres');
const app = express();

app.use(express.json());

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
