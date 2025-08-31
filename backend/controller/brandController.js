const Brand = require("../models/Brand");

const addBrand = async (req, res) => {
  try {
    const newBrand = new Brand(req.body);
    await newBrand.save();
    res.status(200).send({
      message: "Brand Added Successfully!",
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};


// get status show category
const getShowingBrand = async (req, res) => {
  try {
    const brands = await Brand.find({ status: "show" }).sort({
      _id: -1,
    });
    res.send(brands);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};


const getAllBrands = async (req, res) => {
  try {
    const brands = await Brand.find({}).sort({ _id: -1 });
    res.send(brands);
  } catch (err) {    
    res.status(500).send({
      message: err.message,
    });
  }
};

const getBrandById = async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id);
    res.send(brand);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

// category update
const updateBrand = async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id);
    if (brand) {
      brand.name = { ...brand.name, ...req.body.name };
      brand.description = {
        ...brand.description,
        ...req.body.description,
      };
      brand.website = req.body.website;
      brand.icon = req.body.icon;
      brand.slug = req.body.slug;
      brand.status = req.body.status;
      await brand.save();
      res.send({ message: "Brand Updated Successfully!" });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};



// category update status
const updateStatus = async (req, res) => {
  // console.log('update status')
  try {
    const newStatus = req.body.status;

    await Brand.updateOne(
      { _id: req.params.id },
      {
        $set: {
          status: newStatus,
        },
      }
    );
    res.status(200).send({
      message: `Brand ${
        newStatus === "show" ? "Published" : "Un-Published"
      } Successfully!`,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};
//single category delete
const deleteBrand = async (req, res) => {
  try {
    await Brand.deleteOne({ _id: req.params.id });
    res.status(200).send({
      message: "Brand Deleted Successfully!",
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

// all multiple category delete
const deleteManyBrand = async (req, res) => {
  try {
    await Brand.deleteMany({ _id: req.body.ids });

    res.status(200).send({
      message: "Brands Deleted Successfully!",
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};


module.exports = {
  addBrand,
  getShowingBrand,
  getBrandById,
  updateBrand,
  updateStatus,
  deleteBrand,
  deleteManyBrand,
  getAllBrands
};
