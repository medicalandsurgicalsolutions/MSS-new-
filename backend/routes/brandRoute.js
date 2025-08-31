const express = require('express');
const router = express.Router();
const {
    addBrand,
    getShowingBrand,
    getAllBrands,
    getBrandById,
    updateBrand,
    deleteBrand,
    deleteManyBrand,
    updateStatus
} = require('../controller/brandController');

//add a department
router.post('/add', addBrand);

//get only showing department
router.get('/show', getShowingBrand);

//get all department
router.get('/', getAllBrands);

//get a department
router.get('/:id', getBrandById);

//update a department
router.put('/:id', updateBrand);

//show/hide a department
router.put('/status/:id', updateStatus);

//delete a department
router.delete('/:id', deleteBrand);

// delete many department
router.patch('/delete/many', deleteManyBrand);


module.exports = router;
