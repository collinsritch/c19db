const express = require('express');
const getData = require('../controllers/regional');
const loadProvincialData = require('../controllers/regional')

const router = express.Router();

// Gets the data from the csv file
router.get('/', getData);

module.exports = router;