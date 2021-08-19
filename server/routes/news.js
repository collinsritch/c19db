const express = require('express');
const router = express.Router();
const getNews = require('../controllers/news')

router.get('/:date', getNews)

module.exports = router;