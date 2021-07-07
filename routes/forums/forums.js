

const express = require('express');
const router = express.Router();
const auth = require('../../middlewares/auth');
const forumsController = require('../../controllers/forums/forums');

router.post('/getForums', auth.protect, forumsController.getForums);
router.post('/getForumsDetils', auth.protect, forumsController.getForumsDetils);
router.post('/forumMessagesAdd', auth.protect, forumsController.forumMessagesAdd);





module.exports = router;
