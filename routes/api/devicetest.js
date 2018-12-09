const express = require('express');
const router = express.Router();
const has = require('has');

const devicetestModel = require('../../models/devicetest');

const commonApi = require('../common');

const getDefaultProjection = {
    _id: 0
};

module.exports = {
    
    createdevicetest : (snapshot, callback) => {
        devicetestModel.insert(snapshot, (data) => {
            callback(data);
        });
    },
	
    getList : (viewReq, option, callback) => {
        let mongoQuery = commonApi.getFindQuery(viewReq, getDefaultProjection, option);
        
        if( has(mongoQuery.query, 'occured_date') ) {
            let convertQuery = mongoQuery.query;
            
            convertQuery.occured_date.$gte = new Date(convertQuery.occured_date.$gte);
            convertQuery.occured_date.$lt = new Date(convertQuery.occured_date.$lt);
            
            mongoQuery.query = convertQuery;
        }
    
        devicetestModel.find(mongoQuery, (data) => {
            callback(data);
        });
    },
};
