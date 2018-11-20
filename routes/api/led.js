const express = require('express');
const router = express.Router();
const has = require('has');

const ledModel = require('../../models/led');

const commonApi = require('../common');

const getDefaultProjection = {
    _id: 0
};

const countProjection = {
    id : 1
};

module.exports = {
    getList : (viewReq, option, callback) => {
        let mongoQuery = commonApi.getFindQuery(viewReq, getDefaultProjection, option);
        
        ledModel.find(mongoQuery, (data) => {
            callback(data);
        });
    },
    
    downloadCountLED : (viewReq, callback) => {
        let mongoQuery = commonApi.getUpdateQuery(viewReq);
        
        if( has(mongoQuery.query, 'index') ){
            console.log("ledModel.downloadCount");
            ledModel.downloadCount(mongoQuery, (data) => {
                callback(data);
            });
        }
    },
    
    putLED : (viewReq, callback) => {
        let mongoQuery = commonApi.getUpdateQuery(viewReq);
        
        if( has(mongoQuery.query, 'name') ){
            ledModel.put(mongoQuery, (data) => {
                callback(data);
            });
        }
    },
};
