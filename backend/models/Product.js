const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      required: true,
      unique: true,
    },
    productRefrenceNo: {
      type: String,
      required: false,
    },
    moq: {
      type: String,
      required: false,
    },
    packing: {
      type: String,
      required: false,
    },
    sku: {
      type: String,
      required: false,
    },
    hsn: {
      type: String,
      required: false,
    },
    gst: {
      type: Number,
      required: false,
    },
    barcode: {
      type: String,
      required: false,
    },
    title: {
      type: Object,
      required: true,
      unique: true,
    },
    description: {
      type: Object,
      required: false,
    },
    metatitle: {
      type: Object,
      required: false,
    },
    metadescription: {
      type: Object,
      required: false,
    },
    slug: {
      type: String,
      required: true,
    },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
      required: false,
    },
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
      },
    ],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    image: {
      type: Array,
      required: false,
    },
    stock: {
      type: Number,
      required: false,
    },

    sales: {
      type: Number,
      required: false,
    },

    tag: [String],
    prices: {
      originalPrice: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      discount: {
        type: Number,
        required: false,
      },
    },
    variants: [{}],
    isCombination: {
      type: Boolean,
      required: true,
    },
    isCodAvaialble: {
      type: Boolean,
      default: false
    },
    deliveryCharge: {
      type: Number,
      default: false
    },
    status: {
      type: String,
      default: "show",
      enum: ["show", "hide"],
    },
  },
  {
    timestamps: true,
  }
);

// module.exports = productSchema;

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
