const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema(
  {
    title: {
      type: Object,
      required: true,
    },
    logo: {
      type: String,
      required: false,
    },
    couponCode: {
      type: String,
      required: true,
    },
    couponAll: {
      type: String,
      required: true,
    },
    startTime: {
      type: Date,
      required: false,
    },
    endTime: {
      type: Date,
      required: true,
    },
    discountType: {
      type: Object,
      required: false,
    },
    minimumAmount: {
      type: Number,
      required: true,
    },
    productType: {
      type: String,
      required: false,
    },
    type: {
      type: String,
      lowercase: true,
      enum: ['public', 'user'],
      default: 'public',
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
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

// module.exports = couponSchema;

const Coupon = mongoose.model('Coupon', couponSchema);
module.exports = Coupon;
