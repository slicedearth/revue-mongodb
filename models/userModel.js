const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const passwordComplexity = require('joi-password-complexity');

// PASSWORD COMPLEXITY PARAMETERS
const complexityOptions = {
  min: 8,
  max: 128,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
  symbol: 1,
  requirementCount: 4,
};

// USER SCHEMA
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 255,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
});

// USER MODEL
const User = mongoose.model('User', userSchema);

// USER VALIDATION
validateUser = (user) => {
  const schema = Joi.object({
    name: Joi.string().min(1).max(255).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: passwordComplexity(complexityOptions).required(),
  });
  return schema.validate(user);
};
module.exports.User = User;
module.exports.validateUser = validateUser;
