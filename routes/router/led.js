const express = require('express');
const router = express.Router();

const has = require('has');

const ledApi = require('../api/led');
const commonApi = require('../common');

const formValidation = (query) => {
    
};

const convertPropToValue = (query) => {
    if( has(query, 'donwnloadcnt') ) {
        query.downloadcnt = JSON.parse(query.donwnloadcnt);
    }
}

/*
router.get('*', (req, res, next) => {
    const viewData = req.query;
    let queryObj = {},
        optionObj = {};
    
    commonApi.convertObjToGetMethod(queryObj, optionObj, viewData);
    
    req.queryObj = queryObj;
    req.optionObj = optionObj;
    
    req.updateQuery = viewData;
    next();
});
*/

router.get('/', (req, res, next) => {
    const viewData = req.query;
    let queryObj = {},
        optionObj = {};
    
    commonApi.convertObjToGetMethod(queryObj, optionObj, viewData);
    
    req.queryObj = queryObj;
    req.optionObj = optionObj;
    
    console.log('req.queryObj', req.queryObj);
    
    ledApi.getList(req.queryObj, req.optionObj, (data) => {
        res.json(data);
    });
});

router.get('/regex/', (req, res, next) => {
    const viewData = req.query;
    let queryObj = {},
        optionObj = {};
    
    commonApi.convertObjToGetMethod(queryObj, optionObj, viewData);
    // commonApi.convertObjToGetMethod(queryObj, optionObj, viewData);
    
    req.queryObj = queryObj;
    req.optionObj = optionObj;
    
    console.log('req.queryObj', req.queryObj);
    
    ledApi.getList(req.queryObj, req.optionObj, (data) => {
        res.json(data);
    });
});

router.put('*', (req, res, next) => {
    console.log(req.query);
    
    let viewData = JSON.stringify(req.query);
    viewData = JSON.parse(viewData);
    
    console.log(viewData);
    
    convertPropToValue(viewData);
    
    req.updateQuery = viewData;
    
    next();
});

router.put('/downloadcount/:index?', (req, res, next) => {
    console.log("route downloadcount put!");
    
    const query = req.params;
    
    console.log("params : ", query);
    console.log("req: ", req);
    
    ledApi.downloadCountLED({ query, updateQuery : req.updateQuery}, (data) => {
        res.json(data);
    });
});

module.exports = router;