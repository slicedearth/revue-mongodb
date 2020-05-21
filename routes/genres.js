const express = require('express');
const mongoose = require('mongoose');
const { Genre, validateGenre } = require('../models/genreModel');
const router = express.Router();

// GET GENRES
router.get('/', async (req, res) => {
  const genres = await Genre.find().sort('name');
  res.send(genres);
});

// GET GENRE BY ID
router.get('/:id', async (req, res) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    const genre = await Genre.findById(req.params.id);
    if (!genre) return res.status(404).send('Invalid Genre ID');
    res.send(genre);
  } else {
    return res.status(404).send('Invalid ID Format');
  }
});

// POST GENRE
router.post('/', async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  let genre = new Genre({ name: req.body.name });
  genre = await genre.save();

  res.send(genre);
});

// UPDATE GENRE
router.put('/:id', async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );
  if (!genre) {
    return res.status(404).send('Invalid Genre ID');
  }

  res.send(genre);
});

// DELETE GENRE
router.delete('/:id', async (req, res) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    const genre = await Genre.findByIdAndRemove(req.params.id);

    if (!genre) {
      return res.status(404).send('Invalid Genre ID');
    }

    res.send(genre);
  } else {
    return res.status(404).send('Invalid ID Format');
  }
});

module.exports = router;
