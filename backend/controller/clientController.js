const Client = require("../models/Client");

const addClient = async (req, res) => {
  try {
    const newBrand = new Client(req.body);
    await newBrand.save();
    // console.log("Database Client ", newBrand);
    res.status(200).send({
      message: "Client Added Successfully!",
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};


// get status show category
const getShowingClient = async (req, res) => {
  try {
    const brands = await Client.find({ status: "show" }).sort({
      _id: -1,
    });
    res.send(brands);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};


const getAllClients = async (req, res) => {
  try {
    const brands = await Client.find({}).sort({ _id: -1 });
    res.send(brands);
  } catch (err) {    
    res.status(500).send({
      message: err.message,
    });
  }
};

const getClientById = async (req, res) => {
  try {
    const brand = await Client.findById(req.params.id);
    res.send(brand);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

// category update
const updateClient = async (req, res) => {
  try {
    const brand = await Client.findById(req.params.id);
    if (brand) {
      brand.name = { ...brand.name, ...req.body.name };
      brand.description = req.body.icon;
      brand.website = req.body.website;
      brand.status = req.body.status;
      await brand.save();
      res.send({ message: "Client Updated Successfully!" });
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

    await Client.updateOne(
      { _id: req.params.id },
      {
        $set: {
          status: newStatus,
        },
      }
    );
    res.status(200).send({
      message: `Client ${
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
const deleteClient = async (req, res) => {
  try {
    await Client.deleteOne({ _id: req.params.id });
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
const deleteManyClient = async (req, res) => {
  try {
    await Client.deleteMany({ _id: req.body.ids });

    res.status(200).send({
      message: "Clients Deleted Successfully!",
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};


module.exports = {
  addClient,
  getShowingClient,
  getClientById,
  updateClient,
  updateStatus,
  deleteClient,
  deleteManyClient,
  getAllClients
};
