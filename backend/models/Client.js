const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema(
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

const Client = mongoose.model('Client', clientSchema);
module.exports = Client;
