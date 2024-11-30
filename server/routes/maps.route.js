const { getAddressCoordinate } = require('../controllers/map.controller');
const express = require('express');
const router = express.Router();

router.get('/get-cordinates', getAddressCoordinate);

module.exports = router;
