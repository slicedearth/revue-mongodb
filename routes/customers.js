const express = require('express');
const mongoose = require('mongoose');
const authMiddleware = require('../middleware/authMiddleware');
const { Customer, validateCustomer } = require('../models/customerModel');
const router = express.Router();

// GET CUSTOMERS
router.get('/', async (req, res) => {
  const customers = await Customer.find().sort('name');
  res.send(customers);
});

// GET CUSTOMER BY ID
router.get('/:id', async (req, res) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    const customer = await Customer.findById(req.params.id);

    if (!customer) return res.status(404).send('Invalid Customer ID');
    res.send(customer);
  } else {
    return res.status(404).send('Invalid ID Format');
  }
});

// POST CUSTOMER
router.post('/', authMiddleware, async (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  let customer = new Customer({
    name: req.body.name,
    isGold: req.body.isGold,
    phone: req.body.phone,
  });
  customer = await customer.save();

  res.send(customer);
});

// UPDATE CUSTOMER
router.put('/:id', authMiddleware, async (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name, isGold: req.body.isGold, phone: req.body.phone },
    { new: true }
  );
  if (!customer) {
    return res.status(404).send('Invalid Customer ID');
  }

  res.send(customer);
});

// DELETE CUSTOMER
router.delete('/:id', authMiddleware, async (req, res) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    const customer = await Customer.findByIdAndRemove(req.params.id);

    if (!customer) {
      return res.status(404).send('Invalid Customer ID');
    }

    res.send(customer);
  } else {
    return res.status(404).send('Invalid ID Format');
  }
});

module.exports = router;
