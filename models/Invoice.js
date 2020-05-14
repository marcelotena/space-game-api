const mongoose = require('mongoose');

const InvoiceSchema = new mongoose.Schema({
  customer: {
    type: Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  },
  issuer: {
    //Todo: Create issuer model,
    // type: Schema.Types.ObjectId,
    // ref: 'Issuer',
    // required: true
  },
  invoiceName: {
    type: String,
    required: [true, 'Please add an invoice name (i.e.: FV-1)'],
  },
  items: [
    {
      name: String,
      quantity: Number,
      base: Number
    }
  ],
  invoiceTax: {
    type: Number,
    default: 21
  },
  invoiceRetention: {
    type: Number,
    default: 0
  },
  invoiceDate: {
    type: Date,
    default: Date.now
  },
  notes: String,
  conditions: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('Invoice', InvoiceSchema);