const express = require('express');
const router = express.Router();
const {
    addRating,
    getShowingRating,
    getAllRatings,
    getRatingById,
    updateRating,
    deleteRating,
    deleteManyRating,
    updateStatus,
    getAllRatingsByProduct
} = require('../controller/ratingController');

//add a department
router.post('/add', addRating);

//get only showing department
router.get('/show', getShowingRating);

//get all department
router.get('/', getAllRatings);

router.get('/all/:id', getAllRatingsByProduct);

//get a department
router.get('/:id', getRatingById);

//update a department
router.put('/:id', updateRating);

//show/hide a department
router.put('/status/:id', updateStatus);

//delete a department
router.delete('/:id', deleteRating);

// delete many department
router.patch('/delete/many', deleteManyRating);


module.exports = router;
