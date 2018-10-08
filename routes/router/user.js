const express = require('express');
const router = express.Router();

const userApi = require('../api/user');
const commonApi = require('../common');

router.get('/', (req, res, next) => {
    userApi.getList(req.queryObj, req.optionObj, (data) => {
        res.json(data);
    });
    
    const jsonTemplateData = {
        // userName : req.__user.name
		userName : "Administartor"
    };
    
    commonApi.initTemplate(jsonTemplateData, req, res);
});

router.put('*', (req, res, next) => {
    console.log(req.query);
    
    let viewData = JSON.stringify(req.query);
    viewData = JSON.parse(viewData);
    
    console.log(viewData);
    
    // convertPropToValue(viewData);
    
    req.updateQuery = viewData;
    
    next();
});

// router.get('/user', (req, res, next) => {
//     userApi.getList(req.queryObj, req.optionObj, (data) => {
//         res.json(data);
//     });
// });

router.put('/:id?', (req, res, next) => {
    console.log("route user put!");
    
    const query = req.params;
 
    console.log("params : ", query);
    
    userApi.putUser({ query, updateQuery : req.updateQuery}, (data) => {
        res.json(data);
    });
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