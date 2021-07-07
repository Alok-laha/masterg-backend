const express = require('express');
const router = express.Router(); 
const entityController = require('../../controllers/entity/entity')
const auth = require('../../middlewares/auth');

router.post('/getentities/:page', auth.protect , entityController.getEntities)

module.exports = router;