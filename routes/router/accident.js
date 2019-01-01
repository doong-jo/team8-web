const express = require('express');
const router = express.Router();

const has = require('has');

const accidentApi = require('../api/accident');
const commonApi = require('../common');

const formValidation = (query) => {
    if( has(query, 'position') ) {
        query.position = JSON.parse(query.position);
    }
    if( has(query, 'occured_date') ) {
        query.occured_date = new Date(query.occured_date);
    }
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
    
    accidentApi.getList(req.queryObj, req.optionObj, (data) => {
        res.json(data);
    });
});

router.post('/', (req, res, next) => {
    let query = req.query;
    
    formValidation(query);

    console.log(query);
    
    accidentApi.createAccident(query, (data) => {
        res.json(data);
    });
    
//   accidentChartApi.createAccident(query, (data) => {
//         res.json(data);
//     });
    
//     accidentTableApi.createAccident(query, (data) => {
//         res.json(data);
//     });
});

module.exports = router;