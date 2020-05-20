const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

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

module.exports.Customer = Customer;
module.exports.validateCustomer = validateCustomer;
