const express = require('express');
const router = express.Router();
const {
    addClient,
    getShowingClient,
    getAllClients,
    getClientById,
    updateClient,
    deleteClient,
    deleteManyClient,
    updateStatus
} = require('../controller/clientController');

//add a department
router.post('/add', addClient);

//get only showing department
router.get('/show', getShowingClient);

//get all department
router.get('/', getAllClients);

//get a department
router.get('/:id', getClientById);

//update a department
router.put('/:id', updateClient);

//show/hide a department
router.put('/status/:id', updateStatus);

//delete a department
router.delete('/:id', deleteClient);

// delete many department
router.patch('/delete/many', deleteManyClient);


module.exports = router;
