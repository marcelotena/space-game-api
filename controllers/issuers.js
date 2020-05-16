const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Issuer = require('../models/Issuer');

// @desc    Get all issuers
// @route   GET /api/v1/issuers
// @access  Private
exports.getIssuers = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc    Get single issuer
// @route   GET /api/v1/issuer/:id
// @access  Private
exports.getIssuer = asyncHandler(async (req, res, next) => {
  const issuer = await Issuer.findById(req.params.id);

  if(!issuer) {
    return next(
        new ErrorResponse(`Issuer not found with ID of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: issuer });
});

// @desc    Create new issuer
// @route   POST /api/v1/issuers
// @access  Private
exports.createIssuer = asyncHandler(async (req, res, next) => {
  const { name, email, address, companyId } = req.body;

  const issuer = await Issuer.create({
    name,
    email,
    address,
    companyId
  });

  res.status(201).json({ success: true, data: issuer });
});

// @desc    Update issuer
// @route   PUT /api/v1/issuers/:id
// @access  Private
exports.updateIssuer = asyncHandler(async (req, res, next) => {
  let issuer = await Issuer.findById(req.params.id);

  if(!issuer) {
    return next(
        new ErrorResponse(`Bootcamp not found with ID of ${req.params.id}`, 404)
    );
  }

  issuer = await Issuer.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

  res.status(200). json({ success: true, data: issuer });
});

// @desc    Delete issuer
// @route   DELETE /api/v1/issuers/:id
// @access  Private
exports.deleteIssuer = asyncHandler(async (req, res, next) => {
  const issuer = await Issuer.findById(req.params.id);

  if(!issuer) {
    return next(
        new ErrorResponse(`Issuer not found with ID of ${req.params.id}`, 404)
    );
  }

  issuer.remove();

  res.status(200). json({ success: true, data: {} });
});