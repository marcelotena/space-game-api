const express = require('express');
const {
  getIssuers,
  getIssuer,
  createIssuer,
  updateIssuer,
  deleteIssuer
} = require('../../controllers/issuers');

const Issuer = require('../../models/Issuer');

const router = express.Router();

const advancedResults = require('../../middleware/advancedResults');
const { protect, authorize } = require('../../middleware/auth');

router
    .route('/')
    .get(advancedResults(Issuer), protect, authorize('admin'), getIssuers)
    .post(protect, authorize('admin'), createIssuer);

router
    .route('/:id')
    .get(advancedResults(Issuer), protect, authorize('admin'), getIssuer)
    .put(protect, authorize('admin'), updateIssuer)
    .delete(protect, authorize('admin'), deleteIssuer);

module.exports = router;