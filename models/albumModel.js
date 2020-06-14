const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const { genreSchema } = require('./genreModel');
const { artistSchema } = require('./artistModel');
// ALBUM SCHEMA
const albumSchema = new mongoose.Schema({
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
  artist: {
    type: artistSchema,
    required: true,
  },
});

// ALBUM MODEL
const Album = mongoose.model('Albums', albumSchema);

// ALBUM VALIDATION
validateAlbum = (album) => {
  const schema = Joi.object({
    title: Joi.string().min(1).max(255).required(),
    genreId: Joi.objectId().required(),
    artistId: Joi.objectId().required(),
  });
  return schema.validate(album);
};
module.exports.Album = Album;
module.exports.albumSchema = albumSchema;
module.exports.validateAlbum = validateAlbum;
