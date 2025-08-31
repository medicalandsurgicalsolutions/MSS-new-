const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema(
  {
    phone: {
      type: Number,
      required: true,
    },
    otp: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// module.exports = categorySchema;

const Otp = mongoose.model('Otp', otpSchema);
module.exports = Otp;
