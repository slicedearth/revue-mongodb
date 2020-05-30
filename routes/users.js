const express = require('express');
const mongoose = require('mongoose');
const _ = require('lodash');
const { User, validateUser } = require('../models/userModel');
const router = express.Router();

// POST USER
router.post('/', async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('Email already in use.');

  user = new User(_.pick(req.body, ['name', 'email', 'password']));

  await user.save();
  //   res.send({
  //     name: user.name,
  //     email: user.email,
  //   });
  res.send(_.pick(user, ['_id', 'name', 'email']));
});

module.exports = router;
