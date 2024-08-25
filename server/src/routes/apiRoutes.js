const express = require('express');
const router = express.Router();
const { postRequestHandler, getRequestHandler } = require('../controllers/apiController');

router.post('/', postRequestHandler);
router.get('/', getRequestHandler);

module.exports = router;
