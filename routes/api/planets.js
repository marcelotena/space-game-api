const express = require('express');
const {
  getPlanets,
  getPlanet,
  createPlanet,
  updatePlanet,
  deletePlanet
} = require('../../controllers/planets');

const Planet = require('../../models/Planet');

// Include other resource routers
//const playerRouter = require('./players');

const router = express.Router();

const advancedResults = require('../../middleware/advancedResults');
const { protect, authorize } = require('../../middleware/auth');

// Re-route into other resource routers
//router.use('/:planetId/player', playerRouter);

router
    .route('/')
    //.get(advancedResults(Planet, 'colonisedBy'), getPlanets)
    .get(advancedResults(Planet), getPlanets)
    .post(protect, authorize('admin'), createPlanet);

router
    .route('/:id')
    .get(getPlanet)
    .put(protect, authorize('player', 'admin'), updatePlanet)
    .delete(protect, authorize('player', 'admin'), deletePlanet);

module.exports = router;