const express = require('express');
const router = express.Router();
const has = require('has');

const userModel = require('../../models/user');

const commonApi = require('../common');

const getDefaultProjection = {
    _id: 0
};

const countProjection = {
    id : 1
};

module.exports = {
    
    createUser : (snapshot, callback) => {
        
        userModel.insert(snapshot, (data) => {
            callback(data);
        });
    },
	
    getList : (viewReq, option, callback) => {
        let mongoQuery = commonApi.getFindQuery(viewReq, getDefaultProjection, option);
        
        userModel.find(mongoQuery, (data) => {
            callback(data);
        });
    },
    
    putUser : (viewReq, callback) => {
        let mongoQuery = commonApi.getUpdateQuery(viewReq);
        
        if( has(mongoQuery.query, 'id') ){
            userModel.put(mongoQuery, (data) => {
                callback(data);
            });
        }
    },
};
