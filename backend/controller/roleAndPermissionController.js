const Permission = require("../models/Permission");
const Role = require("../models/Role");
const { ADMIN_ROLE_ID } = require("../utils/admin");

const addRole = async (req, res) => {
  try {
    const newRole = new Role(req.body);
    await newRole.save();
    res.status(200).send({
      message: "Role Added Successfully!",
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};



const getAllRoles = async (req, res) => {
  try {
    const roles = await Role.find({
      '_id': { $ne: ADMIN_ROLE_ID }
    }).sort({ _id: -1 });
    res.send(roles);
  } catch (err) {    
    res.status(500).send({
      message: err.message,
    });
  }
};

const getRoleById = async (req, res) => {
  try {
    const role = await Role.findById(req.params.id);
    res.send(role);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

// category update
const updateRole = async (req, res) => {
  try {
    const role = await Role.findById(req.params.id);
    if (role) {
      role.name = { ...role.name, ...req.body.name };
      role.status = req.body.status;
      await role.save();
      res.send({ message: "Role Updated Successfully!" });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const updateRolePermissions = async (req, res) => {
  try {
    const role = await Role.findById(req.params.id);
    console.log("Permissions ", req.body.permissions);
    if (role) {
      role.permissions = req.body.permissions;
      await role.save();
      res.send({ message: "Permissions Updated Successfully!" });
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

    await Role.updateOne(
      { _id: req.params.id },
      {
        $set: {
          status: newStatus,
        },
      }
    );
    res.status(200).send({
      message: `Role  ${
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
const deleteRole = async (req, res) => {
  try {
    await Role.deleteOne({ _id: req.params.id });
    res.status(200).send({
      message: "Role Deleted Successfully!",
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

// all multiple category delete
const deleteManyRole = async (req, res) => {
  try {
    await Role.deleteMany({ _id: req.body.ids });

    res.status(200).send({
      message: "Roles Deleted Successfully!",
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};


const getAllPermissions = async (req, res) => {
    try {
      const permissions = await Permission.find({}).sort({ _id: -1 });
      res.send(permissions);
    } catch (err) {    
      res.status(500).send({
        message: err.message,
      });
    }
};


module.exports = {
  addRole,
  getRoleById,
  updateRole,
  updateRolePermissions,
  updateStatus,
  deleteRole,
  deleteManyRole,
  getAllRoles,
  getAllPermissions
};
