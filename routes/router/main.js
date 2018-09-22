const express = require('express');
const router = express.Router();

const commonApi = require('../common');

router.get('/', function(req, res, next) {
    const jsonTemplateData = {
        // userName : req.__user.name
		userName : "Administrator"
    };
    
    commonApi.initTemplate(jsonTemplateData, req, res);
});

module.exports = router;