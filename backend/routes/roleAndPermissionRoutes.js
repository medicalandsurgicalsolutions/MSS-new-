const express = require('express');
const router = express.Router();
const {
    addRole,
    getRoleById,
    updateRole,
    updateStatus,
    deleteRole,
    deleteManyRole,
    getAllRoles,
    getAllPermissions,
    updateRolePermissions
} = require('../controller/roleAndPermissionController');

//add a role
router.post('/add', addRole);

//get all permissions
router.get('/permissions', getAllPermissions);

//get all role
router.get('/', getAllRoles);

//get a role
router.get('/:id', getRoleById);

//update a role
router.put('/:id', updateRole);

router.put('/permissions/:id', updateRolePermissions);

//show/hide a role
router.put('/status/:id', updateStatus);

//delete a role
router.delete('/:id', deleteRole);

// delete many role
router.patch('/delete/many', deleteManyRole);


module.exports = router;
