const express = require('express');
const Joi = require('@hapi/joi');
const router = express.Router();

// GENRE DATA
const genres = [
  { id: 1, name: 'Comedy' },
  { id: 2, name: 'Action' },
  { id: 3, name: 'Horror' },
  { id: 4, name: 'Drama' },
  { id: 5, name: 'Thriller' },
  { id: 6, name: 'Romance' },
];

// GENRE VALIDATION
validateGenre = (genre) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  return schema.validate(genre);
};

// GET GENRES
router.get('/', (req, res) => {
  res.send(genres);
});

// GET GENRE BY ID
router.get('/:id', (req, res) => {
  let genre = genres.find((c) => c.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send('The genre ID was not found!');

  res.send(genre);
});

// POST GENRE
router.post('/', (req, res) => {
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
router.put('/:id', (req, res) => {
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
router.delete('/:id', (req, res) => {
  let genre = genres.find((c) => c.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send('The genre ID was not found!');

  const index = genres.indexOf(genre);
  genres.splice(index, 1);

  res.send(genre);
});

module.exports = router;
