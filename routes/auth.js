const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const mongoose = require('mongoose');
const express = require('express');
const Joi = require('@hapi/joi');
const passwordComplexity = require('joi-password-complexity');
const { User, complexityOptions } = require('../models/userModel');
const router = express.Router();

// POST AUTH
router.post('/', async (req, res) => {
  const { error } = validateAuth(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('Invalid email or password.');

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('Invalid email or password.');

  const token = jwt.sign({ _id: user._id }, 'myPrivateKey');
  res.send(token);
});

// AUTH VALIDATION
validateAuth = (auth) => {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: passwordComplexity(complexityOptions).required(),
  });
  return schema.validate(auth);
};
module.exports = router;
