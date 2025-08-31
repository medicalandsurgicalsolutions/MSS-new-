const Rating = require("../models/Rating");
const mongoose = require('mongoose');

const addRating = async (req, res) => {
  try {
    const newRating = new Rating(req.body);
    await newRating.save();
    res.status(200).send({
      message: "Rating Added Successfully!",
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};


// get status show category
const getShowingRating = async (req, res) => {
  try {
    const ratings = await Rating.find({ status: "show" }).sort({
      _id: -1,
    });
    res.send(ratings);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};


const getAllRatings = async (req, res) => {
  try {
    const ratings = await Rating.find({}).sort({ _id: -1 })
      .populate('product') // Assuming you have a Product model
      .populate('customer');
    res.send(ratings);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getAllRatingsByProduct = async (req, res) => {
  try {
    const ratings = await Rating.find({product:req.params.id}).sort({ _id: -1 })
      .populate('product') // Assuming you have a Product model
      .populate('customer');
    res.send(ratings);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getRatingById = async (req, res) => {
  try {
    const rating = await Rating.findById(req.params.id);
    res.send(rating);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const updateRating = async (req, res) => {
  try {
    const rating = await Rating.findById(req.params.id);
    
    if (rating) {
      // Ensure req.body contains valid ObjectIds
      if (!mongoose.Types.ObjectId.isValid(req.body.product) || !mongoose.Types.ObjectId.isValid(req.body.customer)) {
        return res.status(400).send({ message: 'Invalid product or customer ID' });
      }

      rating.product = req.body.product;
      rating.customer = req.body.customer;
      rating.rating = req.body.rating;
      rating.comment = req.body.comment;

      await rating.save();
      res.send({ message: "Rating Updated Successfully!" });
    } else {
      res.status(404).send({ message: "Rating not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: err.message,
    });
  }
};



const updateStatus = async (req, res) => {
  try {
    const newStatus = req.body.status;

    await Rating.updateOne(
      { _id: req.params.id },
      {
        $set: {
          status: newStatus,
        },
      }
    );
    res.status(200).send({
      message: `Rating ${newStatus === "show" ? "Published" : "Un-Published"
        } Successfully!`,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};
const deleteRating = async (req, res) => {
  try {
    await Rating.deleteOne({ _id: req.params.id });
    res.status(200).send({
      message: "Rating Deleted Successfully!",
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const deleteManyRating = async (req, res) => {
  try {
    await Rating.deleteMany({ _id: req.body.ids });

    res.status(200).send({
      message: "Ratings Deleted Successfully!",
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};


module.exports = {
  addRating,
  getShowingRating,
  getRatingById,
  updateRating,
  updateStatus,
  deleteRating,
  deleteManyRating,
  getAllRatings,
  getAllRatingsByProduct
};
