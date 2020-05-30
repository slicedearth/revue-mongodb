const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const { genreSchema } = require('./genreModel');

// MOVIE SCHEMA
const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 255,
  },
  genre: {
    type: genreSchema,
    required: true,
  },
  numberInStock: {
    type: Number,
    required: true,
    min: 0,
    max: 999,
  },
  dailyRentalRate: {
    type: Number,
    required: true,
    min: 0,
    max: 999,
  },
});

// MOVIE MODEL
const Movie = mongoose.model('Movies', movieSchema);

// MOVIE VALIDATION
validateMovie = (movie) => {
  const schema = Joi.object({
    title: Joi.string().min(1).max(255).required(),
    genreId: Joi.objectId().required(),
    numberInStock: Joi.number().min(0).max(999).required(),
    dailyRentalRate: Joi.number().min(0).max(999).required(),
  });
  return schema.validate(movie);
};
module.exports.Movie = Movie;
module.exports.validateMovie = validateMovie;
