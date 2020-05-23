const path = require('path');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Planet = require('../models/Planet');

// @desc    Get all planets
// @route   GET /api/v1/planets
// @access  Public
exports.getPlanets = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc    Get single planet
// @route   GET /api/v1/planets/:id
// @access  Public
exports.getPlanet = asyncHandler(async (req, res, next) => {
  const planet = await Planet.findById(req.params.id);

  if(!planet) {
    return next(
        new ErrorResponse(`Planet not found with ID of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: planet });
});

// @desc    Create new planet
// @route   POST /api/v1/planets
// @access  Private
exports.createPlanet = asyncHandler(async (req, res, next) => {
  const planet = await Planet.create(req.body);

  res.status(201).json({ success: true, data: planet });
});

// @desc    Update planet
// @route   PUT /api/v1/planets/:id
// @access  Private
exports.updatePlanet = asyncHandler(async (req, res, next) => {
  let planet = await Planet.findById(req.params.id);

  if(!planet) {
    return next(
        new ErrorResponse(`Planet not found with ID of ${req.params.id}`, 404)
    );
  }

  // Make sure user is planet owner
  if(planet.colonisedBy.toString() !== req.user.player.id && req.user.role !== 'admin') {
    return next(
        new ErrorResponse(`Player ${req.user.id} is not authorized to update this planet`, 401)
    );
  }

  planet = await Planet.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

  res.status(200). json({ success: true, data: planet });
});

// @desc    Delete planet
// @route   DELETE /api/v1/planets/:id
// @access  Private
exports.deletePlanet = asyncHandler(async (req, res, next) => {
  const planet = await Planet.findById(req.params.id);

  if(!planet) {
    return next(
        new ErrorResponse(`Planet not found with ID of ${req.params.id}`, 404)
    );
  }

  // Make sure player is planet owner
  if(planet.colonisedBy.toString() !== req.user.player.id && req.user.role !== 'admin') {
    return next(
        new ErrorResponse(`Player ${req.user.player.id} is not authorized to delete this planet`, 401)
    );
  }

  planet.remove();

  res.status(200). json({ success: true, data: {} });
});