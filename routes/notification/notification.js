const express = require('express');
const router = express.Router();

const auth = require('../../middlewares/auth');

const notificationController = require('../../controllers/notification/notification');

router.post('/getNotification', auth.protect,notificationController.getNotification);

router.post('/notificationUpdate', auth.protect, notificationController.notificationUpdate);


module.exports = router;
