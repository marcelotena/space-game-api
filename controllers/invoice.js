const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Invoice = require('../models/Invoice');
const Customer = require('../models/Customer');

// @desc    Get all invoices
// @route   GET /api/v1/invoices
// @access  Private - Admin
exports.getInvoices = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc    Get all customer's invoices
// @route   GET /api/v1/invoices/customer/:customerId
// @access  Private - Admin, Customer
// TODO: Test when data is added
exports.getCustomerInvoices = asyncHandler(async (req, res, next) => {
  // Check for issued invoice
  const issuedInvoice = await Invoice.findOne({ customer: req.params.customerId });

  // Make sure user is invoice recipient
  if(issuedInvoice && issuedInvoice.customer.user.id.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
        new ErrorResponse(`User ${req.user.id} is not the recipient for these invoices`, 401)
    );
  }

  res.status(200).json(res.advancedResults);
});

// @desc    Get single invoice
// @route   GET /api/v1/invoices/:id
// @access  Private - Admin
exports.getInvoice = asyncHandler(async (req, res, next) => {
  const invoice = await Invoice.findById(req.params.id);

  if(!invoice) {
    return next(
        new ErrorResponse(`Invoice not found with ID of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: invoice });
});

// @desc    Create new invoice
// @route   POST /api/v1/invoices
// @access  Private - Admin
exports.createInvoice = asyncHandler(async (req, res, next) => {
  // Find customer and populate customerDetails
  const customer = await Customer.findOne({ _id: req.body.customer });

  if(!customer) {
    return next(
        new ErrorResponse(`Customer not found with ID of ${req.body.customer}`, 404)
    );
  }

  const { name, email, location, companyId } = customer;
  req.body.customerDetails = {
    name,
    email,
    location,
    companyId
  };

  const invoice = await Invoice.create(req.body);

  res.status(201).json({ success: true, data: invoice });
});

// @desc    Update invoice
// @route   PUT /api/v1/invoices/:id
// @access  Private - Admin
exports.updateInvoice = asyncHandler(async (req, res, next) => {
  let invoice = await Invoice.findById(req.params.id);

  if(!invoice) {
    return next(
        new ErrorResponse(`Invoice not found with ID of ${req.params.id}`, 404)
    );
  }

  invoice = await Invoice.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

  res.status(200). json({ success: true, data: invoice });
});

// @desc    Delete invoice
// @route   DELETE /api/v1/invoices/:id
// @access  Private - Admin
exports.deleteInvoice = asyncHandler(async (req, res, next) => {
  const invoice = await Invoice.findById(req.params.id);

  if(!invoice) {
    return next(
        new ErrorResponse(`Invoice not found with ID of ${req.params.id}`, 404)
    );
  }

  invoice.remove();

  res.status(200). json({ success: true, data: {} });
});

