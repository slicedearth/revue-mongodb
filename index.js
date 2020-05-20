const express = require('express');
const Joi = require('@hapi/joi');
const app = express();

app.use(express.json());

// GENRE DATA
const genres = [
  { id: 1, name: 'Comedy' },
  { id: 2, name: 'Action' },
  { id: 3, name: 'Horror' },
  { id: 4, name: 'Drama' },
  { id: 5, name: 'Thriller' },
  { id: 6, name: 'Romance' },
];

// HOME ROUTE
app.get('/', (req, res) => {
  res.send('Welcome To Stream!');
});
// GET GENRES
app.get('/api/genres', (req, res) => {
  res.send(genres);
});

// GET GENRE BY ID
app.get('/api/genres/:id', (req, res) => {
  let genre = genres.find((c) => c.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send('The genre ID was not found!');

  res.send(genre);
});

// POST GENRE
app.post('/api/genres', (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const genre = {
    id: genres.length + 1,
    name: req.body.name,
  };
  genres.push(genre);

  res.send(genre);
});

// UPDATE GENRE
app.put('/api/genres/:id', (req, res) => {
  let genre = genres.find((c) => c.id === parseInt(req.params.id));
  if (!genre) {
    return res.status(404).send('The genre ID was not found!');
  }

  const { error } = validateGenre(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  genre.name = req.body.name;

  res.send(genre);
});

// DELETE GENRE
app.delete('/api/genres/:id', (req, res) => {
  let genre = genres.find((c) => c.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send('The genre ID was not found!');

  const index = genres.indexOf(genre);
  genres.splice(index, 1);

  res.send(genre);
});

// GENRE VALIDATION
validateGenre = (genre) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  return schema.validate(genre);
};

// SETTING THE PORT
const port = process.env.PORT || 3000;

// START SERVER BASED ON PORT VARIABLE
app.listen(port, () => console.log(`Listening on port ${port}.`));
