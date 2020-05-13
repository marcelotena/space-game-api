const express = require('express');
const {
  getCustomers,
  getCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer
} = require('../../controllers/customers');

const Customer = require('../../models/Customer');

const router = express.Router();

const advancedResults = require('../../middleware/advancedResults');
const { protect, authorize } = require('../../middleware/auth');

router
    .route('/')
    .get(advancedResults(Customer), protect, authorize('admin'), getCustomers);

module.exports = router;