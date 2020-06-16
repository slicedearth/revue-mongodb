const express = require('express');
const mongoose = require('mongoose');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');
const { Review, validateReview } = require('../models/reviewModel');
const { Album } = require('../models/albumModel');
const router = express.Router();

// GET REVIEWS
router.get('/', async (req, res) => {
  const reviews = await Review.find().populate('album').sort('title');
  res.send(reviews);
});

// GET REVIEW BY ID
router.get('/:id', async (req, res) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).send('Invalid Review ID');
    res.send(review);
  } else {
    return res.status(404).send('Invalid ID Format');
  }
});

// POST REVIEW
router.post('/', authMiddleware, async (req, res) => {
  const { error } = validateReview(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const album = await Album.findById(req.body.albumId);
  if (!album) return res.status(404).send('Invalid Album ID');

  let review = new Review({
    title: req.body.title,
    album: req.body.albumId,
    // album: {
    //   _id: album._id,
    //   title: album.title,
    //   artist: album.artist,
    //   genre: album.genre,
    // },
    rating: req.body.rating,
    reviewText: req.body.reviewText,
  });
  review = await review.save();
  res.send(review);
});

// UPDATE REVIEW
router.put('/:id', authMiddleware, async (req, res) => {
  const { error } = validateReview(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const album = await Album.findById(req.body.albumId);
  if (!album) return res.status(400).send('Invalid Album ID');

  const review = await Review.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      album: req.body.albumId,

      // album: {
      //   _id: album._id,
      //   title: album.title,
      //   artist: album.artist,
      //   genre: album.genre,
      // },
      rating: req.body.rating,
      reviewText: req.body.reviewText,
    },
    { new: true }
  );
  if (!review) return res.status(404).send('Invalid Review ID');
  res.send(review);
});

// DELETE REVIEW
router.delete('/:id', [authMiddleware, adminMiddleware], async (req, res) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    const review = await Review.findByIdAndRemove(req.params.id);
    if (!review) return res.status(404).send('Invalid Review ID');
    res.send(review);
  } else {
    return res.status(404).send('Invalid ID Format');
  }
});

module.exports = router;
