const express = require('express');
const router = express.Router();

const userApi = require('../api/user');
const commonApi = require('../common');

router.get('/', (req, res, next) => {
    console.log('route /userview');
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
    
    console.log('queryObj', queryObj);
    console.log('optionObj', optionObj);
    console.log('viewData', viewData);
    
    req.queryObj = queryObj;
    req.optionObj = optionObj;
    
    next();
});

router.get('/user', (req, res, next) => {
    userApi.getList(req.queryObj, req.optionObj, (data) => {
        res.json(data);
    });
});

module.exports = router;