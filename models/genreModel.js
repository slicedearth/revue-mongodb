const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

// GENRE SCHEMA
const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
});

// GENRE MODEL
const Genre = mongoose.model('Genre', genreSchema);

// GENRE VALIDATION
validateGenre = (genre) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
  });
  return schema.validate(genre);
};

module.exports.Genre = Genre;
module.exports.validateGenre = validateGenre;
