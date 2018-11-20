const express = require('express');
const router = express.Router();

const has = require('has');

const categoryApi = require('../api/category');
const commonApi = require('../common');

const formValidation = (query) => {
    
};

router.get('*', (req, res, next) => {
    const viewData = req.query;
    let queryObj = {},
        optionObj = {};
    
    commonApi.convertObjToGetMethod(queryObj, optionObj, viewData);
    
    req.queryObj = queryObj;
    req.optionObj = optionObj;
    
    next();
});

router.get('/', (req, res, next) => {
    console.log('req.queryObj', req.queryObj);
    
    categoryApi.getList(req.queryObj, req.optionObj, (data) => {
        res.json(data);
    });
});


module.exports = router;