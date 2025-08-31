const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema(
  {
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
        required: true,
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    rating: {
      type: Number,
      required: false,
    },
    comment: {
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


const Rating = mongoose.model('Rating', ratingSchema);
module.exports = Rating;
