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
        let mongoQuery = commonApi.getFindQuery(viewReq, getDefaultProjection, option);

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
    
    updateChartData : (query, callback) => {
        let queryArrForChart = [];
        if( has(query, 'realAddress')){
            const addressArr = query.realAddress.split(' ');
            
            const queryForEach = (queryArr) => {
                queryArr.forEach((queryForChart, index) => {
                    const mongoFindQuery = commonApi.getFindQuery(queryForChart.query, getDefaultProjection);

                    let finishTrans = 0;

                    accidentchartModel.count(mongoFindQuery, (count, err) => {
                        let mongoUpdateQuery = commonApi.getUpdateQuery(queryForChart);

                        if(count > 0) {
                            mongoUpdateQuery.updateQuery.$push = {};
                            mongoUpdateQuery.updateQuery.$push.occured_dates = query.occured_date;
                            accidentchartModel.updateOne(mongoUpdateQuery, (data) => {
                            });
                        } else if(count != -1){
                            mongoUpdateQuery.query.occured_dates = query.occured_date;
                            accidentchartModel.insert(mongoUpdateQuery.query, (data) => {
                            });
                        }

                        if(queryArr.length == finishTrans+1) {
                            callback(true);
                        }

                        finishTrans++;
                    });
                });
            };
            
            addressArr.forEach((value, index) => {
                let queryForChart = {};
                queryForChart.updateQuery = {};
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
        const geocoder = NodeGeocoder(options);
        geocoder.reverse({lat: position.latitude, lon: position.longitude}, (err,res) => {
            if(res !== undefined){
                callback(res[0].formattedAddress);    
            }else {
                callback(position);   
            }
            
        });
    }
};
