const express = require("express");
const router = express.Router();
const {
  addPincode,
  getAllPincodes,
  getPincode,
  updatepincode,
  updateStatus,
  deleteManyPin,
  deletePin,
  addPincodeBulk,
} = require("../controller/pincodeController");



//get all pincodes
router.get("/", getAllPincodes);

//get one pincodes
router.get("/:id", getPincode);

//add a pincode
router.post("/add", addPincode);

//add pincodes in bulk
router.post("/add/bulk", addPincodeBulk);

//update pincode
router.patch("/update/:id", updatepincode);

//update pincode status
router.patch("/status", updateStatus);

//delete pincode 
router.delete("/:id", deletePin);

router.delete("/", deleteManyPin);

module.exports = router;
