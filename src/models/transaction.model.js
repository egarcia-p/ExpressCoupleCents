const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');

const transactionSchema = mongoose.Schema({
  isExpense: {
    type: Boolean,
    required: true,
  },
  amount: {
    type: mongoose.SchemaTypes.Decimal128,
    required: true,
  },
  note: {
    type: String,
    trim: true,
  },
  establishment: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  isEssential: {
    type: Boolean,
    required: true,
  },
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    required: true,
  },
  family: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Family',
    required: true,
  },
  transactionDate: {
    type: Date,
    required: true,
  },
});

// add plugin that converts mongoose to json
transactionSchema.plugin(toJSON);
transactionSchema.plugin(paginate);

/**
 * @typedef Transaction
 */
const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;