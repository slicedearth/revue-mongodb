const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

// ARTIST SCHEMA
const artistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
});

// ARTIST MODEL
const Artist = mongoose.model('Artist', artistSchema);

// ARTIST VALIDATION
validateArtist = (artist) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
  });
  return schema.validate(artist);
};

module.exports.Artist = Artist;
module.exports.validateArtist = validateArtist;
module.exports.artistSchema = artistSchema;
