const express = require('express');
const router = express.Router(); 
const cmspageController = require('../../controllers/cmspage/cmspage')
const auth = require('../../middlewares/auth');

router.post('/getcmspageget',cmspageController.getcmspageget)
module.exports = router;