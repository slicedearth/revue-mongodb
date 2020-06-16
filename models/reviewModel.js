const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const { albumSchema } = require('./albumModel');
// REVIEW SCHEMA
const reviewSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 255,
  },
  album: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Albums',
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 10,
  },
  reviewText: {
    type: String,
    required: true,
    minlength: 15,
    maxlength: 2000,
  },
});

// REVIEW MODEL
const Review = mongoose.model('Reviews', reviewSchema);

// REVIEW VALIDATION
validateReview = (review) => {
  const schema = Joi.object({
    title: Joi.string().min(1).max(255).required(),
    albumId: Joi.objectId().required(),
    rating: Joi.number().min(0).max(10).required(),
    reviewText: Joi.string().min(15).max(2000).required(),
  });
  return schema.validate(review);
};
module.exports.Review = Review;
module.exports.validateReview = validateReview;
