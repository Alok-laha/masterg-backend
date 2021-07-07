const express = require('express');
const router = express.Router(); 
const coursesController = require('../../controllers/courses/courses')
const auth = require('../../middlewares/auth');

router.post('/getcourses', auth.protect , coursesController.getcourses)

module.exports = router;