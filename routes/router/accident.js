const express = require('express');
const router = express.Router();
// const asyncModule = require('async');
const has = require('has');

const accidentApi = require('../api/accident');
const accidentChartApi = require('../api/accidentchart');
const commonApi = require('../common');

const formValidation = (query) => {
    if( has(query, 'position') ) {
        query.position = JSON.parse(query.position);
    }
    if( has(query, 'occured_date') ) {
        query.occured_date = new Date(query.occured_date);
    }
};

const deleteRidingType = (query) => {
    if(has(query, 'riding_type')){
        if(query.riding_type == 'all')
            delete query.riding_type;
    }
}

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
    deleteRidingType(req.queryObj);
    accidentApi.getList(req.queryObj, req.optionObj, (data) => {
        res.json(data);
    });
});

router.get('/accidentchart', (req, res, next) => {
    console.log('req.queryObj', req.queryObj);
    deleteRidingType(req.queryObj);
    
    accidentChartApi.getList(req.queryObj, req.optionObj, (data) => {
        res.json(data);
    });
});

router.get('/gte', (req, res, next) => {
    const viewData = req.query;
    let queryObj = {},
        optionObj = {};
    
    commonApi.convertObjToGetMethod(queryObj, optionObj, viewData);
    // commonApi.convertObjToGetMethod(queryObj, optionObj, viewData);
    
    req.queryObj = queryObj;
    req.optionObj = optionObj;
    
    console.log('req.queryObj', req.queryObj);
    
    accidentApi.getListByGte(req.queryObj, req.optionObj, (data) => {
        res.json(data);
    });
});


router.post('/', (req, res, next) => {
    console.log('post start..',req.query);
    let query = req.query;
    
    formValidation(query);
    
    const insertAddress = (callback) => {
        accidentChartApi.getRealAddress(query.position, data => {
            console.log('convert realAddress', data);
            if(!has(data,'lat')) {
                query.realAddress = data;
                callback(query);                
            }else {
                console.log('res not find position>>>', data);
                res.json(data);
            }
        });
    };
    
    console.log('insert realAddress >>> ',query);
    
    insertAddress((query) => {
        accidentApi.createAccident(query, (data) => {
            // console.log('accident data>>>', data);
            if(data){
                accidentChartApi.updateChartData(query, (data) => {
                    console.log('res.json data>>>',data)
                    res.json(data);
                });
            }
        });
    })
});

module.exports = router;