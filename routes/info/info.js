const express = require('express');
const router = express.Router();
const auth = require('../../middlewares/auth');
const infoController = require('../../controllers/info/info');

router.get('/getfaqs', infoController.getFaqs);
router.get('/aboutus', infoController.aboutUs);
router.get('/contactus', infoController.contactUs);
router.get('/privacy', infoController.privacyPolicy);
router.get('/terms', infoController.termsAndCondition);

module.exports = router;
