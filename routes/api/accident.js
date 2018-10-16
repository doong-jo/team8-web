const express = require('express');
const router = express.Router();
const has = require('has');

const accidentModel = require('../../models/accident');

const commonApi = require('../common');

const getDefaultProjection = {
    _id: 0
};

module.exports = {
    
    createAccident : (snapshot, callback) => {
        accidentModel.insert(snapshot, (data) => {
            callback(data);
        });
    },
	
    getList : (viewReq, option, callback) => {
        let mongoQuery = commonApi.getFindQuery(viewReq, getDefaultProjection, option);
        
        accidentModel.find(mongoQuery, (data) => {
            callback(data);
        });
    },
};
