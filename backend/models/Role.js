const mongoose = require("mongoose");

const permissionSchema = new mongoose.Schema(
  {
    name: {
      type: Object,
      required: true,
    },
    permissions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Permission"
      },
    ],
    status: {
      type: String,
      lowercase: true,
      enum: ['show', 'hide'],
      default: 'show',
    }
  },
  {
    timestamps: true,
  }
);

const Role = mongoose.model("Role", permissionSchema);

module.exports = Role;
