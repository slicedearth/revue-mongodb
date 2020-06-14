const express = require('express');
const mongoose = require('mongoose');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');
const { Artist, validateArtist } = require('../models/artistModel');
const router = express.Router();

// GET ARTISTS
router.get('/', async (req, res, next) => {
  // throw new Error('Could not get the artists.');
  const artists = await Artist.find().sort('name');
  res.send(artists);
});

// GET ARTIST BY ID
router.get('/:id', async (req, res, next) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    const artist = await Artist.findById(req.params.id);
    if (!artist) return res.status(404).send('Invalid Artist ID');

    res.send(artist);
  } else {
    return res.status(404).send('Invalid ID Format');
  }
});

// POST ARTIST
router.post('/', authMiddleware, async (req, res, next) => {
  const { error } = validateArtist(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  let artist = new Artist({ name: req.body.name });
  artist = await artist.save();

  res.send(artist);
});

// UPDATE ARTIST
router.put('/:id', authMiddleware, async (req, res, next) => {
  const { error } = validateArtist(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const artist = await Artist.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );
  if (!artist) {
    return res.status(404).send('Invalid Artist ID');
  }

  res.send(artist);
});

// DELETE ARTIST
router.delete(
  '/:id',
  [authMiddleware, adminMiddleware],
  async (req, res, next) => {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
      const artist = await Artist.findByIdAndRemove(req.params.id);

      if (!artist) {
        return res.status(404).send('Invalid Artist ID');
      }

      res.send(artist);
    } else {
      return res.status(404).send('Invalid ID Format');
    }
  }
);

module.exports = router;
