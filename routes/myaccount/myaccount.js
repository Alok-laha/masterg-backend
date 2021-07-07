

const express = require('express');
const router = express.Router();
const auth = require('../../middlewares/auth');
const myaccountController = require('../../controllers/myaccount/myaccount');

router.post('/getLifeAtPnc', auth.protect, myaccountController.getLifeAtPnc);
router.post('/getLifeAtPncDetils', auth.protect, myaccountController.getLifeAtPncDetils);
router.post('/selectFacultyList', auth.protect, myaccountController.selectFacultyList);
router.post('/addFeedBack', auth.protect, myaccountController.addFeedBack);
router.post('/feedBackList', auth.protect, myaccountController.feedBackList);
router.post('/homeList', auth.protect, myaccountController.homeList);
router.post('/liveSessions', auth.protect, myaccountController.liveSessions);
router.post('/homeMessage', auth.protect, myaccountController.homeMessage)


module.exports = router;
