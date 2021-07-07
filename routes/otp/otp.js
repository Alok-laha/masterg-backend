const express = require('express');
const router = express.Router();

const auth = require('../../middlewares/auth');
const otpController = require('../../controllers/otp/otp');

router.post('/verifyloginotp', otpController.verifyLoginOtp);

router.post('/resendotp', otpController.resendOtp);

module.exports = router;
