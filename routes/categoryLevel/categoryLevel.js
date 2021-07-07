const express = require('express');
const router = express.Router();
const categoryLevelController = require('../../controllers/categoryLevel/categoryLevel');
const auth = require('../../middlewares/auth');

router.use('/categorylevel1details/', auth.protect, categoryLevelController.getCategoryLevel1);
router.post('/categorylevel2details/', auth.protect, categoryLevelController.getCategoryLevel2);
router.post('/categorylevel3details/', auth.protect, categoryLevelController.getCategoryLevel3);
router.post('/categorylevel4details', auth.protect, categoryLevelController.getCategoryLevel4);

module.exports = router;
