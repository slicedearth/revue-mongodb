const express = require('express');
const mongoose = require('mongoose');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');
const { Album, validateAlbum } = require('../models/albumModel');
const { Genre } = require('../models/genreModel');
const { Artist } = require('../models/artistModel');
const router = express.Router();

// GET ALBUMS
router.get('/', async (req, res) => {
  const albums = await Album.find()
    .populate('artist')
    .populate('genre')
    .sort('title');
  res.send(albums);
});

// GET ALBUM BY ID
router.get('/:id', async (req, res) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    const album = await Album.findById(req.params.id)
      .populate('artist')
      .populate('genre');
    if (!album) return res.status(404).send('Invalid Album ID');
    res.send(album);
  } else {
    return res.status(404).send('Invalid ID Format');
  }
});

// POST ALBUM
router.post('/', authMiddleware, async (req, res) => {
  const { error } = validateAlbum(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(404).send('Invalid Genre ID');
  const artist = await Artist.findById(req.body.artistId);
  if (!artist) return res.status(400).send('Invalid Artist ID');

  let album = new Album({
    title: req.body.title,
    genre: req.body.genreId,
    artist: req.body.artistId,
    year: req.body.year,
  });
  album = await album.save();
  res.send(album);
});

// UPDATE ALBUM
router.put('/:id', authMiddleware, async (req, res) => {
  const { error } = validateAlbum(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send('Invalid Genre ID');
  const artist = await Artist.findById(req.body.artistId);
  if (!artist) return res.status(400).send('Invalid Artist ID');

  const album = await Album.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      genre: req.body.genreId,
      artist: req.body.artistId,
      year: req.body.year,
    },
    { new: true }
  );
  if (!album) return res.status(404).send('Invalid Album ID');
  res.send(album);
});

// DELETE ALBUM
router.delete('/:id', [authMiddleware, adminMiddleware], async (req, res) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    const album = await Album.findByIdAndRemove(req.params.id);
    if (!album) return res.status(404).send('Invalid Album ID');
    res.send(album);
  } else {
    return res.status(404).send('Invalid ID Format');
  }
});

module.exports = router;
