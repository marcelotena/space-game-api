const mongoose = require('mongoose');
const colors = require('colors');

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
    companyId: String
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
  currency: {
    type: String,
    default: 'EUR',
    enum: ["AED", "AFN", "ALL", "AMD", "ANG", "AOA", "ARS", "AUD", "AWG", "AZN", "BAM", "BBD", "BDT", "BGN", "BHD", "BIF", "BMD", "BND", "BOB", "BOV", "BRL", "BSD", "BTN", "BWP", "BYR", "BZD", "CAD", "CDF", "CHE", "CHF", "CHW", "CLF", "CLP", "CNY", "COP", "COU", "CRC", "CUC", "CUP", "CVE", "CZK", "DJF", "DKK", "DOP", "DZD", "EGP", "ERN", "ETB", "EUR", "FJD", "FKP", "GBP", "GEL", "GHS", "GIP", "GMD", "GNF", "GTQ", "GYD", "HKD", "HNL", "HRK", "HTG", "HUF", "IDR", "ILS", "INR", "IQD", "IRR", "ISK", "JMD", "JOD", "JPY", "KES", "KGS", "KHR", "KMF", "KPW", "KRW", "KWD", "KYD", "KZT", "LAK", "LBP", "LKR", "LRD", "LSL", "LTL", "LVL", "LYD", "MAD", "MDL", "MGA", "MKD", "MMK", "MNT", "MOP", "MRO", "MUR", "MVR", "MWK", "MXN", "MXV", "MYR", "MZN", "NAD", "NGN", "NIO", "NOK", "NPR", "NZD", "OMR", "PAB", "PEN", "PGK", "PHP", "PKR", "PLN", "PYG", "QAR", "RON", "RSD", "RUB", "RWF", "SAR", "SBD", "SCR", "SDG", "SEK", "SGD", "SHP", "SLL", "SOS", "SRD", "SSP", "STD", "SYP", "SZL", "THB", "TJS", "TMT", "TND", "TOP", "TRY", "TTD", "TWD", "TZS", "UAH", "UGX", "USD", "USN", "USS", "UYI", "UYU", "UZS", "VEF", "VND", "VUV", "WST", "XAF", "XAG", "XAU", "XBA", "XBB", "XBC", "XBD", "XCD", "XDR", "XFU", "XOF", "XPD", "XPF", "XPT", "XTS", "XXX", "YER", "ZAR", "ZMW"]
  },
  baseAmount: {
    type: Number,
    default: function() {
      if (this.items) {
        return this.items.reduce((prev, cur) => {
          return prev + cur.base * cur.quantity;
        }, 0);
      }
      return 0;
    }
  },
  invoiceTax: {
    type: Number,
    default: 21
  },
  totalTax: {
    type: Number,
    default: function() {
      if (this.items) {
        return this.items.reduce((prev, cur) => {
          return prev + cur.base * cur.quantity * this.invoiceTax / 100;
        }, 0);
      }
      return 0;
    }
  },
  invoiceRetention: {
    type: Number,
    default: 0
  },
  totalRetention: {
    type: Number,
    default: function() {
      if (this.items) {
        return this.items.reduce((prev, cur) => {
          return prev + cur.base * cur.quantity * (-this.invoiceRetention / 100);
        }, 0);
      }
      return 0;
    }
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