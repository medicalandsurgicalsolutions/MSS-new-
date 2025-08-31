const Award = require("../models/Award");

const addAward = async (req, res) => {
  try {
    const newBrand = new Award(req.body);
    await newBrand.save();
    // console.log("Database Award ", newBrand);
    res.status(200).send({
      message: "Award Added Successfully!",
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};


// get status show category
const getShowingAward = async (req, res) => {
  try {
    const brands = await Award.find({ status: "show" }).sort({
      _id: -1,
    });
    res.send(brands);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};


const getAllAwards = async (req, res) => {
  try {
    const brands = await Award.find({}).sort({ _id: -1 });
    res.send(brands);
  } catch (err) {    
    res.status(500).send({
      message: err.message,
    });
  }
};

const getAwardById = async (req, res) => {
  try {
    const brand = await Award.findById(req.params.id);
    res.send(brand);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

// category update
const updateAward = async (req, res) => {
  try {
    const brand = await Award.findById(req.params.id);
    if (brand) {
      brand.name = { ...brand.name, ...req.body.name };
      brand.description = req.body.icon;
      brand.website = req.body.website;
      brand.status = req.body.status;
      await brand.save();
      res.send({ message: "Award Updated Successfully!" });
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

    await Award.updateOne(
      { _id: req.params.id },
      {
        $set: {
          status: newStatus,
        },
      }
    );
    res.status(200).send({
      message: `Award ${
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
const deleteAward = async (req, res) => {
  try {
    await Award.deleteOne({ _id: req.params.id });
    res.status(200).send({
      message: "Award Deleted Successfully!",
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

// all multiple category delete
const deleteManyAward = async (req, res) => {
  try {
    await Award.deleteMany({ _id: req.body.ids });

    res.status(200).send({
      message: "Awards Deleted Successfully!",
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};


module.exports = {
  addAward,
  getShowingAward,
  getAwardById,
  updateAward,
  updateStatus,
  deleteAward,
  deleteManyAward,
  getAllAwards
};
