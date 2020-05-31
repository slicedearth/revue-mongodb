const express = require('express');
const mongoose = require('mongoose');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');
const { Genre, validateGenre } = require('../models/genreModel');
const router = express.Router();

// GET GENRES
router.get('/', async (req, res, next) => {
  try {
    const genres = await Genre.find().sort('name');
    res.send(genres);
  } catch (ex) {
    next(ex);
  }
});

// GET GENRE BY ID
router.get('/:id', async (req, res, next) => {
  try {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
      const genre = await Genre.findById(req.params.id);
      if (!genre) return res.status(404).send('Invalid Genre ID');
      res.send(genre);
    } else {
      return res.status(404).send('Invalid ID Format');
    }
  } catch (ex) {
    next(ex);
  }
});

// POST GENRE
router.post('/', authMiddleware, async (req, res, next) => {
  try {
    const { error } = validateGenre(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    let genre = new Genre({ name: req.body.name });
    genre = await genre.save();

    res.send(genre);
  } catch (ex) {
    next(ex);
  }
});

// UPDATE GENRE
router.put('/:id', authMiddleware, async (req, res, next) => {
  try {
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
  } catch (ex) {
    next(ex);
  }
});

// DELETE GENRE
router.delete(
  '/:id',
  [authMiddleware, adminMiddleware],
  async (req, res, next) => {
    try {
      if (mongoose.Types.ObjectId.isValid(req.params.id)) {
        const genre = await Genre.findByIdAndRemove(req.params.id);

        if (!genre) {
          return res.status(404).send('Invalid Genre ID');
        }

        res.send(genre);
      } else {
        return res.status(404).send('Invalid ID Format');
      }
    } catch (ex) {
      next(ex);
    }
  }
);

module.exports = router;
