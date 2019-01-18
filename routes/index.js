const express = require('express');
const router = express.Router();
// const category = require('./router/category');

// const template = require('./template');
	  
const main = require('./router/main');
router.use('/', main);

module.exports = router;
