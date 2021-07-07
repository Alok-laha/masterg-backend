const express = require('express');
const router = express.Router();

const adminController = require('../../controllers/admin/admin');
const auth = require('../../middlewares/auth');

router.post('/login', adminController.adminLogin);

router.get('/valid', auth.protect, adminController.test);

module.exports = router;
