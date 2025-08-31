const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    role:  {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
      required: true,
    },
    staff: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Staff",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
