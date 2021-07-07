const express = require('express');
const router = express.Router();

const auth = require('../../middlewares/auth');

const studentController = require('../../controllers/students/student');

router.post('/basicregister', studentController.basicRegister);

router.patch('/register', auth.protect, studentController.completeRegister);

router.post('/login', studentController.login);

router.patch('/updateprofile', auth.protect, studentController.updateProfile);

router.patch('/changepassword', auth.protect, studentController.changePassword);

router.post('/forgotpassword', studentController.forgotPassword);

router.patch('/resetpassword', studentController.resetPassword);

router.post('/getStudentDetails', auth.protect, studentController.getStudentDetails);

router.post('/getRewardList', auth.protect, studentController.getRewardList);

module.exports = router;
