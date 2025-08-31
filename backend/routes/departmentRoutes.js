const express = require('express');
const router = express.Router();
const {
    addDepartment,
    getShowingDepartment,
    getAllDepartments,
    getDepartmentById,
    updateDepartment,
    deleteDepartment,
    deleteManyDepartment,
    updateStatus
} = require('../controller/departmentController');

//add a department
router.post('/add', addDepartment);

//get only showing department
router.get('/show', getShowingDepartment);

//get all department
router.get('/', getAllDepartments);

//get a department
router.get('/:id', getDepartmentById);

//update a department
router.put('/:id', updateDepartment);

//show/hide a department
router.put('/status/:id', updateStatus);

//delete a department
router.delete('/:id', deleteDepartment);

// delete many department
router.patch('/delete/many', deleteManyDepartment);


module.exports = router;
