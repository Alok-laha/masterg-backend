

const express = require('express');
const router = express.Router();
const auth = require('../../middlewares/auth');
const locationController = require('../../controllers/location/location');

router.post('/countrycodes/:page', locationController.getCountries);

router.post('/statedetails/:page', locationController.getStates);

router.post('/citydetails/:page', locationController.getCities);

module.exports = router;
