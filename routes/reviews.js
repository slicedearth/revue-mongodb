const express = require('express');
const mongoose = require('mongoose');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');
const { Review, validateReview } = require('../models/reviewModel');
const { Album } = require('../models/albumModel');
const router = express.Router();

// GET REVIEWS FROM MONGODB DATABASE
router.get('/', async (req, res) => {
  // FINDS REVIEWS AND POPULATES THE ALBUM, GENRE AND ARTIST FIELDS WITH THEIR DATA. THEN SORTS ALL REVIEWS BASED ON THEIR TITLE
  const reviews = await Review.find()
    .populate({
      path: 'album',
      populate: [
        {
          path: 'genre',
          model: 'Genre',
        },
        {
          path: 'artist',
          model: 'Artist',
        },
      ],
    })
    .sort('title');
  res.send(reviews);
});

// GET SINGLE REVIEW BY ID FROM MONGODB DATABASE
router.get('/:id', async (req, res) => {
  // CHECKS IF ID PARAMETER IS AN OBJECT ID
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    // FINDS A REVIEW WITH THE MATCHING ID PARAMETER & POPULATES ALBUM, GENRE & ARTIST FIELDS
    const review = await Review.findById(req.params.id).populate({
      path: 'album',
      populate: [
        {
          path: 'genre',
          model: 'Genre',
        },
        {
          path: 'artist',
          model: 'Artist',
        },
      ],
    });
    // IF THE ID CANNOT BE FOUND SEND 400 CODE
    if (!review) return res.status(404).send('Invalid Review ID');
    // SEND REVIEW BACK TO THE USER
    res.send(review);
  } else {
    // RETURN 404 ERROR IF ID PARAM IS NOT AN OBJECT ID
    return res.status(404).send('Invalid ID Format');
  }
});

// GET SINGLE REVIEW DATA BY ID FROM MONGODB DATABASE -- USED WHEN EDITING ON REVIEWS ON THE CLIENT SIDE
router.get('/data/:id', async (req, res) => {
  // CHECKS IF ID PARAMETER IS AN OBJECT ID
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    // FINDS A REVIEW WITH THE MATCHING ID PARAMETER WITHOUT POPULATING ALBUM, GENRE & ARTIST FIELDS
    const review = await Review.findById(req.params.id);

    // CAN BE USED TO EXCLUDE CERTAIN DATA FROM BEING RETURNED
    // .select(
    //   '-__v -_id -album'
    // );

    // IF THE ID CANNOT BE FOUND SEND 400 CODE
    if (!review) return res.status(404).send('Invalid Review ID');
    // SEND REVIEW BACK TO THE USER
    res.send(review);
  } else {
    // RETURN 404 ERROR IF ID PARAM IS NOT AN OBJECT ID
    return res.status(404).send('Invalid ID Format');
  }
});

// POST REVIEW TO MONGODB DATABASE -- AUTHENTICATED USERS ONLY
router.post('/', authMiddleware, async (req, res) => {
  // CHECKS FOR INPUT VALIDATION ERRORS
  const { error } = validateReview(req.body);
  // IF THERE IS AN INPUT VALIDATION ERROR SEND 400 STATUS CODE TO USER THAT INCLUDES THE ERROR MESSAGE
  if (error) return res.status(400).send(error.details[0].message);
  // SEARCHES FOR ALBUM BASED ON ALBUM ID ENTERED BY THE USER
  const album = await Album.findById(req.body.albumId);
  // IF AN ALBUM CANNOT BE FOUND SEND 404 STATUS CODE TO THE USER
  if (!album) return res.status(404).send('Invalid Album ID');
  // SETS NEW REVIEW DATA BASED ON INPUT DATA
  let review = new Review({
    title: req.body.title,
    author: req.body.author,
    album: req.body.albumId,
    rating: req.body.rating,
    reviewText: req.body.reviewText,
  });
  // SAVES REVIEW TO DATABASE
  review = await review.save();
  // SENDS BACK REVIEW
  res.send(review);
});

// UPDATE REVIEW IN MONGODB DATABASE -- AUTHENTICATED USERS ONLY
router.put('/:id', authMiddleware, async (req, res) => {
  // CHECKS FOR INPUT VALIDATION ERRORS
  const { error } = validateReview(req.body);
  // IF THERE IS AN INPUT VALIDATION ERROR SEND 400 STATUS CODE TO USER THAT INCLUDES THE ERROR MESSAGE
  if (error) return res.status(400).send(error.details[0].message);
  // SEARCHES FOR ALBUM BASED ON ALBUM ID ENTERED BY THE USER
  const album = await Album.findById(req.body.albumId);
  // IF AN ALBUM CANNOT BE FOUND SEND 404 STATUS CODE TO THE USER
  if (!album) return res.status(404).send('Invalid Album ID');
  // FIND REVIEW BY ID AND UPDATE DATA BASED ON INPUT DATA
  const review = await Review.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      author: req.body.author,
      album: req.body.albumId,
      rating: req.body.rating,
      reviewText: req.body.reviewText,
    },
    { new: true }
  );
  // IF REVIEW CANNOT BE FOUND SEND 404 STATUS CODE TO THE USER
  if (!review) return res.status(404).send('Invalid Review ID');
  // SEND REVIEW BACK TO USER
  res.send(review);
});

// DELETE REVIEW FROM MONGODB DATABASE -- ADMINISTRATORS ONLY
router.delete('/:id', [authMiddleware, adminMiddleware], async (req, res) => {
  // CHECKS IF ID PARAMETER IS AN OBJECT ID
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    // FIND REVIEW BASED ON ID AND REMOVE FROM DATABASE
    const review = await Review.findByIdAndRemove(req.params.id);
    // IF REVIEW IS NOT FOUND RETURN 404 STATUS CODE TO USER
    if (!review) return res.status(404).send('Invalid Review ID');
    // SEND DELETED REVIEW DATA BACK TO THE USER
    res.send(review);
  } else {
    // IF ID PARAMETER IS INVALID RETURN 404 STATUS CODE TO THE USER
    return res.status(404).send('Invalid ID Format');
  }
});

module.exports = router;
