const express = require('express');
const router = express.Router(); 
const coursetopicsController = require('../../controllers/coursetopics/coursetopics')
const auth = require('../../middlewares/auth');

router.post('/getcoursetopics', auth.protect , coursetopicsController.getcoursetopics)
router.post('/getcoursetopicsFile', auth.protect , coursetopicsController.getcoursetopicsFile)
module.exports = router;