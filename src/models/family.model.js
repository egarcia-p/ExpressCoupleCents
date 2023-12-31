const mongoose = require('mongoose');
//const validator = require('validator');
const { toJSON, paginate } = require('./plugins');

const familySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
familySchema.plugin(toJSON);
familySchema.plugin(paginate);

/**
 * @typedef Family
 */
const Family = mongoose.model('Family', familySchema);

module.exports = Family;
