const express = require('express');
const { uploadAndImportCSV } = require('../controller/CSVUploadController');
const router = express.Router();

router.post('/upload-csv', uploadAndImportCSV);


module.exports = router;
