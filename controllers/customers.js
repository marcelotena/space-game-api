const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Customer = require('../models/Customer');

// @desc    Get all customers
// @route   GET /api/v1/customers
// @access  Private
exports.getCustomers = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});