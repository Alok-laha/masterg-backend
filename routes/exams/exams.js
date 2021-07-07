const express = require('express');
const router = express.Router();
const examsController = require('../../controllers/exams/exams')
const questionController = require('../../controllers/exams/questions')
const userexamsController = require('../../controllers/exams/userexams')
const userresultsController = require('../../controllers/exams/userresults')
const givexmacontroller= require('../../controllers/exams/examresults')
const auth = require('../../middlewares/auth');

//Give exam before checking the result

router.post('/getexams', auth.protect, examsController.getexams)
router.post('/getexamdetails', auth.protect, examsController.getexamdetails)
router.post('/getquestion', auth.protect, questionController.getquestion)
router.post('/userexams', auth.protect, userexamsController.userexams)
router.post('/userresults', auth.protect, userresultsController.userresults)
router.post('/userViewResults', auth.protect, userresultsController.userViewResults)
router.post('/giveexams',auth.protect, givexmacontroller.examresults)

module.exports = router;