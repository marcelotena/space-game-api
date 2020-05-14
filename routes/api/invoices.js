const express = require('express');
const {
  getInvoices,
  getInvoice,
  createInvoice,
  updateInvoice,
  deleteInvoice
} = require('../../controllers/invoice');

const Invoice = require('../../models/Invoice');

const router = express.Router();

const advancedResults = require('../../middleware/advancedResults');
const { protect, authorize } = require('../../middleware/auth');

router
    .route('/')
    .get(advancedResults(Invoice, 'customer'), protect, authorize('admin'), getInvoices)
    .post(protect, authorize('admin'), createInvoice);

router
    .route('/:id')
    .get(advancedResults(Invoice, 'customer'), protect, authorize('admin'), getInvoice)
    .put(protect, authorize('admin'), updateInvoice)
    .delete(protect, authorize('admin'), deleteInvoice);

module.exports = router;