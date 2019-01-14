const express = require('express');
const router = express.Router();
const has = require('has');

const accidentchartModel = require('../../models/accidentchart');

const commonApi = require('../common');

const NodeGeocoder = require('node-geocoder');
const options = {
    provider: 'google',
    httpAdapter: 'https',
    apiKey: 'AIzaSyA2frTy4tc-UaInRtQYs3rTZO5QdH3js0k',
    formatter: null,
    language: 'ko',
};

const regionArr = ['country', 'sido', 'sigungu', 'dong', 'ubmyun', 'ri', 'bunji'];

const getDefaultProjection = {
    _id: 0
};

module.exports = {
    
    createAccidentChart : (snapshot, callback) => {
        // div api
        console.log('createAccidentChart snapshot', snapshot);
        accidentchartModel.insert(snapshot, (data) => {
            callback(data);
        });
    },
	
    getList : (viewReq, option, callback) => {
        // {'country.대한민국.occured_dates':{$gte:ISODate('2018-12-01'), $lt: ISODate('2019-12-12')}}
        let mongoQuery = commonApi.getFindQuery(viewReq, getDefaultProjection, option),
            tempQuery = {},
            regionArr = [];
            
        if( has(mongoQuery.query, 'occured_dates') ) {
            let convertQuery = mongoQuery.query;
            
            convertQuery.occured_dates.$gte = new Date(convertQuery.occured_dates.$gte);
            convertQuery.occured_dates.$lt = new Date(convertQuery.occured_dates.$lt);
            
            mongoQuery.query = convertQuery;
        }    
        console.log('accidentChart getList mongoQuery>>>', mongoQuery);
        
        accidentchartModel.find(mongoQuery, (data) => {
            callback(data);
        });
    },
    
    checkDocExist: (query, option, callback) => {
        let mongoQuery = commonApi.getFindQuery(query, {_id:1}, option);
        
        accidentchartModel.find(mongoQuery,(data) => {
            callback(data);
        });
    },
    
    updateChartData : (query, callback) => {
        let queryArrForChart = [],
            flag = false;
        if( has(query, 'realAddress')){
            const addressArr = query.realAddress.split(' ');
            // console.log('updateChartData addressArr>>>',addressArr);
            
            const queryForEach = (queryArr) => {
                queryArr.forEach((queryForChart, index) => {
                    // console.log('queryForChart>>>',queryForChart);
                    const mongoFindQuery = commonApi.getFindQuery(queryForChart.query, {_id:1});
                    accidentchartModel.find(mongoFindQuery, (data) => {
                        let mongoUpdateQuery = commonApi.getUpdateQuery(queryForChart);
                        // console.log('exist data', data);
                        if(data.length > 0) {
                            mongoUpdateQuery.updateQuery.$push = {};
                            mongoUpdateQuery.updateQuery.$push.occured_dates = query.occured_date;
                            accidentchartModel.updateOne(mongoUpdateQuery, (data) => {
                                // console.log('accidentChart update data>>>', data);
                            });
                        } else {
                            mongoUpdateQuery.query.occured_dates = query.occured_date;
                            accidentchartModel.insert(mongoUpdateQuery.query, (data) => {
                                // console.log('accidentChart insert data>>>', data);
                            });
                        }
                        // console.log("length", queryArr.length);
                        // console.log("index", index);
                        if(queryArr.length == index+1)
                            callback(true);
                    });
                });
            };
            
            addressArr.forEach((value, index) => {
                let queryForChart = {};
                queryForChart.updateQuery = {};
                // console.log('addressArr foreach value>>>',value);
                queryForChart.query = {
                    name: value,
                    type: regionArr[index],
                    parent: index !== 0 ? addressArr[index-1] : '',
                    riding_type: query.riding_type,
                };
                queryArrForChart.push(queryForChart);
                if(queryArrForChart.length == addressArr.length){
                    queryForEach(queryArrForChart);
                }
            });
        }
    },
    getRealAddress: (position, callback) => {
        console.log('getRealAddress>>>', position);
        const geocoder = NodeGeocoder(options);
        geocoder.reverse({lat: position.latitude, lon: position.longitude}, (err,res) => {
            console.log('geocoder.reverse >>> res', res);
            if(res !== undefined){
                callback(res[0].formattedAddress);    
            }else {
                callback(position);   
            }
            
        });
    }
};
