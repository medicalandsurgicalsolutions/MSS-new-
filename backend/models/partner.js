const mongoose = require('mongoose');

const partnerSchema = new mongoose.Schema(
  {
    name: {
      type: Object,
      required: true,
      unique: true,
    },
    icon: {
      type: String,
      required: false,
    },
    website: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      lowercase: true,
      enum: ['show', 'hide'],
      default: 'show',
    },
  },
  {
    timestamps: true,
  }
);

// module.exports = categorySchema;

const Partner = mongoose.model('Partner', partnerSchema);
module.exports = Partner;
