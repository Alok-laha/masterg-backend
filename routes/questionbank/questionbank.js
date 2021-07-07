

const express = require('express');
const router = express.Router();
const auth = require('../../middlewares/auth');
const questionbankController = require('../../controllers/questionbank/questionbank');

router.post('/getQuestionbank', auth.protect, questionbankController.getQuestionbank);
router.post('/getQuestionbankAnswer', auth.protect, questionbankController.getQuestionbankAnswer);


module.exports = router;
