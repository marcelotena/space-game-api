const mongoose = require('mongoose');

const InvoiceSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.ObjectId,
    ref: 'Customer',
    required: true
  },
  customerDetails: {
    name: String,
    email: String,
    location: {
      // GeoJSON Point
      type: {
        type: String,
        enum: ['Point'],
      },
      coordinates: {
        type: [Number],
        index: '2dsphere'
      },
      formattedAddress: String,
      street: String,
      city: String,
      state: String,
      zipcode: String,
      country: String,
    },
    companyId: {
      type: String,
      required: [true, 'Please add a company ID']
    }
  },
  issuer: {
    //Todo: Create issuer model,
    // type: mongoose.Schema.ObjectId,
    // ref: 'Issuer',
    // required: true
  },
  invoiceName: {
    type: String,
    required: [true, 'Please add an invoice name (i.e.: FV-1)'],
    unique: true,
    maxlength: [50, 'Name can not be more than 50 characters']
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