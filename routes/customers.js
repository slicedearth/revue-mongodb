const express = require('express');
const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const router = express.Router();

// CUSTOMER SCHEMA
const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 255,
  },
  isGold: {
    type: Boolean,
    default: false,
  },
  phone: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 20,
  },
});

// CUSTOMER MODEL
const Customer = mongoose.model('Customer', customerSchema);

// CUSTOMER VALIDATION
validateCustomer = (customer) => {
  const schema = Joi.object({
    name: Joi.string().min(1).max(255).required(),
    isGold: Joi.boolean(),
    phone: Joi.string().min(5).max(20).required(),
  });
  return schema.validate(customer);
};

// GET CUSTOMERS
router.get('/', async (req, res) => {
  const customers = await Customer.find().sort('name');
  res.send(customers);
});

// GET CUSTOMERS BY ID
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
router.post('/', async (req, res) => {
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
router.put('/:id', async (req, res) => {
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
router.delete('/:id', async (req, res) => {
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
