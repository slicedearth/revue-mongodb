const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
// REVIEW SCHEMA -- DATA STRUCTURE FOR REVIEWS
const reviewSchema = new mongoose.Schema({
  // TITLE IS A REQUIRED TRIMMED STRING THAT MUST CONTAIN BETWEEN 1 AND 255 CHARACTERS
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 255,
  },
  // BY IS A REQUIRED STRING THAT MUST CONTAIN BETWEEN 3 AND 50 CHARACTERS
  author: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  // ALBUM IS A REQUIRED OBJECT ID THAT REFERENCES THE ID OF THE ALBUM BEING REVIEWED
  album: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Album',
    required: true,
  },
  // RATING IS A REQUIRED NUMBER BETWEEN 0 AND 10
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 10,
  },
  // REVIEWTEXT IS A REQUIRED STRING THAT IS BETWEEN 15 AND 2000 CHARACTERS
  reviewText: {
    type: String,
    required: true,
    minlength: 15,
    maxlength: 2000,
  },
});

// REVIEW MODEL -- CREATE A REVIEW MODEL BASED ON THE SCHEMA
const Review = mongoose.model('Review', reviewSchema);

// REVIEW VALIDATION USING JOI
validateReview = (review) => {
  const schema = Joi.object({
    title: Joi.string().min(1).max(255).required(),
    author: Joi.string().min(3).max(50).required(),
    albumId: Joi.objectId().required(),
    rating: Joi.number().min(0).max(10).required(),
    reviewText: Joi.string().min(15).max(2000).required(),
    album: Joi.objectId(),
    _id: Joi.objectId(),
    __v: Joi.number(),
  });
  return schema.validate(review);
};
module.exports.Review = Review;
module.exports.validateReview = validateReview;
