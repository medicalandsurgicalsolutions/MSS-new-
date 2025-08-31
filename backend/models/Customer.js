const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
    flat: {
      type: String,
      required: false,
    },
    district: {
      type: String,
      required: false,
    },
    landmark: {
      type: String,
      required: false,
    },
    state: {
      type: String,
      required: false,
    },
    country: {
      type: String,
      required: false,
    },
    city: {
      type: String,
      required: false,
    },
    coupons: [
      {
        coupon: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Coupon",
          required: true,
        },
        isUsed: {
          type: Boolean,
          default: false
        },
      },
    ],
    shippingAddress: {
      type: Object,
      required: false,
      // name: {
      //   type: String,
      //   required: true,
      // },
      // contact: {
      //   type: String,
      //   required: true,
      // },
      // email: {
      //   type: String,
      //   required: true,
      //   unique: true,
      //   lowercase: true,
      // },

      // address: {
      //   type: String,
      //   required: true,
      // },
      // country: {
      //   type: String,
      //   required: true,
      // },
      // city: {
      //   type: String,
      //   required: true,
      // },
      // area: {
      //   type: String,
      //   required: true,
      // },
      // zipCode: {
      //   type: String,
      //   required: true,
      // },
      // isDefault: {
      //   type: Boolean,
      //   required: true,
      // },
    },
    email: { type: String },
    phone: {
      type: Number,
      required: false,
    },
    password: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
