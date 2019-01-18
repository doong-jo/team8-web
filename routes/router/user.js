const express = require('express');
const router = express.Router();
const userFields = require(__dirname + '/../../models/schema/user_info').getFields();

const has = require('has');

const userApi = require('../api/user');
const commonApi = require('../common');

const formValidation = (query) => {
    
    // if( has(query, 'lastAccess') ) {
    //     query.lastAccess = new Date(query.startAt);
    //     query.lastAccess.setHours(query.startAt.getHours() - 9);
    // }
    if( has(query, 'acc_enabled') ) {
        query.acc_enabled = JSON.parse(query.acc_enabled);
    }
};

const convertPropToValue = (query) => {
    
    for (var key in userFields) {
        if( Array == userFields[key] && has(query, key)) {
            let ledStr = query[key];
            console.log("array key", key)
            query[key] = ledStr.replace('[','').replace(']','').split(",").map(String);
        }
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
    
    userApi.getList(req.queryObj, req.optionObj, (data) => {
        res.json(data);
    });
});

router.get('/count', (req, res, next) => {
    userApi.getCount(req.queryObj, req.optionObj, (data) => {
        res.json(data);
    });
});

router.post('/', (req, res, next) => {
    let query = req.query;
    
    formValidation(query);
    
    console.log(query);
    
    userApi.createUser(query, (data) => {
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

router.put('/:email?', (req, res, next) => {
    console.log("route user put!");
    
    const query = req.params;
    
    console.log("params : ", query);
    
    userApi.putUser({ query, updateQuery : req.updateQuery}, (data) => {
        res.json(data);
    });
});


module.exports = router;