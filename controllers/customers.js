const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Customer = require('../models/Customer');

// @desc    Get all customers
// @route   GET /api/v1/customers
// @access  Private
exports.getCustomers = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc    Get single customer
// @route   GET /api/v1/customer/:id
// @access  Private
exports.getCustomer = asyncHandler(async (req, res, next) => {
  const customer = await Customer.findById(req.params.id);

  if(!customer) {
    return next(
        new ErrorResponse(`Customer not found with ID of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: customer });
});

// @desc    Create new customer
// @route   POST /api/v1/customers
// @access  Private
exports.createCustomer = asyncHandler(async (req, res, next) => {
  const { name, email, address, companyId } = req.body;

  const customer = await Customer.create({
    name,
    email,
    address,
    companyId
  });

  res.status(201).json({ success: true, data: customer });
});

// @desc    Update customer
// @route   PUT /api/v1/customers/:id
// @access  Private
exports.updateCustomer = asyncHandler(async (req, res, next) => {
  let customer = await Customer.findById(req.params.id);

  if(!customer) {
    return next(
        new ErrorResponse(`Bootcamp not found with ID of ${req.params.id}`, 404)
    );
  }

  customer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

  res.status(200). json({ success: true, data: customer });
});

// @desc    Delete customer
// @route   DELETE /api/v1/customers/:id
// @access  Private
exports.deleteCustomer = asyncHandler(async (req, res, next) => {
  const customer = await Customer.findById(req.params.id);

  if(!customer) {
    return next(
        new ErrorResponse(`Customer not found with ID of ${req.params.id}`, 404)
    );
  }

  customer.remove();

  res.status(200). json({ success: true, data: {} });
});