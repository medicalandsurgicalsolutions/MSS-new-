const Department = require("../models/Department");

const addDepartment = async (req, res) => {
  try {
    const newDepartment = new Department(req.body);
    await newDepartment.save();
    res.status(200).send({
      message: "Department Added Successfully!",
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};


// get status show category
const getShowingDepartment = async (req, res) => {
  try {
    const departments = await Department.find({ status: "show" }).sort({
      _id: -1,
    });
    res.send(departments);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};


const getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.find({}).sort({ _id: -1 });
    res.send(departments);
  } catch (err) {    
    res.status(500).send({
      message: err.message,
    });
  }
};

const getDepartmentById = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);
    res.send(department);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

// category update
const updateDepartment = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);
    if (department) {
      department.name = { ...department.name, ...req.body.name };
      department.description = {
        ...department.description,
        ...req.body.description,
      };
      department.status = req.body.status;
      await department.save();
      res.send({ message: "Department Updated Successfully!" });
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

    await Department.updateOne(
      { _id: req.params.id },
      {
        $set: {
          status: newStatus,
        },
      }
    );
    res.status(200).send({
      message: `Department ${
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
const deleteDepartment = async (req, res) => {
  try {
    await Department.deleteOne({ _id: req.params.id });
    res.status(200).send({
      message: "Department Deleted Successfully!",
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

// all multiple category delete
const deleteManyDepartment = async (req, res) => {
  try {
    await Department.deleteMany({ _id: req.body.ids });

    res.status(200).send({
      message: "Departments Deleted Successfully!",
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};


module.exports = {
  addDepartment,
  getShowingDepartment,
  getDepartmentById,
  updateDepartment,
  updateStatus,
  deleteDepartment,
  deleteManyDepartment,
  getAllDepartments
};
