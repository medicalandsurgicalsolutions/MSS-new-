const express = require('express');
const router = express.Router();
const {
    addAward,
    getShowingAward,
    getAllAwards,
    getAwardById,
    updateAward,
    deleteAward,
    deleteManyAward,
    updateStatus
} = require('../controller/awardController');

//add a department
router.post('/add', addAward);

//get only showing department
router.get('/show', getShowingAward);

//get all department
router.get('/', getAllAwards);

//get a department
router.get('/:id', getAwardById);

//update a department
router.put('/:id', updateAward);

//show/hide a department
router.put('/status/:id', updateStatus);

//delete a department
router.delete('/:id', deleteAward);

// delete many department
router.patch('/delete/many', deleteManyAward);


module.exports = router;
