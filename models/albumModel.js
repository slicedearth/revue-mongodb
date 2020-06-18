const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

// ALBUM SCHEMA
const albumSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 255,
  },
  year: {
    type: Number,
    required: true,
    min: 1860,
    max: 2020,
  },
  genre: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Genre',
  },
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artist',
  },
});

// ALBUM MODEL
const Album = mongoose.model('Album', albumSchema);

// ALBUM VALIDATION
validateAlbum = (album) => {
  const schema = Joi.object({
    title: Joi.string().min(1).max(255).required(),
    year: Joi.number().min(1860).max(2020).required(),
    genreId: Joi.objectId().required(),
    artistId: Joi.objectId().required(),
  });
  return schema.validate(album);
};
module.exports.Album = Album;
module.exports.albumSchema = albumSchema;
module.exports.validateAlbum = validateAlbum;
