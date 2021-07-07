

const express = require('express');
const router = express.Router();
const auth = require('../../middlewares/auth');
const subscriptionController = require('../../controllers/membership/membership');

router.post('/getAllPlan',auth.protect,subscriptionController.getAllPlan);
router.post('/getPlanByID',auth.protect,subscriptionController.getPlanByID);
router.post('/getPlanSubjChapters',auth.protect,subscriptionController.getPlanSubjChapters);
router.post('/checkCoupon',auth.protect,subscriptionController.checkCoupon);
router.post('/purchasePlan',auth.protect,subscriptionController.purchasePlan);
router.post('/getMyPlan',auth.protect,subscriptionController.getMyPlan);


module.exports = router;
