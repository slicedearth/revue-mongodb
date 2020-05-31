const express = require('express');
const mongoose = require('mongoose');
const authMiddleware = require('../middleware/authMiddleware');
const { Movie, validateMovie } = require('../models/movieModel');
const { Genre } = require('../models/genreModel');
const router = express.Router();

// GET MOVIES
router.get('/', async (req, res) => {
  const movies = await Movie.find().sort('title');
  res.send(movies);
});

// GET MOVIE BY ID
router.get('/:id', async (req, res) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).send('Invalid Movie ID');
    res.send(movie);
  } else {
    return res.status(404).send('Invalid ID Format');
  }
});

// POST MOVIE
router.post('/', authMiddleware, async (req, res) => {
  const { error } = validateMovie(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(404).send('Invalid Genre ID');

  let movie = new Movie({
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name,
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
  });
  movie = await movie.save();
  res.send(movie);
});

// UPDATE MOVIE
router.put('/:id', authMiddleware, async (req, res) => {
  const { error } = validateMovie(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send('Invalid Genre ID');

  const movie = await Movie.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      genre: {
        _id: genre._id,
        name: genre.name,
      },
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate,
    },
    { new: true }
  );
  if (!movie) return res.status(404).send('Invalid Movie ID');
  res.send(movie);
});

// DELETE MOVIE
router.delete('/:id', authMiddleware, async (req, res) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    const movie = await Movie.findByIdAndRemove(req.params.id);
    if (!movie) return res.status(404).send('Invalid Movie ID');
    res.send(movie);
  } else {
    return res.status(404).send('Invalid ID Format');
  }
});

module.exports = router;
