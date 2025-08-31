const Pincode = require("../models/Pincode");
const enumm = ["show", "hide"];
//add a pincode
const addPincode = async (req, res) => {
  try {
    const { body } = req;
    if (!body || Object.keys(body).length === 0) {
      return res.status(400).json({ error_message: "Request body is missing" });
    }

    const { pincode: pin, branch } = body;

    if (!pin || !branch) {
      return res
        .status(400)
        .json({ error_message: "Pincode and Branch is required" });
    }
    if (isNaN(Number(pin))) {
      return res
        .status(400)
        .json({ error_message: "Pincode must be a number" });
    }
    const pinExist = await Pincode.findOne({ pin });

    if (pinExist) {
      return res.status(409).json({ error_message: "Pincode already exists" });
    }

    const newPincode = new Pincode({
      pin,
      branch,
    });
    await newPincode.save();

    res.status(201).json({
      message: "Pincode added successfully!",
      data: newPincode,
    });
  } catch (err) {
    res.status(500).json({
      error_message: err,
    });
  }
};

const addPincodeBulk = async (req, res) => {
  try {
    const { body } = req;
    if (!body || Object.keys(body).length === 0) {
      return res.status(400).json({ error_message: "Request body is missing" });
    }

    console.log("Body ", req.body);
    
    
    const key = Object.keys(body)[0];
    const data = body[key];

    console.log("Body data key", data);

    // Ensure data is an array
    if (!Array.isArray(data) || data.length === 0) {
      return res
        .status(400)
        .json({ error_message: "Invalid or empty data array." });
    }
    // Prepare bulk operations (upsert: true ensures overwrite if exists)
    const bulkOps = data.map((item) => ({
      updateOne: {
        filter: { pin: item.pin }, // Match existing pincode
        update: { $set: item }, // Update if exists, insert if not
        upsert: true, // Create if not exists
      },
    }));

    console.log("bulkOps ", bulkOps);

    // Insert data into MongoDB
    let dbResponse;
    try {
      dbResponse = await Pincode.bulkWrite(bulkOps);
    } catch (err) {
      console.error("Database Insert Error:", err);
      return res.status(500).json({
        error_message: "Failed to insert pincodes.",
        details: err.message,
      });
    }

    console.log("dbResponse ", dbResponse);

    // Check if dbResponse is valid
    if (!dbResponse || dbResponse.length === 0) {
      return res
        .status(500)
        .json({ error_message: "No pincodes were inserted." });
    }

    res.status(201).json({
      message: "Pincodes inserted successfully!",
      insertedCount: dbResponse.upsertedCount,
      modifiedCount: dbResponse.modifiedCount,
    });
  } catch (err) {
    res.status(500).json({ error_message: err.message });
  }
};

// get all pincodes
const getAllPincodes = async (req, res) => {
  try {
    const pincodes = await Pincode.find({}).sort({ _id: -1 });
    res.json({
      totalPins: pincodes.length,
      pincodes,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

// get all pincodes
const getPincode = async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(Number(id))) {
      return res.status(400).send({
        message: "Pincode must be a valid number",
      });
    }

    const pincode = await Pincode.findOne({ pin: req.params.id });
    if (!pincode) return res.status(404).json({ error: "pincode not found" });
    res.send(pincode);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

// category update
const updatepincode = async (req, res) => {
  try {
    const Targetedpincode = await Pincode.findOne({
      pin: req.params.id,
    });
    if (Targetedpincode) {
      if (req.body.pin) {
        Targetedpincode.pin = req.body.pin;
      }
      if (req.body.branch) {
        Targetedpincode.branch = req.body.branch;
      }
      if (req.body.status) {
        // Check if the incoming status is valid
        if (!enumm.includes(req.body.status)) {
          return res
            .status(400)
            .json({ message: "Send a valid status ('show' or 'hide')." });
        }

        // If valid, update the status
        Targetedpincode.status = req.body.status;
      }

      await Targetedpincode.save();
      res.send({
        message: "Pincode Updated Successfully!",
        UpdatedPin: Targetedpincode,
      });
    } else {
      res.status(404).send({
        error: "pincode not found",
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

// update pincode's status
const updateStatus = async (req, res) => {
  try {
    const Targetedpincode = await Pincode.findOne({
      _id: req.body.id,
    });
    if (Targetedpincode) {
      if (req.body.status) {
        // Check if the incoming status is valid
        if (!enumm.includes(req.body.status)) {
          return res
            .status(400)
            .json({ message: "Send a valid status ('show' or 'hide')." });
        }

        // If valid, update the status
        Targetedpincode.status = req.body.status;
      } else {
        return res.status(404).send({
          error: "status not provided",
        });
      }
      await Targetedpincode.save();
      res.send({ message: "Pincode status Updated Successfully!" });
    } else {
      res.status(404).send({
        error: "pincode not found",
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const deletePin = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).send({
        message: "Id not provided",
      });
    }
    const deletedPincode = await Pincode.findOneAndDelete({ _id: id });

    // If no pin is found, send a 404 response
    if (!deletedPincode) {
      return res.status(404).json({ message: "Pincode not found." });
    }

    // Send a success response with the deleted pincode details
    res
      .status(200)
      .json({ message: "Pincode deleted successfully.", deletedPincode });
  } catch (err) {
    // Handle any errors that might occur during the process
    console.error(err);
    res
      .status(500)
      .json({ message: "Something went wrong. Please try again." });
  }
};

const deleteManyPin = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: "Invalid or missing IDs." });
    }

    const deletedPincodes = await Pincode.deleteMany({ _id: { $in: ids } });

    if (deletedPincodes.deletedCount === 0) {
      return res.status(404).json({ message: "No pincodes found to delete." });
    }

    res.status(200).json({
      message: "Pincodes deleted successfully.",
      deletedCount: deletedPincodes.deletedCount,
    });
  } catch (err) {
    console.error("Error deleting pincodes:", err);
    res
      .status(500)
      .json({ message: "Something went wrong. Please try again." });
  }
};

module.exports = {
  addPincode,
  getPincode,
  getAllPincodes,
  updatepincode,
  updateStatus,
  deletePin,
  addPincodeBulk,
  deleteManyPin,
};
