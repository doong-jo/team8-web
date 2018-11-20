const express = require('express');
const router = express.Router();
const has = require('has');

const categoryModel = require('../../models/category');

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
        
        categoryModel.find(mongoQuery, (data) => {
            callback(data);
        });
    },
};
