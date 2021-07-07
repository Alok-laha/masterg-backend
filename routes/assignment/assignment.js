

const express = require('express');
const router = express.Router();
const auth = require('../../middlewares/auth');
const assignmentController = require('../../controllers/assignment/assignment');

router.post('/getAssignments', auth.protect, assignmentController.getAssignment);
router.post('/getAssignmentDetails', auth.protect, assignmentController.getAssignmentDetails);



module.exports = router;
