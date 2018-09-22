const express = require('express');
const router = express.Router();

// const userApi = require('../api/user');
const commonApi = require('../common');

router.get('/', (req, res, next) => {
    const jsonTemplateData = {
        // userName : req.__user.name
		userName : "Administartor"
    };
    
    commonApi.initTemplate(jsonTemplateData, req, res);
});

module.exports = router;