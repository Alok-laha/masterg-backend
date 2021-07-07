const express = require('express');
const router = express.Router(); 
const coursechaptersController = require('../../controllers/coursechapters/coursechapters')
const auth = require('../../middlewares/auth');

router.post('/getcoursechapters', auth.protect , coursechaptersController.getcoursechapters)

module.exports = router;