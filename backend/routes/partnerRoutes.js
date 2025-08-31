const express = require('express');
const router = express.Router();
const {
    addPartner,
    getShowingPartner,
    getAllPartners,
    getPartnerById,
    updatePartner,
    deletePartner,
    deleteManyPartner,
    updateStatus
} = require('../controller/partnerController');

//add a department
router.post('/add', addPartner);

//get only showing department
router.get('/show', getShowingPartner);

//get all department
router.get('/', getAllPartners);

//get a department
router.get('/:id', getPartnerById);

//update a department
router.put('/:id', updatePartner);

//show/hide a department
router.put('/status/:id', updateStatus);

//delete a department
router.delete('/:id', deletePartner);

// delete many department
router.patch('/delete/many', deleteManyPartner);


module.exports = router;
