const express = require('express');
const mongoose = require('mongoose');
const Fawn = require('fawn');
const authMiddleware = require('../middleware/authMiddleware');
const { Rental, validateRental } = require('../models/rentalModel');
const { Movie } = require('../models/movieModel');
const { Customer } = require('../models/customerModel');
const router = express.Router();

Fawn.init(mongoose);

// GET RENTALS
router.get('/', authMiddleware, async (req, res) => {
  const rentals = await Rental.find().sort('-dateOut');
  res.send(rentals);
});
// GET RENTAL BY ID
router.get('/:id', authMiddleware, async (req, res) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    const rental = await Rental.findById(req.params.id);
    if (!rental) return res.status(404).send('Invalid Rental ID');
    res.send(rental);
  } else {
    return res.status(404).send('Invalid ID Format');
  }
});
// POST RENTAL
router.post('/', authMiddleware, async (req, res) => {
  const { error } = validateRental(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(404).send('Invalid Customer ID');

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(404).send('Invalid Movie ID');

  if (movie.numberInStock === 0)
    return res.status(400).send('Movie is not in stock.');

  let rental = new Rental({
    customer: {
      _id: customer.id,
      name: customer.name,
      phone: customer.phone,
    },
    movie: {
      _id: movie.id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate,
    },
  });
  try {
    new Fawn.Task()
      .save('rentals', rental)
      .update('movies', { _id: movie._id }, { $inc: { numberInStock: -1 } })
      .run();
    res.send(rental);
  } catch (ex) {
    res.status(500).send('Something Failed!');
  }
});

module.exports = router;
