const express = require('express')
const getData = require('../controllers/home')

const router = express.Router()

// Gets the data from the csv file
router.get('/', getData)

module.exports = router