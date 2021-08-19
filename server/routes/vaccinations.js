const express = require('express');
const getData = require('../controllers/vaccinations');

const router = express.Router();

// Gets the data from the csv file
router.get('/', getData);

module.exports = router;