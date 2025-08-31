const Product = require("../models/Product");
const mongoose = require("mongoose");
const Category = require("../models/Category");
const { languageCodes } = require("../utils/data");
const Rating = require("../models/Rating");
const Brand = require("../models/Brand");
const Partner = require("../models/partner");
const path = require('path');
const fs = require('fs');
const csv = require('csvtojson');

const addProduct = async (req, res) => {
  try {
    // console.log("Body ", req.body);
    const newProduct = new Product({
      ...req.body,
      productId: req.body.productId
        ? req.body.productId
        : mongoose.Types.ObjectId(),
    });

    await newProduct.save();
    res.send(newProduct);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const addAllProducts = async (req, res) => {
  try {
    await Product.deleteMany();
    await Product.insertMany(req.body);
    res.status(200).send({
      message: "Product Added successfully!",
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getShowingProducts = async (req, res) => {
  try {
    const products = await Product.find({ status: "show" }).sort({ _id: -1 });
    res.send(products);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getAllProducts = async (req, res) => {
  const { title, category, price, page, limit } = req.query;

  let queryObject = {};
  let sortObject = {};
  if (title) {
    const titleQueries = languageCodes.map((lang) => ({
      [`title.${lang}`]: { $regex: `${title}`, $options: "i" },
    }));
    queryObject.$or = titleQueries;
  }

  if (price === "low") {
    sortObject = {
      "prices.originalPrice": 1,
    };
  } else if (price === "high") {
    sortObject = {
      "prices.originalPrice": -1,
    };
  } else if (price === "published") {
    queryObject.status = "show";
  } else if (price === "unPublished") {
    queryObject.status = "hide";
  } else if (price === "status-selling") {
    queryObject.stock = { $gt: 0 };
  } else if (price === "status-out-of-stock") {
    queryObject.stock = { $lt: 1 };
  } else if (price === "date-added-asc") {
    sortObject.createdAt = 1;
  } else if (price === "date-added-desc") {
    sortObject.createdAt = -1;
  } else if (price === "date-updated-asc") {
    sortObject.updatedAt = 1;
  } else if (price === "date-updated-desc") {
    sortObject.updatedAt = -1;
  } else {
    sortObject = { _id: -1 };
  }

  // console.log('sortObject', sortObject);

  if (category) {
    queryObject.categories = category;
  }

  const pages = Number(page);
  const limits = Number(limit);
  const skip = (pages - 1) * limits;

  try {
    const totalDoc = await Product.countDocuments(queryObject);

    const products = await Product.find(queryObject)
      .populate({ path: "category", select: "_id name" })
      .populate({ path: "categories", select: "_id name" })
      .populate({ path: "brand" })
      .sort(sortObject)
      .skip(skip)
      .limit(limits);

    res.send({
      products,
      totalDoc,
      limits,
      pages,
    });
  } catch (err) {
    // console.log("error", err);
    res.status(500).send({
      message: err.message,
    });
  }
};

const getProductBySlug = async (req, res) => {
  // console.log("slug", req.params.slug);
  try {
    const product = await Product.findOne({ slug: req.params.slug });
    res.send(product);
  } catch (err) {
    res.status(500).send({
      message: `Slug problem, ${err.message}`,
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate({ path: "category" })
      .populate({ path: "categories" })
      .populate({ path: "brand" });
    res.send(product);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getShowingAllProducts = async (req, res) => {
  try {
    const products = await Product.find({ status: "show" })
      .populate({ path: "category", select: "_id name" })
      .populate({ path: "categories", select: "_id name" })
      .populate({ path: "brand" });
    res.send({
      products,
    });
  } catch (err) {
    // console.log("error", err);
    res.status(500).send({
      message: err.message,
    });
  }
};

const getShowingSuggestProducts = async (req, res) => {
  try {
    const { data } = req.body;

    if (!data) {
      return res
        .status(400)
        .send({ message: "The 'data' field cannot be empty" });
    }

    const searchString = String(data);

    // First we find matching brands
    const matchingBrands = await Brand.find({
      "name.en": { $regex: searchString, $options: "i" },
    }).select("_id");

    const matchingBrandIds = matchingBrands.map((brand) => brand._id);

    // Find matching products
    const query = {
      status: "show", // Only show status product find
      $or: [
        { "title.en": { $regex: searchString, $options: "i" } }, // Match in title
        { "description.en": { $regex: searchString, $options: "i" } }, // Match in description
        { productReferenceNo: { $regex: searchString, $options: "i" } }, // Match in productReferenceNo
        { brand: { $in: matchingBrandIds } }, // Match in brand (ObjectId)
      ],
    };

    const products = await Product.find(query)
      .populate({ path: "brand", select: "name" })
      .populate({ path: "category", select: "_id name" })
      .populate({ path: "categories", select: "_id name" });

    res.send({ products });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send({ message: err.message });
  }
};

const updateProduct = async (req, res) => {
  // console.log('update product')
  // console.log('variant',req.body.variants)
  try {
    const product = await Product.findById(req.params.id);
    // console.log("product", product);

    if (product) {
      product.title = { ...product.title, ...req.body.title };
      product.description = {
        ...product.description,
        ...req.body.description,
      };

      product.metatitle = { ...product.metatitle, ...req.body.metatitle };
      product.metadescription = {
        ...product.metadescription,
        ...req.body.metadescription,
      };

      product.productId = req.body.productId;
      product.sku = req.body.sku;
      product.productRefrenceNo = req.body.productRefrenceNo;
      product.moq = req.body.moq;
      product.hsn = req.body.hsn;
      product.packing = req.body.packing;
      product.barcode = req.body.barcode;
      product.slug = req.body.slug;
      product.categories = req.body.categories;
      product.category = req.body.category;
      product.brand = req.body.brand;
      product.isCodAvaialble = req.body.isCodAvaialble;
      product.show = req.body.show;
      product.isCombination = req.body.isCombination;
      product.variants = req.body.variants;
      product.stock = req.body.stock;
      product.prices = req.body.prices;
      product.gst = req.body.gst;
      product.deliveryCharge = req.body.deliveryCharge;
      product.image = req.body.image;
      product.tag = req.body.tag;

      await product.save();
      res.send({ data: product, message: "Product updated successfully!" });
    } else {
      res.status(404).send({
        message: "Product Not Found!",
      });
    }
  } catch (err) {
    res.status(404).send(err.message);
    // console.log('err',err)
  }
};

const updateManyProducts = async (req, res) => {
  try {
    const updatedData = {};
    for (const key of Object.keys(req.body)) {
      if (
        req.body[key] !== "[]" &&
        Object.entries(req.body[key]).length > 0 &&
        req.body[key] !== req.body.ids
      ) {
        // console.log('req.body[key]', typeof req.body[key]);
        updatedData[key] = req.body[key];
      }
    }

    // console.log("updated data", updatedData);

    await Product.updateMany(
      { _id: { $in: req.body.ids } },
      {
        $set: updatedData,
      },
      {
        multi: true,
      }
    );
    res.send({
      message: "Products update successfully!",
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const updateStatus = (req, res) => {
  const newStatus = req.body.status;
  Product.updateOne(
    { _id: req.params.id },
    {
      $set: {
        status: newStatus,
      },
    },
    (err) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else {
        res.status(200).send({
          message: `Product ${newStatus} Successfully!`,
        });
      }
    }
  );
};

const deleteProduct = (req, res) => {
  Product.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      res.status(500).send({
        message: err.message,
      });
    } else {
      res.status(200).send({
        message: "Product Deleted Successfully!",
      });
    }
  });
};

// const getShowingStoreProducts = async (req, res) => {
//   // console.log("req.body", req);
//   try {
//     const queryObject = { status: "show" };

//     const { category, title, slug, query } = req.query;
//     // console.log("title", title);

//     // console.log("query", req);

//     if (category) {
//       queryObject.categories = {
//         $in: [category],
//       };
//     }

//     if (title) {
//       const titleQueries = languageCodes.map((lang) => ({
//         [`title.${lang}`]: { $regex: `${title}`, $options: "i" },
//       }));

//       queryObject.$or = titleQueries;
//     }
//     if (slug) {
//       queryObject.slug = { $regex: slug, $options: "i" };
//     }

//     let products = [];
//     let popularProducts = [];
//     let discountedProducts = [];
//     let relatedProducts = [];

//     if (slug) {
//       products = await Product.find(queryObject)
//         .populate({ path: "category", select: "name _id" })
//         .sort({ _id: -1 })
//         .limit(20);
//       relatedProducts = await Product.find({
//         category: products[0]?.category,
//       }).populate({ path: "category", select: "_id name" });
//     } else if (title || category) {
//       products = await Product.find(queryObject)
//         .populate({ path: "category", select: "name _id" })
//         .sort({ _id: -1 })
//         .limit(20);
//     } else {
//       popularProducts = await Product.find({ status: "show" })
//         .populate({ path: "category", select: "name _id" })
//         .sort({ sales: -1 })
//         .limit(20);

//       discountedProducts = await Product.find({
//         status: "show", // Ensure status "show" for discounted products
//         $or: [
//           {
//             $and: [
//               { isCombination: true },
//               {
//                 variants: {
//                   $elemMatch: {
//                     discount: { $gt: "0.00" },
//                   },
//                 },
//               },
//             ],
//           },
//           {
//             $and: [
//               { isCombination: false },
//               {
//                 $expr: {
//                   $gt: [
//                     { $toDouble: "$prices.discount" }, // Convert the discount field to a double
//                     0,
//                   ],
//                 },
//               },
//             ],
//           },
//         ],
//       })
//         .populate({ path: "category", select: "name _id" })
//         .sort({ _id: -1 })
//         .limit(20);
//     }

//     res.send({
//       products,
//       popularProducts,
//       relatedProducts,
//       discountedProducts,
//     });
//   } catch (err) {
//     res.status(500).send({
//       message: err.message,
//     });
//   }
// };

const getShowingStoreProducts = async (req, res) => {
  try {
    const queryObject = { status: "show" };

    const { category, title, slug, query, page, brand } = req.query;
    console.log("Brand Query ", req.query);

    const pages = Number(page ?? 1);
    const limits = Number(20);
    const skip = (pages - 1) * limits;
    let totalCount = 0;
    let products = [];
    let popularProducts = [];
    let discountedProducts = [];
    let relatedProducts = [];
    let allProducts = [];

    // Filter by category
    if (category) {
        queryObject.categories = {
          $in: [category],
        };
    }

// Filter by brand with validation
if (brand) {
  if (!mongoose.Types.ObjectId.isValid(brand)) {
    return res.status(400).send({
      message: "Invalid brand ObjectID",
    });
  }
  queryObject.brand = brand; // Add brand filter to queryObject
  // console.log("Brand Filter Applied:", queryObject); // Debug queryObject
}

    // Filter by title with language support
    if (title) {
      const titleQueries = languageCodes.map((lang) => ({
        [`title.${lang}`]: { $regex: `${title}`, $options: "i" },
      }));

      queryObject.$or = titleQueries;
    }

    // Filter by slug_
    if (slug) {
      queryObject.slug = { $regex: slug, $options: "i" };
    }

    // Filter by query (matches in title, description, or tags array)
    if (query && query != "latest") {
      const queryRegex = { $regex: query, $options: "i" }; // Case-insensitive match

      queryObject.$or = [
        ...languageCodes.map((lang) => ({
          [`description.${lang}`]: queryRegex, // Match query in titles in various languages
        })), // Match query in description// Match query in description
        { tag: { $elemMatch: queryRegex } }, // Match query in any tag case-insensitively
        ...languageCodes.map((lang) => ({
          [`title.${lang}`]: queryRegex, // Match query in titles in various languages
        })),
        { [`productRefrenceNo`]: queryRegex },
      ];
    }

    if (slug) {
      products = await Product.find(queryObject)
        .populate({ path: "category" })
        .populate({ path: "brand" })
        .sort({ _id: -1 })
        .skip(skip)
        .limit(limits)
        .lean();

      relatedProducts = await Product.find({
        category: products[0]?.category,
      })
        .populate({ path: "category" })
        .populate({ path: "brand" });
      totalCount = await Product.countDocuments(queryObject);
    } else if (title || category || query || brand) {
      if (query != "latest") {
        products = await Product.find(queryObject)
          .populate({ path: "category" })
          .populate({ path: "brand" })
          .sort({ _id: -1 })
          .skip(skip)
          .limit(limits)
          .lean()
          .catch((e) => []);

        totalCount = await Product.countDocuments(queryObject).catch((e) => 0);
      } else {
        products = await Product.find({ status: "show" })
          .populate({ path: "category" })
          .populate({ path: "brand" })
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limits)
          .lean();
        totalCount = await Product.countDocuments({ status: "show" });
      }
    } else {
      // Fetch popular and discounted products if no specific filter
      popularProducts = await Product.find({ status: "show" })
        .populate({ path: "category" })
        .populate({ path: "brand" })
        .sort({ sales: -1 })
        .skip(skip)
        .limit(limits)
        .lean();
      totalCount = await Product.countDocuments({ status: "show" });

      products = popularProducts;
      discountedProducts = await Product.find({
        status: "show",
        $or: [
          {
            $and: [
              { isCombination: true },
              {
                variants: {
                  $elemMatch: {
                    discount: { $gt: "0.00" },
                  },
                },
              },
            ],
          },
          {
            $and: [
              { isCombination: false },
              {
                $expr: {
                  $gt: [{ $toDouble: "$prices.discount" }, 0],
                },
              },
            ],
          },
        ],
      })
        .populate({ path: "category" })
        .populate({ path: "brand" })
        .sort({ _id: -1 })
        .skip(skip)
        .limit(limits);

      allProducts = await Product.find({ status: "show" })
        .populate({
          path: "category",
          select: "name _id isService icon isQueryForm",
        })
        .sort({ _id: -1 })
        .skip(skip)
        .limit(limits);
    }

    for (let product of products) {
      const ratings = await Rating.find({ product: product._id });
      const totalRatings = ratings.reduce(
        (sum, rating) => sum + rating.rating,
        0
      );
      const averageRating = Math.floor(totalRatings / ratings.length);
      product.rating = averageRating || 0;
    }

    // console.log("Related products ", relatedProducts);
    const responseData = {
      nextPage: pages + 1,
      prevPage: pages - 1,
      totalProduct: totalCount,
      products,
      popularProducts,
      relatedProducts,
      allProducts,
      discountedProducts,
    };
    // console.log(responseData);
    res.send(responseData);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const deleteManyProducts = async (req, res) => {
  try {
    const cname = req.cname;

    await Product.deleteMany({ _id: req.body.ids });

    res.send({
      message: `Products Delete Successfully!`,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getAllProductsForSiteMap = async (req, res) => {
  try {
    const products = await Product.find({}, "slug updatedAt").lean();
    if (!products) {
      throw Error("Products not found db error");
    }
    return res.json({ total: products.length, products });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};



const uploadCSV = async (req, res) => {
  try {
    const filePath = path.join(__dirname, '..', 'uploads', req.file.filename);

    const jsonArray = await csv().fromFile(filePath);

    let updatedCount = 0;
    let notFound = [];
    let invalidIds = []; // To track invalid _id values

    for (const item of jsonArray) {
      const { _id, title, description, metatitle, metadescription } = item;

      // Skip if _id is missing
      if (!_id) continue;

      // Validate _id
      if (!mongoose.Types.ObjectId.isValid(_id)) {
        invalidIds.push(_id); // Track invalid _id
        continue; // Skip invalid _id
      }

      const updateFields = {};
      if (title) updateFields["title.en"] = title;
      if (description) updateFields["description.en"] = description;
      if (metatitle) updateFields["metatitle.en"] = metatitle;
      if (metadescription) updateFields["metadescription.en"] = metadescription;

      const result = await Product.findByIdAndUpdate(
        _id,
        { $set: updateFields },
        { new: true }
      );

      if (result) {
        updatedCount++;
      } else {
        notFound.push(_id);
      }
    }

    // Delete the CSV file after processing
    fs.unlinkSync(filePath);

    res.status(200).json({
      message: `Update complete.`,
      updated: updatedCount,
      notFound,
      invalidIds, // Include invalid _id values in the response for debugging
    });
  } catch (error) {
    res.status(500).json({ message: 'CSV processing error', error: error.message });
  }
};

module.exports = {
  addProduct,
  addAllProducts,
  getAllProducts,
  getShowingProducts,
  getProductById,
  getProductBySlug,
  updateProduct,
  getShowingSuggestProducts,
  updateManyProducts,
  getShowingAllProducts,
  updateStatus,
  deleteProduct,
  deleteManyProducts,
  uploadCSV,
  getShowingStoreProducts,
  getAllProductsForSiteMap,
};
