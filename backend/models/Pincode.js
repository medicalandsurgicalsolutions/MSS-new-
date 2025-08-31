const mongoose = require("mongoose");

const pincodeSchema = new mongoose.Schema(
  {
    pin: {
      type: Number,
      required: true,
      unique: true,
    },
    branch: {
      type: String
    },
    status: {
      type: String,
      lowercase: true,
      enum: ["show", "hide"],
      default: "show",
    },
  },
  {
    timestamps: true,
  }
);

// module.exports = categorySchema;

const Partner = mongoose.model("Pincode", pincodeSchema);
module.exports = Partner;
