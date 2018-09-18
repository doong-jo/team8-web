const express = require('express');
const router = express.Router();
const has = require('has');

const trackingModel = require('../../models/tracking');

// const commonApi = require('../common');

const getTableProjection = {
    // id : 1,
    // name : 1,
    // email : 1,
    // signup_date : 1,
    // last_login_date : 1,
    // state : 1,
    // language : 1,
    // pricing_type : 1,
    // level : 1,
};

const getDefaultProjection = {
    _id: 0
};

const countProjection = {
    id : 1
};

module.exports = {
    
	insertArticle : (snapshot, callback) => {
        
        trackingModel.insert(snapshot, (data) => {
            callback(data);
        });
    },
	
    getList : (viewReq, option, callback) => {
        let mongoQuery = commonApi.getFindQuery(viewReq, getDefaultProjection, option);
        
        trackingModel.find(mongoQuery, (data) => {
            callback(data);
        });
    },
    
    // getTableList : (viewReq, option, callback) => {
    //     let mongoQuery = commonApi.getFindQuery(viewReq, getTableProjection, option);
        
    //     userModel.find(mongoQuery, (data) => {
    //         const convertResultArr = commonApi.convertDataToTableFormat(data, getTableProjection);

    //         callback(convertResultArr);
    //     });
    // },
    
    // putUser : (viewReq, callback) => {
    //     let mongoQuery = commonApi.getUpdateQuery(viewReq);
        
    //     if( has(mongoQuery.query, 'id') ){
    //         userModel.put(mongoQuery, (data) => {
    //             callback(data);
    //         });
    //     }
        
    // },
    
    // getCount : (viewReq, callback) => {
    //     userModel.count({ viewReq, countProjection}, (data) => {
    //         callback(data);
    //     });
    // },
    
};
