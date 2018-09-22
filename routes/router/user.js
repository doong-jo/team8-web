const express = require('express');
const router = express.Router();

// const userApi = require('../api/user');
const commonApi = require('../common');

router.get('/', (req, res, next) => {
    const jsonTemplateData = {
        // userName : req.__user.name
		userName : "Administartor"
    };
    
    commonApi.initTemplate(jsonTemplateData, req, res);
});

// const convertPropToValue = (_viewData) => {
//     commonApi.convertToOriginVal('mailing', _viewData);
//     commonApi.convertToOriginVal('level', _viewData);
//     commonApi.convertToOriginVal('delete_account', _viewData);
// };

// router.get('*', (req, res, next) => {
//     const viewData = req.query;
//     let queryObj = {},
//         optionObj = {};
    
//     convertPropToValue(viewData);
//     commonApi.convertObjToGetMethod(queryObj, optionObj, viewData);
    
//     req.queryObj = queryObj;
//     req.optionObj = optionObj;
    
//     next();
// });

// router.put('*', (req, res, next) => {
//     const updateQuery = req.query;
    
//     convertPropToValue(updateQuery);
    
//     req.updateQuery = updateQuery;
    
//     next();
// });

//autocomplete (regex)
//filter (in)

// router.get('/users', (req, res, next) => {
//     userApi.getList(req.queryObj, req.optionObj, (data) => {
//         res.json(data);
//     });
// });


// router.get('/users-table', (req, res, next) => {
//     userApi.getTableList(req.queryObj, req.optionObj, (data) => {
//         res.json(data);
//     });
// });


// router.get('/users/count', (req, res, next) => {
//     userApi.getCount(req.queryObj, (data) => {
//         res.json(data);
//     });
// });


// router.put('/:id?', (req, res, next) => {
//     const query = req.params;
    
//     userApi.putUser({ query, updateQuery : req.updateQuery}, (data) => {
//         res.json(data);
//     });
// });


module.exports = router;