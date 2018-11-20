const express = require('express');
const router = express.Router();

const commonApi = require('../common');

router.get('/', (req, res, next) => {
    console.log('route /deviceview');
    const jsonTemplateData = {
        // userName : req.__user.name
        userName : "Administartor"
    };
    
    commonApi.initTemplate(jsonTemplateData, req, res);
});

router.get('*', (req, res, next) => {    
    let viewData = JSON.stringify(req.query);
    viewData = JSON.parse(viewData);
    
    let queryObj = {},
        optionObj = {};
    
    commonApi.convertObjToGetMethod(queryObj, optionObj, viewData);
    
    req.queryObj = queryObj;
    req.optionObj = optionObj;
    
    next();
});

module.exports = router;