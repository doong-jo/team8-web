const template = require('./template');
const has = require('has');

Date.prototype.addDays = (days) => {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
};

const whatIsIt = (object) => {
    const stringConstructor = "test".constructor;
    const arrayConstructor = [].constructor;
    const objectConstructor = {}.constructor;

    if (object === null) {
        return "null";
    }
    else if (object === undefined) {
        return "undefined";
    }
    else if (object.constructor === stringConstructor) {
        return "String";
    }
    else if (object.constructor === arrayConstructor) {
        return "Array";
    }
    else if (object.constructor === objectConstructor) {
        return "Object";
    }
    else {
        return "don't know";
    }
}

module.exports = {
    initTemplate : (state, req, res) => {
        const initState = state;

        res.send(template(initState));
    },
    
    convertGetMethodQueryString: (req, res, next) => {
        let viewData = JSON.stringify(req.query);
        viewData = JSON.parse(viewData);
        
        let queryObj = {},
            optionObj = {};
        
        for(const key in viewData) {
            if( key === 'order'  || key === 'skip' || key === 'limit') {
                optionObj[key] = JSON.parse(viewData[key]);
            } else if( key === 'sort' ) {
                optionObj[key] = viewData[key];
            }else {
                try{
                    queryObj[key] = JSON.parse(viewData[key]);
                } catch (e) {
                    queryObj[key] = viewData[key];  
                }
            }
        }
        
        req.queryObj = queryObj;
        req.optionObj = optionObj;
    },
    
    convertObjToGetMethod : (queryObj, optionObj, viewData) => {
        for(const key in viewData) {
            if( key === 'order'  || key === 'skip' || key === 'limit') {
                optionObj[key] = JSON.parse(viewData[key]);
            } else if( key === 'sort' ) {
                optionObj[key] = viewData[key];
            }else {
                try{
                    queryObj[key] = JSON.parse(viewData[key]);
                } catch (e) {
                    queryObj[key] = viewData[key];  
                }
            }
        }
    },
    
    convertObjToGetMethodRegex : (queryObj, optionObj, viewData) => {
        for(const key in viewData) {
            if( key === 'order'  || key === 'skip' || key === 'limit') {
                optionObj[key] = JSON.parse(viewData[key]);
            } else if( key === 'sort' ) {
                optionObj[key] = viewData[key];
            }else {
                queryObj[key] = {$regex: new RegExp(viewData[key]), $options:"i"}
            }
        }
    },
    
    getFindQuery : (query, projection, option) => {
        if(option === undefined ) {
            option = {};
        }
        
        let sortObj = {
            [option.sort]: option.order === undefined ? 1 : option.order
        };
        
        let mongoQuery = {
            query : {},
            projection : {},
            sort : option.sort !== undefined ? sortObj : {},
            skip : option.skip !== undefined ? option.skip : 0,
            limit : option.limit !== undefined ? option.limit : 0
        };
        
        mongoQuery.query = Object.assign(query);
        mongoQuery.projection = Object.assign(projection);
        
        return mongoQuery;
    },
	
    getUpdateQuery : (queryObj) => {
        let mongoQuery = {
            query : {},
            updateQuery : {},
        };
        
        mongoQuery.query = Object.assign(queryObj.query);
        mongoQuery.updateQuery = Object.assign(queryObj.updateQuery);
        
        return mongoQuery;
    },
};
