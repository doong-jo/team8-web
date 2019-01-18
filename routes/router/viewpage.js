const express = require('express');
const router = express.Router();
const has = require('has');

const commonApi = require('../common');

router.get('/', (req, res, next) => {
    commonApi.convertObjToGetMethod(req, res, next);
    
    const jsonTemplateData = {
        // userName : req.__user.name
        userName : "Administartor"
    };
    
    commonApi.initTemplate(jsonTemplateData, req, res);
    
    return true;
});

module.exports = router;