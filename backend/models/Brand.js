const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: Object,
      required: true,
      unique: true,
    },
    description: {
      type: Object,
      required: false,
    },
    website: {
      type: String,
      required: false,
    },
    icon: {
      type: String,
      required: false,
    },
    slug: {
      type: String,
      required: true,
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

const Brand = mongoose.model('Brand', brandSchema);
module.exports = Brand;
