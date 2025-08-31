const Partner = require("../models/partner");

const addPartner = async (req, res) => {
  try {
    const newBrand = new Partner(req.body);
    await newBrand.save();
    // console.log("Database Partner ", newBrand);
    res.status(200).send({
      message: "Partner Added Successfully!",
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};


// get status show category
const getShowingPartner = async (req, res) => {
  try {
    const brands = await Partner.find({ status: "show" }).sort({
      _id: -1,
    });
    res.send(brands);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};


const getAllPartners = async (req, res) => {
  try {
    const brands = await Partner.find({}).sort({ _id: -1 });
    res.send(brands);
  } catch (err) {    
    res.status(500).send({
      message: err.message,
    });
  }
};

const getPartnerById = async (req, res) => {
  try {
    const brand = await Partner.findById(req.params.id);
    res.send(brand);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

// category update
const updatePartner = async (req, res) => {
  try {
    const brand = await Partner.findById(req.params.id);
    if (brand) {
      brand.name = { ...brand.name, ...req.body.name };
      brand.description = req.body.icon;
      brand.website = req.body.website;
      brand.status = req.body.status;
      await brand.save();
      res.send({ message: "Partner Updated Successfully!" });
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

    await Partner.updateOne(
      { _id: req.params.id },
      {
        $set: {
          status: newStatus,
        },
      }
    );
    res.status(200).send({
      message: `Partner ${
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
const deletePartner = async (req, res) => {
  try {
    await Partner.deleteOne({ _id: req.params.id });
    res.status(200).send({
      message: "Client Deleted Successfully!",
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

// all multiple category delete
const deleteManyPartner = async (req, res) => {
  try {
    await Partner.deleteMany({ _id: req.body.ids });

    res.status(200).send({
      message: "Partners Deleted Successfully!",
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};


module.exports = {
  addPartner,
  getShowingPartner,
  getPartnerById,
  updatePartner,
  updateStatus,
  deletePartner,
  deleteManyPartner,
  getAllPartners
};
