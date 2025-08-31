const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema(
  {
    name: {
      type: Object,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    metatitle: {
      type: String,
      required: true,
    },
    metadescription: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: false,
    },
    // website: {
    //   type: String,
    //   required: false,
    // },
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

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;
