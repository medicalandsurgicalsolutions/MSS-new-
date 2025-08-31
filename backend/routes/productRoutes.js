const express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require('path');
const {
  addProduct,
  addAllProducts,
  getAllProducts,
  getShowingProducts,
  getProductById,
  getProductBySlug,
  updateProduct,
  updateManyProducts,
  updateStatus,
  deleteProduct,
  deleteManyProducts,
  getAllProductsForSiteMap,
  getShowingAllProducts,
  getShowingSuggestProducts,
  uploadCSV,
  getShowingStoreProducts,
} = require("../controller/productController");

//add a product
router.post("/add", addProduct);

//add multiple products
router.post("/all", addAllProducts);

//get a product
router.post("/:id", getProductById);

//get showing all products only
router.get("/allProduct", getShowingAllProducts);

//get showing suggest products only
router.post("/suggest/product", getShowingSuggestProducts);

//get showing products only
router.get("/show", getShowingProducts);

//get showing products in store
router.get("/store", getShowingStoreProducts);

//get all products
router.get("/", getAllProducts);

//get all products
router.get("/sitemap", getAllProductsForSiteMap);

//get a product by slug
router.get("/product/:slug", getProductBySlug);

//update a product
router.patch("/:id", updateProduct);

//update many products
router.patch("/update/many", updateManyProducts);

//update a product status
router.put("/status/:id", updateStatus);

//delete a product
router.delete("/:id", deleteProduct);

//delete many product
router.patch("/delete/many", deleteManyProducts);

// Multer setup: CSV file ko 'uploads/' folder me save karega
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Make sure this folder exists
  },
  filename: function (req, file, cb) {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// Route: POST /api/upload-csv
router.post('/csv/new', upload.single('file'), uploadCSV);

module.exports = router;
