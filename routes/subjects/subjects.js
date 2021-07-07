const express = require('express');
const router = express.Router(); 
const subjectsController = require('../../controllers/subjects/subjects')
const auth = require('../../middlewares/auth');

router.post('/getsubjects', auth.protect , subjectsController.getsubjects)

module.exports = router;