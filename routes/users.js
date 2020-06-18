const express = require('express');
const mongoose = require('mongoose');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const authMiddleware = require('../middleware/authMiddleware');
const { User, validateUser } = require('../models/userModel');
const router = express.Router();

// POST USER
router.post('/', async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('Email already in use.');

  user = new User(_.pick(req.body, ['name', 'email', 'password']));

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  const token = user.generateAuthToken();
  res.header('x-auth-token', token);
  res.send(_.pick(user, ['_id', 'name', 'email']));
});

// GET USER
router.get('/me', authMiddleware, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.send(user);
});

// GET ALL USERS
router.get('/', [authMiddleware, adminMiddleware], async (req, res, next) => {
  const users = await User.find().sort('name');
  res.send(users);
});
module.exports = router;
